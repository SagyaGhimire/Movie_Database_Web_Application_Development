import axios from "axios";

const apiKey = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;
const GA_MODEL = process.env.GENAI_MODEL || "gemini-3.6-flash";

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
  if (!apiKey) {
    throw new Error("GOOGLE_API_KEY or GEMINI_API_KEY is not configured in backend .env.");
  }

  const favoriteGenres = getTopGenres(watchlist);
  const prompt = buildPrompt(watchlist, favoriteGenres, availableTitles);

  // Call Generative API via REST to avoid SDK issues in some deployment environments
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta2/models/${GA_MODEL}:generateText?key=${apiKey}`;
    const resp = await axios.post(url, {
      prompt: { text: normalizeText(prompt) },
      temperature: 0.2,
      maxOutputTokens: 512,
    }, { timeout: 30000 });

    const body = resp.data || {};
    const candidate = (body.candidates && body.candidates[0]) || body.candidate || body.output?.[0] || body;
    const outputText = normalizeText(candidate?.output || candidate?.content || candidate?.text || body.output?.[0]?.content || "");
    const parsed = extractJson(outputText);

    if (parsed && Array.isArray(parsed.recommendations) && parsed.recommendations.length > 0) {
      return parsed.recommendations.slice(0, 3);
    }
  } catch (err) {
    console.error("GenAI REST call failed, falling back:", err?.message || err);
  }

  return createFallbackRecommendations(watchlist, availableTitles);
}

export async function generateAIResponse(prompt) {
  if (!apiKey) {
    const e = new Error('GOOGLE_API_KEY or GEMINI_API_KEY is not configured in backend .env.');
    e.status = 500;
    throw e;
  }

  const input = normalizeText(prompt || "");

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta2/models/${GA_MODEL}:generateText?key=${apiKey}`;
    const resp = await axios.post(url, { prompt: { text: input }, temperature: 0.2, maxOutputTokens: 512 }, { timeout: 30000 });
    const body = resp.data || {};
    const candidate = (body.candidates && body.candidates[0]) || body.candidate || body.output?.[0] || body;
    const outputText = normalizeText(candidate?.output || candidate?.content || candidate?.text || body.output?.[0]?.content || "");
    return outputText;
  } catch (err) {
    console.error("generateAIResponse error:", err?.message || err);
    const e = new Error('AI service error');
    e.status = err?.response?.status || 500;
    throw e;
  }
}
