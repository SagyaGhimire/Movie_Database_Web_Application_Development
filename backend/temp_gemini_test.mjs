import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const key = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;
console.log('apiKey loaded:', !!key, 'length=', key?.length);

const endpoints = [
  'https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=' + key,
  'https://generativelanguage.googleapis.com/v1/models/text-bison-001:generateText?key=' + key,
];

for (const url of endpoints) {
  try {
    const res = await axios.post(url, {
      prompt: { text: 'Hello from diagnostic test' },
      temperature: 0.2,
      maxOutputTokens: 50,
    }, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 30000,
    });
    console.log(url, '=>', res.status, JSON.stringify(res.data));
  } catch (err) {
    console.log(url, '=>', err.response?.status || 'no-status', JSON.stringify(err.response?.data) || err.message);
  }
}
