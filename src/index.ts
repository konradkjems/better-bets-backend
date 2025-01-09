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
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? process.env.FRONTEND_URL 
        : ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:4173'],
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

<<<<<<< HEAD
// Tilføj en route til roden (/)
app.get('/', (req, res) => {
  res.json({ message: 'Velkommen til Better Bets API!' });
});

=======
>>>>>>> b5e568b12d1e36603fff1517795c12f22e73d91b
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
<<<<<<< HEAD


// https://better-bets-frontend.vercel.app/
=======
>>>>>>> b5e568b12d1e36603fff1517795c12f22e73d91b
