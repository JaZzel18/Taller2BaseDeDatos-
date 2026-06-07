import {Usuario} from '../model/Usuario.js';

export class UsuarioController {
    static async RegistrarUsuario(req, res) {
        try {
            const Data = req.body;
            console.log(Data);
            const respuesta = await Usuario.RegistrarUsuario(Data);
            res.status(parseInt(respuesta.status)).json(respuesta);
        } catch (error) {
            res.status(500).json({
                "status": "500",
                "message": "Error al registrar usuario " + error.message,
                "data": null
            });
        }
    }

    static async DesactivarUsuario(req, res) {
        try {
            const {id} = req.params;
            const respuesta = await Usuario.DesactivarUsuario(id);
            res.status(parseInt(respuesta.status)).json(respuesta);
        } catch (error) {
            res.status(500).json({
                "status": "500",
                "message": "Error al desactivar usuario " + error.message,
                "data": null
            });
        }
    }

    static async ListarUsuariosYBibliotecarias(req, res) {
        try {
            const respuesta = await Usuario.ListarUsuariosYBibliotecarias();
            res.status(parseInt(respuesta.status)).json(respuesta);
        } catch (error) {
            res.status(500).json({
                "status": "500",
                "message": "Error al listar " + error.message,
                "data": null
            });
        }
    }

    static async ListarUsuariosConTransaccion(req, res) {
        try {
            const respuesta = await Usuario.ListarUsuariosConTransaccion();
            res.status(parseInt(respuesta.status)).json(respuesta);
        } catch (error) {
            res.status(500).json({
                "status": "500",
                "message": "Error al listar " + error.message,
                "data": null
            });
        }
    }

    static async ListarClientes(req, res) {
        try {
            const respuesta = await Usuario.ListarClientes();
            res.status(parseInt(respuesta.status)).json(respuesta);
        } catch (error) {
            res.status(500).json({
                "status": "500",
                "message": "Error al listar clientes " + error.message,
                "data": null
            });
        }
    }
}