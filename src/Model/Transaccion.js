import connection from '../database/DataBase.js';

export class Transaccion {
    static async RegistrarTransaccion(Data) {
        try {
            if (Data == null) {
                return {
                    "status": 400,
                    "message": "Datos no proporcionados",
                    "data": null
                }
            }

            // Obtener la copia y el libro
            const [copia] = await connection.query(
                'SELECT cl.id, l.precio, l.edad_sugerida FROM Copia_libro cl JOIN Libro l ON cl.Libroid = l.id WHERE cl.id = ? AND cl.estado = 1',
                [Data.Copia_libroid]
            );
            if (copia.length === 0) {
                return {
                    "status": 404,
                    "message": "Copia no disponible",
                    "data": null
                }
            }

            // Verificar usuario
            const [usuario] = await connection.query('SELECT * FROM Usuario WHERE id = ?', [Data.UsuarioId]);
            if (usuario.length === 0) {
                return {
                    "status": 404,
                    "message": "Usuario no encontrado",
                    "data": null
                }
            }

            // Validar edad sugerida
            if (copia[0].edad_sugerida !== null && usuario[0].edad < copia[0].edad_sugerida) {
                return {
                    "status": 400,
                    "message": "El usuario no cumple con la edad sugerida para este libro",
                    "data": null
                }
            }

            // Calcular semestre
            const fecha = new Date(Data.Fecha);
            const mes = fecha.getMonth() + 1;
            const semestre = mes <= 6 ? 1 : 2;

            // Calcular si es fin de semana
            const diaSemana = fecha.getDay();
            const esFinDeSemana = diaSemana === 0 || diaSemana === 6;

            // Calcular precio total y bono
            let precio_total = 0;
            let bono = 0;

            if (Data.es_venta === 1) {
                precio_total = Math.round(copia[0].precio * 1.19);
                bono = Math.round(copia[0].precio * 0.3) + (esFinDeSemana ? 650 : 500);
            } else {
                precio_total = copia[0].precio;
                bono = Math.round(copia[0].precio * 0.1) + (esFinDeSemana ? 250 : 100);
            }

            // Registrar transaccion
            const query = 'INSERT INTO Transaccion (TrabajadorId, UsuarioId, Fecha, semestre, precio_total, Copia_libroid, es_venta, es_prestamo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
            const [respuesta] = await connection.query(query, [
                Data.TrabajadorId, Data.UsuarioId, Data.Fecha,
                semestre, precio_total, Data.Copia_libroid,
                Data.es_venta, Data.es_prestamo
            ]);

            if (respuesta.affectedRows === 0) {
                return {
                    "status": 400,
                    "message": "Error al registrar transaccion",
                    "data": null
                }
            }

            // Actualizar bono del trabajador
            await connection.query('UPDATE TrabajadorI SET bono = bono + ? WHERE id = ?', [bono, Data.TrabajadorId]);

            return {
                "status": 201,
                "message": "Transaccion registrada exitosamente",
                "data": null
            };
        } catch (error) {
            return {
                "status": 500,
                "message": "Error al registrar transaccion" + error.message,
                "data": null
            }
        }
    }

    static async ConsultarDetalle(usuarioId, fecha) {
        try {
            const query = `
                SELECT t.id, t.Fecha, t.semestre, t.precio_total, t.es_venta, t.es_prestamo,
                u.nombre as usuario, l.Nombre as libro, l.precio
                FROM Transaccion t
                JOIN Usuario u ON t.UsuarioId = u.id
                JOIN Copia_libro cl ON t.Copia_libroid = cl.id
                JOIN Libro l ON cl.Libroid = l.id
                WHERE t.UsuarioId = ? AND t.Fecha = ?`;
            const [respuesta] = await connection.query(query, [usuarioId, fecha]);
            if (respuesta.length === 0) {
                return {
                    "status": 404,
                    "message": "No se encontraron transacciones",
                    "data": null
                }
            }
            return {
                "status": 200,
                "message": "Transacciones encontradas",
                "data": respuesta
            };
        } catch (error) {
            return {
                "status": 500,
                "message": "Error al consultar transacciones" + error.message,
                "data": null
            }
        }
    }
}