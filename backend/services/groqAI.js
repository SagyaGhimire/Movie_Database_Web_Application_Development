import axios from "axios";

const getApiKey = () => process.env.GROQ_API_KEY || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

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

const createFallbackRecommendations = (watchlist, availableTitles = []) => {
  const watchedTitles = new Set(watchlist.map((movie) => movie.title));
  let candidates = availableTitles.filter((title) => Boolean(title) && !watchedTitles.has(title));
  
  if (candidates.length < 3) {
    const allTitles = availableTitles.filter(Boolean);
    if (allTitles.length > 0) {
      candidates = allTitles;
    } else {
      candidates = ["The Matrix", "Inception", "Interstellar"];
    }
  }

  return candidates.slice(0, 3).map((title) => ({
    title,
    reason: `Based on your movie preferences, ${title} is a top recommended pick for your watchlist.`,
  }));
};

export async function getAIRecommendations({ watchlist = [], availableTitles = [] }) {
  const favoriteGenres = getTopGenres(watchlist);
  const prompt = buildPrompt(watchlist, favoriteGenres, availableTitles);
  const apiKey = getApiKey();

  if (apiKey) {
    if (apiKey.startsWith("AIza")) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        const resp = await axios.post(url, {
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: "application/json" }
        }, { timeout: 15000 });

        const outputText = resp.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
        const parsed = extractJson(outputText);
        if (parsed && Array.isArray(parsed.recommendations) && parsed.recommendations.length > 0) {
          return parsed.recommendations.slice(0, 3);
        }
      } catch (err) {
        console.error("Gemini API request failed:", err?.message || err);
      }
    } else {
      try {
        const resp = await axios.post("https://api.groq.com/openai/v1/chat/completions", {
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: "You output strictly valid JSON with a 'recommendations' array." },
            { role: "user", content: prompt }
          ],
          temperature: 0.2,
          response_format: { type: "json_object" }
        }, {
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
          },
          timeout: 15000
        });

        const outputText = resp.data?.choices?.[0]?.message?.content || "";
        const parsed = extractJson(outputText);
        if (parsed && Array.isArray(parsed.recommendations) && parsed.recommendations.length > 0) {
          return parsed.recommendations.slice(0, 3);
        }
      } catch (err) {
        console.error("Groq API request failed:", err?.message || err, err?.response?.data || err);
      }
    }
  } else {
    console.warn("GOOGLE_API_KEY, GEMINI_API_KEY, or GROQ_API_KEY is not configured in backend .env.");
  }

  return createFallbackRecommendations(watchlist, availableTitles);
}

export async function generateAIResponse(prompt) {
  const apiKey = getApiKey();
  const input = normalizeText(prompt || "");

  if (!apiKey) {
    return "AI recommendation engine ready.";
  }

  try {
    if (apiKey.startsWith("AIza")) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
      const resp = await axios.post(url, {
        contents: [{ parts: [{ text: input }] }]
      }, { timeout: 15000 });
      return resp.data?.candidates?.[0]?.content?.parts?.[0]?.text || "AI recommendation engine ready.";
    }

    const resp = await axios.post("https://api.groq.com/openai/v1/chat/completions", {
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: input }],
      temperature: 0.2
    }, {
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      timeout: 15000
    });
    return resp.data?.choices?.[0]?.message?.content || "";
  } catch (err) {
    console.error("generateAIResponse error:", err?.message || err);
    return "AI recommendation engine ready.";
  }
}
