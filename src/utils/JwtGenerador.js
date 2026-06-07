import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
import {randomUUID} from 'crypto';

dotenv.config();

export const generateToken = (trabajador)=>{
    return jsonwebtoken.sign({
        id: trabajador.id,
        correo: trabajador.correo,
        jti: randomUUID()
    },
    process.env.JWT_SECRET,
    {
        expiresIn: '1h',
        algorithm: 'HS256'
    });
}