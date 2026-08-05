import axios from "axios";

const apiKey = process.env.GROQ_API_KEY || process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;
const baseURL = process.env.GROQ_API_BASE_URL || "https://api.groq.com/openai/v1";
const client = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
});

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

const callGroq = async (input) => {
  const model = process.env.GROQ_MODEL || "openai/gpt-oss-20b";
  const response = await client.post("/responses", {
    model,
    input,
  });
  return response.data;
};

export async function getAIRecommendations({ watchlist = [], availableTitles = [] }) {
  const favoriteGenres = getTopGenres(watchlist);
  const prompt = buildPrompt(watchlist, favoriteGenres, availableTitles);

  if (!apiKey) {
    console.warn("GROQ API key is not configured in backend .env. Returning fallback recommendations.");
    return createFallbackRecommendations(watchlist, availableTitles);
  }

  try {
    const response = await callGroq(prompt);
    const outputText = normalizeText(
      response.output_text || response.output?.[0]?.content?.[0]?.text || ""
    );
    const parsed = extractJson(outputText);

    if (parsed && Array.isArray(parsed.recommendations) && parsed.recommendations.length > 0) {
      return parsed.recommendations.slice(0, 3);
    }
  } catch (err) {
    console.error("Groq AI request failed:", err?.message || err, err?.response?.data || err);
  }

  return createFallbackRecommendations(watchlist, availableTitles);
}

export async function generateAIResponse(prompt) {
  if (!apiKey) {
    const e = new Error("GROQ_API_KEY is not configured in backend .env.");
    e.status = 500;
    throw e;
  }

  const normalized = normalizeText(prompt || "");

  try {
    const response = await callGroq(normalized);
    return normalizeText(response.output_text || response.output?.[0]?.content?.[0]?.text || "");
  } catch (err) {
    const message = err?.response?.data?.error?.message || err?.message || "AI service error";
    console.error("Groq generateAIResponse error:", message, err?.response?.data || err);
    const e = new Error(message);
    e.status = err?.response?.status || 500;
    throw e;
  }
}
