import mongoose from "mongoose";

const veterinarianSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    specialty: {
        type: String,
        required: true,
        trim: true
    },
    license: {
        type: String,
        required: true,
        trim: true
    },
    active: {
        type: Boolean,
        default: true
    }
});

const Veterinarian = mongoose.model('veterinarian', veterinarianSchema);
export default Veterinarian;