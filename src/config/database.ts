import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/arbitrage');
        console.log(`MongoDB tilsluttet: ${conn.connection.host}`);
    } catch (error) {
        console.error('Fejl ved tilslutning til MongoDB:', error);
        process.exit(1);
    }
};
// https://better-bets-frontend.vercel.app/