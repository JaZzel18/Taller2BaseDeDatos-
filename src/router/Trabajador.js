import { TrabajadorController } from "../controller/Trabajador.js";
import express from 'express';

const trabajador = express.Router();

trabajador.post('/iniciarSesion', TrabajadorController.IniciarSesion);
trabajador.post('/registrarTrabajador', TrabajadorController.RegistrarTrabajador);

export default trabajador;