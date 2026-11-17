import Veterinarian from "../models/Veterinarians.js";
import mongoose from 'mongoose';


class VeterinarianController {
    async getAll(req, res){
        try {
            const veterinarians = await Veterinarian.find()
            .populate('user', 'name email');

            res.json({
                message: 'success',
                data: veterinarians
            })

        } catch (error) {
            console.error(error)
            res.status(500).json({
                message: 'Error al obtener los veterinarios'
            })
        }
    }

    async getById(req, res){
        try {
            const vid = req.params.vid;

            const veterinarian = await Veterinarian.findById(vid)
            .populate('user', '-password');

            if( !veterinarian){
                return res.status(404).json({
                    message: 'Veterinario no encontrado',
                    data: {}
                })
            }

            res.json({
                message: 'success',
                data: veterinarian
            })

        } catch (error) {
            console.error(error)
            res.status(500).json({
                message: 'Error al obtener el veterinario'
            })
        }
    }

    async create(req, res){
        try {
            const { name, user, specialty, license, active } = req.body;

            if( !name || !user || !specialty || !license) {
                return res.status(400).json({
                    message: 'Los campos name, user, specialty y license son obligatorios'
                })
            }

            if( typeof name != 'string' || !name.trim() ){
                return res.status(400).json({
                    message: 'El campo name debe ser un texto válido'
                })
            }

            if( !mongoose.isValidObjectId(user) ){
                return res.status(400).json({
                    message: 'El identificador del usuario no es válido'
                })
            }

            if( typeof specialty != 'string' || !specialty.trim() ){
                return res.status(400).json({
                    message: 'El campo specialty debe ser un texto válido'
                })
            }

            if( typeof license != 'string' || !license.trim() ){
                return res.status(400).json({
                    message: 'El campo license debe ser un texto válido'
                })
            }

            if( active !== undefined && typeof active != 'boolean'){
                return res.status(400).json({
                    message: 'El campo active debe ser un boolean'
                })
            }

            const veterinarian = await Veterinarian.create({
                name: name.trim(),
                user,
                specialty: specialty.trim(),
                license: license.trim(),
                active
            });

            res.status(201).json({
                message: 'success',
                data: veterinarian
            })

        } catch (error) {
            console.error(error)
            res.status(500).json({
                message: 'Error al crear el veterinario'
            })
        }
    }
}

export default VeterinarianController;