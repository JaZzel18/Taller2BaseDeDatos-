import {Transaccion} from '../model/Transaccion.js';

export class TransaccionController {
    static async RegistrarTransaccion(req, res) {
        try {
            const Data = req.body;
            console.log(Data);
            const respuesta = await Transaccion.RegistrarTransaccion(Data);
            res.status(parseInt(respuesta.status)).json(respuesta);
        } catch (error) {
            res.status(500).json({
                "status": "500",
                "message": "Error al registrar transaccion " + error.message,
                "data": null
            });
        }
    }

    static async ConsultarDetalle(req, res) {
        try {
            const {usuarioId, fecha} = req.params;
            const respuesta = await Transaccion.ConsultarDetalle(usuarioId, fecha);
            res.status(parseInt(respuesta.status)).json(respuesta);
        } catch (error) {
            res.status(500).json({
                "status": "500",
                "message": "Error al consultar transacciones " + error.message,
                "data": null
            });
        }
    }
}