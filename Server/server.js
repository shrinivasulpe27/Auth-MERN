import express from 'express';
import dotenv  from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import cors from "cors"

dotenv.config();
const app = express();
app.use(express.json());              // body-parser

app.use(cors());

// OR: Restrict to your frontend origin
// app.use(cors({ origin: 'http://localhost:5173', credentials: true }));


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
