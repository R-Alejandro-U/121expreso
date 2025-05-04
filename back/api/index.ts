/* eslint-disable @typescript-eslint/no-explicit-any */
import { VercelRequest, VercelResponse } from '@vercel/node';
import express, { Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import routes from '../src/Routes/index.routes';
import { typeorm } from '../src/configs/database.config';
import { Seeder } from '../src/Seeder/Seeder';

const app: Express = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use('/', routes);

app.get('/api/test', (req, res) => {
  res.json({ message: 'Servidor funcionando correctamente' });
});

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  try {
    if (!typeorm.isInitialized) {
      await typeorm.initialize();
      console.log('Database connection established.');
    }
    await Seeder();
    console.log('Database seeded successfully.');
  } catch (err: any) {
    console.error('Database connection failed:', err);
    res.status(500).json({ error: 'Database connection failed: ' + err.message });
    return;
  }
  console.log('Handling request:', req.method, req.url); // Log para depurar solicitudes
  return app(req, res);
}