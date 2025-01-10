import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser {
    name: string;
    email: string;
    password: string;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>({
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
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error as Error);
    }
});

// Metode til at sammenligne passwords
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw error;
    }
};

const User = mongoose.model<IUser>('User', userSchema);

export default User; 