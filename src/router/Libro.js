import { LibroController } from "../controller/Libro.js";
import { verificarToken } from "../middleware/auth.js";
import express from 'express';

const libro = express.Router();

libro.post('/registrarLibro', verificarToken, LibroController.RegistrarLibro);
libro.put('/deshabilitarCopia/:id', verificarToken, LibroController.DeshabilitarCopia);
libro.put('/actualizarPrecio/:id', verificarToken, LibroController.ActualizarPrecio);
libro.get('/listarLibrosDisponibles', LibroController.ListarLibrosDisponibles);
libro.get('/listarLibrosSemanaActual', LibroController.ListarLibrosSemanaActual);
libro.post('/incrementarStock/:id', verificarToken, LibroController.IncrementarStock);
libro.get('/cantidadLibrosVendidos', LibroController.CantidadLibrosVendidosAnio);
libro.get('/topLibrosFiccion', LibroController.TopLibrosFiccion);

export default libro;