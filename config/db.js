import mongoose from 'mongoose';

export const connectDB = async () => {

    try {
        const MONGODB_URI = process.env.MONGODB_URI;

        await mongoose.connect(MONGODB_URI);

        console.log('Conexion con MONGODB correcta');

    } catch (error) {
        console.error('Error al conectarse con MONGODB');
        console.error(error);
        process.exit(1);
    }
}