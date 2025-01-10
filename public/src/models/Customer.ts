import mongoose, { Schema, Document } from 'mongoose';

interface IBookmaker {
    name: string;
    fixedStake: number;
    hasBonus: boolean;
    actualCost: number;
    minOdds: number;
    preferLoss?: boolean;
    avoidWin?: boolean;
    isActive: boolean;
    odds?: {
        team1: number;
        draw: number;
        team2: number;
    };
}

export interface ICustomer extends Document {
    id: string;
    name: string;
    bookmakers: IBookmaker[];
    teamNames?: {
        team1: string;
        team2: string;
    };
    createdAt: Date;
    updatedAt: Date;
}

const CustomerSchema: Schema = new Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    bookmakers: [{
        name: String,
        fixedStake: Number,
        hasBonus: Boolean,
        actualCost: Number,
        minOdds: Number,
        preferLoss: Boolean,
        avoidWin: Boolean,
        isActive: Boolean,
        odds: {
            team1: Number,
            draw: Number,
            team2: Number
        }
    }],
    teamNames: {
        team1: String,
        team2: String
    }
}, {
    timestamps: true
});

export default mongoose.model<ICustomer>('Customer', CustomerSchema);
