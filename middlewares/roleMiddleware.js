import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;


const roleMiddlware = (req, res, next) => {
    const role = req.user.role;
    if( role !== 'admin'){ // !=
        return res.status(403).json({
            message: 'Acceso denegado2'
        })
    }

    next();

}

export default roleMiddlware;