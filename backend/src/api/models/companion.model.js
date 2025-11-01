// TRIPMATE-/backend/models/companion.model.js
import mongoose from 'mongoose';

const companionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    destination: { type: String, required: true },
    startingLocation: { type: String, required: true },
    interests: { type: [String], default: [] },
    availableMonths: { type: [String], default: [] },
    bio: { type: String, maxlength: 150 },
    image: { type: String, default: 'default-url' },
    verified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

export const Companion = mongoose.model('Companion', companionSchema);