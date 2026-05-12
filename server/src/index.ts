import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';

import authRoutes from './routes/auth';
import projectRoutes from './routes/projects';
import taskRoutes from './routes/tasks';

dotenv.config();

connectDB();

const app = express();

// CORS configuration for local development and production
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5000',
  'http://127.0.0.1:3000',
  process.env.CLIENT_URL,
  'https://task-manger-bice-ten.vercel.app',
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || /\.vercel\.app$/.test(origin || '')) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
