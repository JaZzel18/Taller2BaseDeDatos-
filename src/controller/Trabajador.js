import {Trabajador} from '../model/Trabajador.js';

export class TrabajadorController{
    static async IniciarSesion(req,res){
        try{
            const Data = req.body;
            console.log(Data);
            const respuesta = await Trabajador.IniciarSesion(Data);
            if(respuesta.data == null){
                return res.status(401).json(respuesta);
            }
            console.log(respuesta);
            res.cookie('token', respuesta.data.token, {
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 3600000
            });
            res.status(respuesta.status).json(respuesta);
        }catch(error){
            res.status(500).json({
                "status": "500",
                "message": "Error al iniciar sesión " + error.message,
                "data": null
            });
        }
    }

    static async RegistrarTrabajador(req,res){
        try{
            const Data = req.body;
            console.log(Data);
            const respuesta = await Trabajador.RegistrarTrabajador(Data);
            res.status(parseInt(respuesta.status)).json(respuesta);
        }catch(error){
            res.status(500).json({
                "status": "500",
                "message": "Error al registrar trabajador " + error.message,
                "data": null
            });
        }
    }
}