import { generateAIResponse } from '../services/geminiAPI.js'

export const getMovieRecommendation = async (req, res) => {
  try {
    const response = await generateAIResponse(req.body.prompt)
    return res.status(200).json({ data: response })
  } catch (error) {
    const message = error?.response?.data?.error?.message || error?.message || String(error);
    const status = error?.status || error?.response?.status || 500;

    if (status === 429) {
      return res.status(429).json({ error: 'Rate limit exceeded.' });
    }
    if (status === 500) {
      return res.status(500).json({ error: message });
    }
    return res.status(status).json({ error: message });
  }
}
