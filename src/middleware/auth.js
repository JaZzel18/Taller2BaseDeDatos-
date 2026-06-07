import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const verificarToken = (req, res, next) => {
    try {
        const token = req.cookies?.token || req.headers['authorization']?.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                "status": 401,
                "message": "No tienes autorización para realizar esta acción",
                "data": null
            });
        }
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        req.trabajador = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            "status": 401,
            "message": "Token inválido o expirado",
            "data": null
        });
    }
}