import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

const secret = process.env.JWT_SECRET || 'secret';
const payload = { id: 'debug-user-id', name: 'Debug User', email: 'debug@example.com' };
const token = jwt.sign(payload, secret, { expiresIn: '7d' });

const outPath = path.resolve(process.cwd(), 'tmp_token.txt');
fs.writeFileSync(outPath, token, { encoding: 'utf8' });
console.log('Token written to', outPath);
