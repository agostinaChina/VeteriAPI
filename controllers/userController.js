import User from "../models/userModel.js";

class UserController {

    async getAll(req, res) {

        try {

            const users = await User.find();

            res.json({
                message: 'success',
                data: users
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                message: 'Error al obtener los usuarios'
            });

        }
    }

    async create(req, res) {

        try {

            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return res.status(403).send('Faltan Parametros Obligatorios');
            }

            const user = await User.create({
                name,
                email,
                password
            });

            res.json({
                message: 'success',
                data: user
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                message: 'Error al crear el usuario'
            });

        }
    }

}

export default UserController;