import connection from '../database/DataBase.js';

export class Usuario {
    static async RegistrarUsuario(Data) {
        try {
            if (Data == null) {
                return {
                    "status": 400,
                    "message": "Datos no proporcionados",
                    "data": null
                }
            }
            const query = 'INSERT INTO Usuario (nombre, rut, direccion, estado) VALUES (?, ?, ?, ?)';
            const [respuesta] = await connection.query(query, [Data.nombre, Data.rut, Data.direccion, 1]);
            if (respuesta.affectedRows === 0) {
                return {
                    "status": 400,
                    "message": "Error al registrar usuario",
                    "data": null
                }
            }
            return {
                "status": 201,
                "message": "Usuario registrado exitosamente",
                "data": null
            };
        } catch (error) {
            return {
                "status": 500,
                "message": "Error al registrar usuario" + error.message,
                "data": null
            }
        }
    }

    static async DesactivarUsuario(id) {
        try {
            if (id == null) {
                return {
                    "status": 400,
                    "message": "Id no proporcionado",
                    "data": null
                }
            }
            const [usuario] = await connection.query('SELECT * FROM Usuario WHERE id = ?', [id]);
            if (usuario.length === 0) {
                return {
                    "status": 404,
                    "message": "Usuario no encontrado",
                    "data": null
                }
            }
            await connection.query('UPDATE Usuario SET estado = 0 WHERE id = ?', [id]);
            return {
                "status": 200,
                "message": "Usuario desactivado correctamente",
                "data": null
            };
        } catch (error) {
            return {
                "status": 500,
                "message": "Error al desactivar usuario" + error.message,
                "data": null
            }
        }
    }

    // 8. Listar usuarios y bibliotecarias
    static async ListarUsuariosYBibliotecarias() {
        try {
            const [usuarios] = await connection.query('SELECT * FROM Usuario');
            const [trabajadores] = await connection.query('SELECT * FROM TrabajadorI');
            return {
                "status": 200,
                "message": "Listado obtenido correctamente",
                "data": {usuarios, trabajadores}
            };
        } catch (error) {
            return {
                "status": 500,
                "message": "Error al listar" + error.message,
                "data": null
            }
        }
    }

    // 9. Listar usuarios con al menos un préstamo/venta
    static async ListarUsuariosConTransaccion() {
        try {
            const [usuarios] = await connection.query(`
                SELECT DISTINCT u.* FROM Usuario u
                JOIN Transaccion t ON u.id = t.UsuarioId
            `);
            return {
                "status": 200,
                "message": "Listado obtenido correctamente",
                "data": usuarios
            };
        } catch (error) {
            return {
                "status": 500,
                "message": "Error al listar" + error.message,
                "data": null
            }
        }
    }

    // 10. Listar todos los clientes
    static async ListarClientes() {
        try {
            const [usuarios] = await connection.query('SELECT * FROM Usuario WHERE estado = 1');
            return {
                "status": 200,
                "message": "Listado obtenido correctamente",
                "data": usuarios
            };
        } catch (error) {
            return {
                "status": 500,
                "message": "Error al listar clientes" + error.message,
                "data": null
            }
        }
    }
}