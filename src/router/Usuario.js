import { UsuarioController } from "../controller/Usuario.js";
import express from 'express';

const usuario = express.Router();

usuario.post('/registrarUsuario', UsuarioController.RegistrarUsuario);
usuario.put('/desactivarUsuario/:id', UsuarioController.DesactivarUsuario);
usuario.get('/listarUsuariosYBibliotecarias', UsuarioController.ListarUsuariosYBibliotecarias);
usuario.get('/listarUsuariosConTransaccion', UsuarioController.ListarUsuariosConTransaccion);
usuario.get('/listarClientes', UsuarioController.ListarClientes);

export default usuario;