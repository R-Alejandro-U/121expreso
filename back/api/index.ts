/* eslint-disable @typescript-eslint/no-explicit-any */
import { VercelRequest, VercelResponse } from '@vercel/node';
import express, { Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import routes from '../src/Routes/index.routes';
import { typeorm } from '../src/configs/database.config';
import { Seeder } from '../src/Seeder/Seeder';

let isSeeded: boolean = false;

const app: Express = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(routes);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    await typeorm.initialize();
    console.log('Database connection established.');
    if (!typeorm.isInitialized) {
      if (!isSeeded) {
        try {
          await Seeder();
          console.log('Database seeded successfully.');
          isSeeded = true;
        } catch (err: any) {
          console.error('Seeder failed:', err);
          res.status(500).json({ error: err['message'] || err });
          return;
        };
      };
    };
  } catch (err) {
    console.error('Database connection failed:', err);
    res.status(500).json({ error: 'Database connection failed' });
    return;
  };
  return app(req, res);
};