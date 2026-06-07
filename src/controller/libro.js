import {Libro} from '../model/Libro.js';

export class LibroController {
    static async RegistrarLibro(req, res) {
        try {
            const Data = req.body;
            console.log(Data);
            const respuesta = await Libro.RegistrarLibro(Data);
            res.status(parseInt(respuesta.status)).json(respuesta);
        } catch (error) {
            res.status(500).json({ "status": "500", "message": "Error " + error.message, "data": null });
        }
    }

    static async DeshabilitarCopia(req, res) {
        try {
            const {id} = req.params;
            const respuesta = await Libro.DeshabilitarCopia(id);
            res.status(parseInt(respuesta.status)).json(respuesta);
        } catch (error) {
            res.status(500).json({ "status": "500", "message": "Error " + error.message, "data": null });
        }
    }

    static async ActualizarPrecio(req, res) {
        try {
            const {id} = req.params;
            const {precio} = req.body;
            const respuesta = await Libro.ActualizarPrecio(id, precio);
            res.status(parseInt(respuesta.status)).json(respuesta);
        } catch (error) {
            res.status(500).json({ "status": "500", "message": "Error " + error.message, "data": null });
        }
    }

    static async ListarLibrosDisponibles(req, res) {
        try {
            const respuesta = await Libro.ListarLibrosDisponibles();
            res.status(parseInt(respuesta.status)).json(respuesta);
        } catch (error) {
            res.status(500).json({ "status": "500", "message": "Error " + error.message, "data": null });
        }
    }

    static async ListarLibrosSemanaActual(req, res) {
        try {
            const respuesta = await Libro.ListarLibrosSemanaActual();
            res.status(parseInt(respuesta.status)).json(respuesta);
        } catch (error) {
            res.status(500).json({ "status": "500", "message": "Error " + error.message, "data": null });
        }
    }

    static async IncrementarStock(req, res) {
        try {
            const {id} = req.params;
            const respuesta = await Libro.IncrementarStock(id);
            res.status(parseInt(respuesta.status)).json(respuesta);
        } catch (error) {
            res.status(500).json({ "status": "500", "message": "Error " + error.message, "data": null });
        }
    }

    static async CantidadLibrosVendidosAnio(req, res) {
        try {
            const respuesta = await Libro.CantidadLibrosVendidosAnio();
            res.status(parseInt(respuesta.status)).json(respuesta);
        } catch (error) {
            res.status(500).json({ "status": "500", "message": "Error " + error.message, "data": null });
        }
    }

    static async TopLibrosFiccion(req, res) {
        try {
            const respuesta = await Libro.TopLibrosFiccion();
            res.status(parseInt(respuesta.status)).json(respuesta);
        } catch (error) {
            res.status(500).json({ "status": "500", "message": "Error " + error.message, "data": null });
        }
    }
}