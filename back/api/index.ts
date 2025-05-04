/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { VercelRequest, VercelResponse } from '@vercel/node';
import express, { Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import { typeorm } from '../src/configs/database.config';
import { Seeder } from '../src/Seeder/Seeder';
import routes from '../src/Routes/index.routes';
const app: Express = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(routes);

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<any> {
  try {
    !typeorm.isInitialized ? await typeorm.initialize() : null;
    console.log(routes)
    console.log('Database connection established.');
    await Seeder();
    console.log('Database seeded successfully.');
  } catch (err: any) {
    console.error('Database connection failed:', err);
    res.status(500).json({ error: 'Database connection failed' + err['message'] || err });
    return;
  };
  return app(req, res)
};