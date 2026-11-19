import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({

    pet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pet',
        required: [true, 'La mascota es obligatoria']
    },

    veterinarian: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'veterinarian',
        required: [true, 'El veterinario es obligatorio']
    },

    date: {
        type: Date,
        required: [true, 'La fecha es obligatoria']
    },

    time: {
        type: String,
        required: [true, 'La hora es obligatoria']
    },

    reason: {
        type: String,
        required: [true, 'El motivo es obligatorio'],
        trim: true
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

const Appointment = mongoose.model('appointment', appointmentSchema);

export default Appointment;