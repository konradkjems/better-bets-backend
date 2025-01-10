import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import authRoutes from './routes/auth';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
const productionOrigins = ['https://better-bets-api.vercel.app'];
if (process.env.FRONTEND_URL) {
    productionOrigins.push(process.env.FRONTEND_URL);
}

app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? productionOrigins
        : ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:4173', 'https://better-bets-three.vercel.app/'],
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Tilføj en route til roden (/)
app.get('/', (req, res) => {
  res.json({ message: 'Velkommen til Better Bets API!' });
});

// Connect to database
connectDB();

// Start server for local development
if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server kører på port ${PORT}`);
    });
}

// Export for Vercel
export default app;


// https://better-bets-frontend.vercel.app/
// https://better-bets-backend.vercel.app/
