"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        const conn = await mongoose_1.default.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/arbitrage');
        console.log(`MongoDB tilsluttet: ${conn.connection.host}`);
    }
    catch (error) {
        console.error('Fejl ved tilslutning til MongoDB:', error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
// https://better-bets-frontend.vercel.app/
