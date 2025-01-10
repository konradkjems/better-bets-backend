"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database");
const auth_1 = __importDefault(require("./routes/auth"));
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Middleware
const productionOrigins = ['https://better-bets-api.vercel.app'];
if (process.env.FRONTEND_URL) {
    productionOrigins.push(process.env.FRONTEND_URL);
}
app.use((0, cors_1.default)({
    origin: process.env.NODE_ENV === 'production'
        ? productionOrigins
        : ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:4173', 'https://better-bets-three.vercel.app/'],
    credentials: true
}));
app.use(express_1.default.json());
// Routes
app.use('/api/auth', auth_1.default);
app.get('/api/health', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json({ status: 'ok' });
});
// Tilføj en route til roden (/)
app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json({ message: 'Velkommen til Better Bets API!' });
});
// Connect to database
(0, database_1.connectDB)();
// Start server for local development
if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server kører på port ${PORT}`);
    });
}
// Export for Vercel
exports.default = app;
// https://better-bets-frontend.vercel.app/
// https://better-bets-backend.vercel.app/
