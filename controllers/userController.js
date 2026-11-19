import User from "../models/User.js";
import bcrypt from 'bcrypt';


class UserController {

     async getAll(req, res){
        try {
            const data = await User.find().select('name email role');
            res.json( {message: 'success', data: data });
        } catch (error) {
            res.status(500).json({
                message: `Error del servidor, al obtener los usuarios`
            })
            console.error(error);
        }
    }

 async getById(req, res){
        try {
            const { uid } = req.params;
            const user = await User.findById(uid).select('-password')
            if( !user){
                res.status(404).json({ message: 'Not Found', data: {}});
                return;
            }
            res.status(200).json( {message: 'success', data: user });

        } catch (error) {
            res.status(500).json({
                message: `Error del servidor, al obtener el usuario`
            })
            console.error(error);
        }
    }


   async create(req, res){
        try {
            const { body } = req;
            const { name, email, password, role} = body;

            if( !name || !email || !password){
                return res.status(403).send('Faltan Parametros Obligatorios');
            }
            const userExists = await User.findOne({ email});

            if(userExists){
                return  res.status(409).json({
                    message: `El usuario ya está registrado`
                })
            }

            const passwordHash = await bcrypt.hash( password, 10);
            const newUser = await User.create({
                name,
                email,
                password: passwordHash,
                role: role || 'user'
            });

            const id = newUser._id;
            res.json({ message:  ` Usuario Registrado con el ID ${id} ` });
        } catch (error) {
            res.status(500).json({
                message: `Error del servidor, al crear el usuario`
            })
            console.error(error);
        }
    }

     async update(req, res){
        try {
            const { uid } = req.params;
            const { body } = req;
            const { name, email, password, role} = body;
            console.log({body});
            if (!name || !email) {
    return res.status(403).send('Faltan Parametros Obligatorios');
}

            const data = {
                name,
                email
            }

            if( password){
                data.password  = await bcrypt.hash( password, 10);
            }

            if( role){
                data.role = role;
            }
            console.log(data)
          const user = await User.findByIdAndUpdate(uid, data);

if (!user) {
    return res.status(404).json({
        message: 'Not Found',
        data: {}
    });
}
            res.status(200).json( {message: 'success', data: {} });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: `Error del servidor, al actualizar el usuario`
            })
        }
    }

    async delete(req, res){
        try {
            const { uid } = req.params;
            const status = await User.findByIdAndDelete(uid);

if (!status) {
    res.status(404).json({ message: 'Not Found', data: {}});
    return;
}
            res.status(200).json( {message: 'success', data: {} });
        } catch (error) {
            res.status(500).json({
                message: `Error del servidor, al eliminar el usuario`
            })
            console.error(error);
        }
    }

        async uploadProfileImage( req, res) {
        try {
            // Verificamos si no se paso una archivo
            if( !req.file){
                return res.status(400).json({
                    message: `No se envio el archivo`
                })
            }
            const imagePath = `/uploads/profiles/${req.file.filename}`;

            const uid = req.user._id;

            const user = await User.findByIdAndUpdate(
                uid, 
                {profileImage: imagePath}, 
                { new: true}
            ).select('_id name email profileImage');

            if(!user){
                return res.status(404).json({
                    message: 'Usuario no econtrado'
                })
            }

            return res.status(200).json({
                message: 'Imagen actualizada', 
                data: user 
            });
            
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: `Error del servidor, al actualizar la foto del usuario`
            })
        }
    }


async getMe(req, res) {
    try {
        const uid = req.user._id;
        const user = await User.findById(uid).select('-password');

        if (!user) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        }

        res.status(200).json({
            message: 'success',
            data: user
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error al obtener el Perfil"
        });
    }
}

}

export default UserController;