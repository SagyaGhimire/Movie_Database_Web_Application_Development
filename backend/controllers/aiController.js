import { getAIRecommendations } from '../services/groqAI.js';
import { getAllMovies, getWatchlist } from '../models/MovieModel.js';

export const getMovieRecommendation = async (req, res) => {
  try {
    let watchlist = req.body.watchlist;

    if ((!watchlist || watchlist.length === 0) && req.user) {
      watchlist = await getWatchlist(req.user.id || req.user._id);
    }
    if (!Array.isArray(watchlist)) {
      watchlist = [];
    }

    const allMovies = await getAllMovies();
    const availableTitles = allMovies.map((m) => m.title);

    const recommendations = await getAIRecommendations({ watchlist, availableTitles });

    return res.status(200).json({ recommendations });
  } catch (error) {
    console.error("Error in getMovieRecommendation controller:", error);
    const message = error?.response?.data?.error?.message || error?.message || String(error);
    const status = error?.status || error?.response?.status || 500;

    if (status === 429) {
      return res.status(429).json({ error: 'Rate limit exceeded.' });
    }
    return res.status(status).json({ error: message });
  }
};
