import { TransaccionController } from "../controller/Transaccion.js";
import { verificarToken } from "../middleware/auth.js";
import express from 'express';

const transaccion = express.Router();

transaccion.post('/registrarTransaccion', verificarToken, TransaccionController.RegistrarTransaccion);
transaccion.get('/consultarDetalle/:usuarioId/:fecha', verificarToken, TransaccionController.ConsultarDetalle);

export default transaccion;