import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';

const storeSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true }, 
    name: { type: String, required: true },
    userId: { type: String, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true }
}, { timestamps: true });

const store = mongoose.models.store || mongoose.model('store', storeSchema);

export default store;