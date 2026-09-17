import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true,
        minlength: 3,
        maxlength: 64
    },

    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        trim: true
    },

    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        minlength: 6
    }

});

const User = mongoose.model('user', userSchema);

export default User;