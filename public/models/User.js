"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, 'Navn er påkrævet'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email er påkrævet'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Ugyldig email adresse']
    },
    password: {
        type: String,
        required: [true, 'Adgangskode er påkrævet'],
        minlength: [8, 'Adgangskoden skal være mindst 8 tegn lang']
    }
}, {
    timestamps: true
});
// Hash password før gemning
userSchema.pre('save', async function (next) {
    if (!this.isModified('password'))
        return next();
    try {
        const salt = await bcryptjs_1.default.genSalt(10);
        this.password = await bcryptjs_1.default.hash(this.password, salt);
        next();
    }
    catch (error) {
        next(error);
    }
});
// Metode til at sammenligne passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        return await bcryptjs_1.default.compare(candidatePassword, this.password);
    }
    catch (error) {
        throw error;
    }
};
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
