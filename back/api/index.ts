/* eslint-disable @typescript-eslint/no-explicit-any */
import { VercelRequest, VercelResponse } from '@vercel/node';
import express, { Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { typeorm } from '../src/configs/database.config';
import { Seeder } from '../src/Seeder/Seeder';
import  route_users from '../src/Routes/users.routes'
import  route_comment from '../src/Routes/comment.routes'
import  route_auth from '../src/Routes/auth.routes'
import  route_radio from '../src/Routes/radio.routes'
import  route_shows from '../src/Routes/shows.routes'
import { injectSpeedInsights } from '@vercel/speed-insights';

injectSpeedInsights();
const app: Express = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use('/api/users', route_users);
app.use('/api/auth', route_auth);
app.use('/api/comment', route_comment);
app.use('/api/radio', route_radio);
app.use('/api/shows', route_shows);

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  try {
    if (!typeorm.isInitialized) {
      await typeorm.initialize();
      console.log('Database connection established.');
    };
    // await Seeder();
    // console.log('Database seeded successfully.');
  } catch (err: any) {
    console.error('Database connection failed:', err);
    res.status(500).json({ error: 'Database connection failed: ' + err.message });
    return;
  }
  return app(req, res);
}