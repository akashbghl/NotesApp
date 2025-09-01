import dotenv from 'dotenv'
import path from 'path';
const envPath = __dirname.includes('dist')
  ? path.resolve(__dirname, '../.env') // Running from dist/
  : path.resolve(__dirname, '../.env'); // Running from src/

dotenv.config({ path: envPath });

import express, { Request, Response } from 'express';
import cors from 'cors';
import connectDB from './config/db';
import AuthRoutes from './routes/AuthRoutes';
import cookieParser from 'cookie-parser';
import dashboardRoutes from "./routes/dashboard";
import NoteRoutes from './routes/NoteRoutes';

const app = express();
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
})); 
app.use(express.json());
app.use(cookieParser())
app.use("/api", dashboardRoutes);
app.use('/notes',NoteRoutes);
app.use('/auth',AuthRoutes)
app.get('/', (req: Request, res: Response) => {
  res.send("Hello from the server!");
});

connectDB();
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
