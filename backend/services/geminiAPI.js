import axios from "axios";

const credential =
  process.env.GOOGLE_API_KEY ||
  process.env.GOOGLE_ACCESS_TOKEN ||
  process.env.GOOGLE_OAUTH_TOKEN ||
  process.env.GEMINI_API_KEY ||
  process.env.GEMINI_BEARER_TOKEN;
const API_BASE_URLS = process.env.GENAI_API_BASE_URLS
  ? process.env.GENAI_API_BASE_URLS.split(",").map((url) => url.trim()).filter(Boolean)
  : [
      "https://generativelanguage.googleapis.com/v1beta2",
      "https://generativelanguage.googleapis.com/v1",
      "https://gemini.googleapis.com/v1",
    ];
const MODEL_NAMES = process.env.GENAI_MODEL
  ? [process.env.GENAI_MODEL]
  : ["text-bison-001", "gemini-1.0", "gemini-1.0-mini", "gemini-1.0-prose"];

const isBearerCredential = (value) => {
  return typeof value === "string" && /^(AQ|ya29\.|ya29_)/.test(value);
};

const getModelEndpoints = () => {
  const useBearerOnly = isBearerCredential(credential);
  return API_BASE_URLS.flatMap((baseUrl) =>
    MODEL_NAMES.flatMap((modelName) => {
      const modelTextPath = `models/${modelName}:generateText`;
      const modelGeneratePath = `models/${modelName}:generate`;
      const bearerHeaders = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${credential}`,
      };
      const queryKeyHeaders = {
        "Content-Type": "application/json",
      };

      const endpoints = [];
      if (!useBearerOnly) {
        endpoints.push(
          {
            url: `${baseUrl}/${modelTextPath}?key=${credential}`,
            headers: queryKeyHeaders,
            description: `${baseUrl} ${modelName} query-key generateText`,
          },
          {
            url: `${baseUrl}/${modelGeneratePath}?key=${credential}`,
            headers: queryKeyHeaders,
            description: `${baseUrl} ${modelName} query-key generate`,
          }
        );
      }
      endpoints.push(
        {
          url: `${baseUrl}/${modelTextPath}`,
          headers: bearerHeaders,
          description: `${baseUrl} ${modelName} bearer generateText`,
        },
        {
          url: `${baseUrl}/${modelGeneratePath}`,
          headers: bearerHeaders,
          description: `${baseUrl} ${modelName} bearer generate`,
        }
      );
      return endpoints;
    })
  );
};

const normalizeText = (text) => {
  return typeof text === "string" ? text.trim() : "";
};

const extractJson = (text) => {
  const normalized = normalizeText(text);
  const start = normalized.indexOf("{");
  const end = normalized.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;
  const jsonText = normalized.slice(start, end + 1);
  try {
    return JSON.parse(jsonText);
  } catch {
    return null;
  }
};

const getTopGenres = (watchlist) => {
  const counts = {};
  watchlist.forEach((movie) => {
    const genres = (movie.genre || "").toString().split("/").map((g) => g.trim()).filter(Boolean);
    genres.forEach((genre) => {
      counts[genre] = (counts[genre] || 0) + 1;
    });
  });
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([genre]) => genre);
};

const buildPrompt = (watchlist, favoriteGenres, availableTitles) => {
  const watchlistText = watchlist.length
    ? watchlist.map((movie, index) => `\n${index + 1}. Title: ${movie.title || "Unknown"}, Genre: ${movie.genre || "Unknown"}, Year: ${movie.year || "Unknown"}`).join("")
    : "\nNone";

  return `You are an expert movie recommender for a movie database. Based on this user's watchlist and favorite genres, recommend 3 movies from our database they would enjoy, with reasons.\n\nAvailable titles: ${availableTitles.join(", ")}\n\nWatchlist:${watchlistText}\n\nFavorite genres: ${favoriteGenres.join(", ") || "None"}\n\nPlease return exactly valid JSON and nothing else using this schema:\n{\n  "recommendations": [\n    {"title": "...", "reason": "..."},\n    {"title": "...", "reason": "..."},\n    {"title": "...", "reason": "..."}\n  ]\n}`;
};

const createFallbackRecommendations = (watchlist, availableTitles) => {
  const watchedTitles = new Set(watchlist.map((movie) => movie.title));
  return availableTitles
    .filter((title) => !watchedTitles.has(title))
    .slice(0, 3)
    .map((title) => ({
      title,
      reason: `Based on your current watchlist, ${title} is a strong match from the database.`,
    }));
};

export async function getAIRecommendations({ watchlist = [], availableTitles = [] }) {
  if (!credential) {
    throw new Error("GOOGLE_API_KEY, GEMINI_API_KEY, or valid bearer credential is not configured in backend .env.");
  }

  const favoriteGenres = getTopGenres(watchlist);
  const prompt = buildPrompt(watchlist, favoriteGenres, availableTitles);

  // Call Generative API via REST to avoid SDK issues in some deployment environments
  try {
    let resp;
    const endpoints = getModelEndpoints();
    const failures = [];

    for (const endpoint of endpoints) {
      try {
        resp = await axios.post(endpoint.url, {
          prompt: { text: normalizeText(prompt) },
          temperature: 0.2,
          maxOutputTokens: 512,
        }, {
          headers: endpoint.headers,
          timeout: 30000,
        });
        break;
      } catch (innerErr) {
        const status = innerErr.response?.status || 'no-status';
        const detail = innerErr.response?.data || innerErr.message;
        failures.push({ endpoint: endpoint.description, status, detail });
        console.warn(`GenAI attempt failed (${endpoint.description}):`, status, detail);
        if (innerErr.response?.status === 404) {
          continue;
        }
        throw innerErr;
      }
    }

    if (!resp) {
      const details = failures.map((failure) => `${failure.endpoint}=${failure.status}`).join(", ");
      throw new Error(`No reachable Generative API endpoint (${details})`);
    }
    const body = resp.data || {};
    const candidate = (body.candidates && body.candidates[0]) || body.candidate || body.output?.[0] || body;
    const outputText = normalizeText(candidate?.output || candidate?.content || candidate?.text || body.output?.[0]?.content || "");
    const parsed = extractJson(outputText);

    if (parsed && Array.isArray(parsed.recommendations) && parsed.recommendations.length > 0) {
      return parsed.recommendations.slice(0, 3);
    }
  } catch (err) {
    console.error("GenAI REST call failed, falling back:", err?.message || err, err?.response?.data || "no response body");
  }

  return createFallbackRecommendations(watchlist, availableTitles);
}

export async function generateAIResponse(prompt) {
  if (!credential) {
    const e = new Error('GOOGLE_API_KEY, GEMINI_API_KEY, or valid bearer credential is not configured in backend .env.');
    e.status = 500;
    throw e;
  }

  const input = normalizeText(prompt || "");

  try {
    let resp;
    const endpoints = getModelEndpoints();
    const failures = [];

    for (const endpoint of endpoints) {
      try {
        resp = await axios.post(endpoint.url, {
          prompt: { text: input },
          temperature: 0.2,
          maxOutputTokens: 512,
        }, {
          headers: endpoint.headers,
          timeout: 30000,
        });
        break;
      } catch (innerErr) {
        const status = innerErr.response?.status || 'no-status';
        const detail = innerErr.response?.data || innerErr.message;
        failures.push({ endpoint: endpoint.description, status, detail });
        console.warn(`GenAI attempt failed (${endpoint.description}):`, status, detail);
        if (innerErr.response?.status === 404) {
          continue;
        }
        throw innerErr;
      }
    }
    if (!resp) {
      const details = failures.map((failure) => `${failure.endpoint}=${failure.status}`).join(", ");
      throw new Error(`No reachable Generative API endpoint (${details})`);
    }
    const body = resp.data || {};
    const candidate = (body.candidates && body.candidates[0]) || body.candidate || body.output?.[0] || body;
    const outputText = normalizeText(candidate?.output || candidate?.content || candidate?.text || body.output?.[0]?.content || "");
    return outputText;
  } catch (err) {
    const message = err?.response?.data?.error?.message || err?.message || 'AI service error';
    console.error("generateAIResponse error:", message, err?.response?.data || "no response body");
    const e = new Error(message);
    e.status = err?.response?.status || 500;
    throw e;
  }
}
