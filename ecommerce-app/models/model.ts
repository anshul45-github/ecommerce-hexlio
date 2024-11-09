import mongoose from 'mongoose';

const storeSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true }, 
    name: { type: String, required: true },
    userId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

const store = mongoose.models.store || mongoose.model('Store', storeSchema);

export default store;