import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true,
        minlength: 3,
        maxlength: 64
    },

    type: {
        type: String,
        required: [true, 'El tipo es obligatorio'],
        enum: ['perro', 'gato', 'ave', 'otro']
    },

    breed: {
        type: String,
        required: [true, 'La raza es obligatoria'],
        trim: true,
        minlength: 3,
        maxlength: 64
    },

    age: {
        type: Number,
        required: [true, 'La edad es obligatoria'],
        min: 0,
        max: 50
    },

    owner: {
        type: String,
        required: [true, 'El dueño es obligatorio'],
        trim: true,
        minlength: 3,
        maxlength: 64
    },

    active: {
        type: Boolean,
        default: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

const Pet = mongoose.model('pet', petSchema);

export default Pet;