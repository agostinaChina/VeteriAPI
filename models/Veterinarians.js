
import mongoose from "mongoose";

const veterinarianSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    specialty: {
        type: String,
        required: true,
        trim: true
    },
    license: {
        type: String,
        required: true,
        trim: true,
        maxlength: [10, 'La matrícula no puede superar los 10 caracteres']
    },
    active: {
        type: Boolean,
        default: true
    }
});

const Veterinarian = mongoose.model('veterinarian', veterinarianSchema);

export default Veterinarian;
