
import Veterinarian from "../models/Veterinarians.js";

class VeterinarianController {

    async getAll(req, res) {
        try {
            const filter = {};

            if (req.user.role !== 'admin') {
                filter.active = true;
            }

            const veterinarians = await Veterinarian.find(filter);

            res.json({
                message: 'success',
                data: veterinarians
            });

        } catch (error) {
            console.error(error);

            res.status(500).json({
                message: 'Error al obtener los veterinarios'
            });
        }
    }

    async getById(req, res) {
        try {
            const vid = req.params.vid;

            const veterinarian = await Veterinarian.findById(vid);

            if (!veterinarian) {
                return res.status(404).json({
                    message: 'Veterinario no encontrado'
                });
            }

            res.json({
                message: 'success',
                data: veterinarian
            });

        } catch (error) {
            console.error(error);

            res.status(500).json({
                message: 'Error al obtener el veterinario'
            });
        }
    }

    async create(req, res) {
        try {
            const { name, specialty, license, active } = req.body;

            if (!name || !specialty || !license) {
                return res.status(400).json({
                    message: 'Faltan parámetros obligatorios'
                });
            }

            if (typeof name !== 'string' || typeof specialty !== 'string' || typeof license !== 'string') {
                return res.status(400).json({
                    message: 'Los datos ingresados no son válidos'
                });
            }

            if (license.trim().length > 10) {
                return res.status(400).json({
                    message: 'La matrícula no puede superar los 10 caracteres'
                });
            }

            if (active !== undefined && typeof active !== 'boolean') {
                return res.status(400).json({
                    message: 'El estado activo debe ser verdadero o falso'
                });
            }

            const veterinarian = await Veterinarian.create({
                name: name.trim(),
                specialty: specialty.trim(),
                license: license.trim(),
                active
            });

            res.status(201).json({
                message: 'success',
                data: veterinarian
            });

        } catch (error) {
            console.error(error);

            if (error.name === 'ValidationError') {
                return res.status(400).json({
                    message: error.message
                });
            }

            res.status(500).json({
                message: 'Error al crear el veterinario'
            });
        }
    }
}

export default VeterinarianController;
