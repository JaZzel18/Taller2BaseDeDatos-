import connection from '../database/DataBase.js';
import bcrypt from 'bcryptjs';
import {generateToken} from '../utils/JwtGenerador.js';

export class Trabajador{
    static async IniciarSesion(Data){
        try{
            if(Data == null){
                return {
                    "status": 400,
                    "message": "Datos de inicio de sesión no proporcionados",
                    "data": null
                }
            }
            const query = 'SELECT id,contrasenia, correo FROM TrabajadorI WHERE correo = ?'
            const [respuesta] = await connection.query(query, [Data.correo]);
            if(respuesta.length === 0){
                return {
                    "status": 404,
                    "message": "Trabajador no encontrado",
                    "data": null
                }
            }
            const trabajador = respuesta[0];
            const passwordMatch = await bcrypt.compare(Data.contrasenia, trabajador.contrasenia);
            if(passwordMatch){
                return {
                    "status": 200,
                    "message": "Inicio de sesión exitoso",
                    "data": {
                        "id": trabajador.id,
                        "correo": trabajador.correo,
                        "contrasenia": trabajador.contrasenia,
                        "token": generateToken(trabajador)
                    }
                }
            }
            return {
                "status": 401,
                "message": "Contraseña incorrecta",
                "data": null
            }
        }catch(error){
            return {
                "status": 500,
                "message": "Error al iniciar sesión"+ error.message,
                "data": null
            }
        }
    }

    static async RegistrarTrabajador(Data){
        try{
            if(Data == null){
                return {
                    "status": 400,
                    "message": "Datos de registro no proporcionados",
                    "data": null
                }
            }
            const query = 'INSERT INTO TrabajadorI (bono, contrasenia, correo, estado, nombre, rut, sueldo, RolId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
            const hashedPassword = await bcrypt.hash(Data.contrasenia, 10);
            const [respuesta] = await connection.query(query, [Data.bono, hashedPassword, Data.correo, true, Data.nombre, Data.rut, Data.sueldo, 1]);
            if(respuesta.affectedRows === 0){
                return {
                    "status": 400,
                    "message": "Error al registrar trabajador",
                    "data": null
                }
            }
            return {
                "status": 201,
                "message": "Trabajador registrado exitosamente",
                "data": null
            };
        }catch(error){
            return {
                "status": 500,
                "message": "Error al registrar trabajador"+ error.message,
                "data": null
            }
        }
    }
}