import connection from '../database/DataBase.js';

export class Libro {
    static async RegistrarLibro(Data) {
        try {
            if (Data == null) {
                return {
                    "status": 400,
                    "message": "Datos no proporcionados",
                    "data": null
                }
            }
            const query = 'INSERT INTO Libro (Nombre, Genero, Autor, fecha_recepcion, cantidad_copias, edad_sugerida, editorial, precio, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
            const [respuesta] = await connection.query(query, [Data.Nombre, Data.Genero, Data.Autor, Data.fecha_recepcion, Data.cantidad_copias, Data.edad_sugerida, Data.editorial, Data.precio, Data.estado]);
            if (respuesta.affectedRows === 0) {
                return {
                    "status": 400,
                    "message": "Error al registrar libro",
                    "data": null
                }
            }
            return {
                "status": 201,
                "message": "Libro registrado exitosamente",
                "data": null
            };
        } catch (error) {
            return {
                "status": 500,
                "message": "Error al registrar libro" + error.message,
                "data": null
            }
        }
    }

    static async DeshabilitarCopia(id) {
        try {
            if (id == null) {
                return {
                    "status": 400,
                    "message": "Id no proporcionado",
                    "data": null
                }
            }
            const [copia] = await connection.query('SELECT * FROM Copia_libro WHERE id = ?', [id]);
            if (copia.length === 0) {
                return {
                    "status": 404,
                    "message": "Copia no encontrada",
                    "data": null
                }
            }
            await connection.query('UPDATE Copia_libro SET estado = 0 WHERE id = ?', [id]);
            return {
                "status": 200,
                "message": "Copia deshabilitada correctamente",
                "data": null
            };
        } catch (error) {
            return {
                "status": 500,
                "message": "Error al deshabilitar copia" + error.message,
                "data": null
            }
        }
    }

    static async ActualizarPrecio(id, precio) {
        try {
            const [libro] = await connection.query('SELECT precio FROM Libro WHERE id = ?', [id]);
            if (libro.length === 0) {
                return {
                    "status": 404,
                    "message": "Libro no encontrado",
                    "data": null
                }
            }
            if (precio <= libro[0].precio) {
                return {
                    "status": 400,
                    "message": "El precio debe ser mayor al actual",
                    "data": null
                }
            }
            await connection.query('UPDATE Libro SET precio = ? WHERE id = ?', [precio, id]);
            return {
                "status": 200,
                "message": "Precio actualizado correctamente",
                "data": null
            };
        } catch (error) {
            return {
                "status": 500,
                "message": "Error al actualizar precio" + error.message,
                "data": null
            }
        }
    }

    static async ListarLibrosDisponibles() {
        try {
            const [libros] = await connection.query(
                'SELECT l.*, COUNT(cl.id) as copias_disponibles FROM Libro l JOIN Copia_libro cl ON l.id = cl.Libroid WHERE l.estado = 1 AND cl.estado = 1 GROUP BY l.id'
            );
            return {
                "status": 200,
                "message": "Libros disponibles",
                "data": libros
            };
        } catch (error) {
            return {
                "status": 500,
                "message": "Error al listar libros" + error.message,
                "data": null
            }
        }
    }

    static async ListarLibrosSemanaActual() {
        try {
            const [libros] = await connection.query(`
                SELECT DISTINCT l.* FROM Libro l
                JOIN Copia_libro cl ON l.id = cl.Libroid
                JOIN Transaccion t ON cl.id = t.Copia_libroid
                WHERE YEARWEEK(t.Fecha, 1) = YEARWEEK(CURDATE(), 1)
            `);
            return {
                "status": 200,
                "message": "Libros de la semana actual",
                "data": libros
            };
        } catch (error) {
            return {
                "status": 500,
                "message": "Error al listar libros" + error.message,
                "data": null
            }
        }
    }

    static async IncrementarStock(id) {
        try {
            const [libro] = await connection.query('SELECT * FROM Libro WHERE id = ?', [id]);
            if (libro.length === 0) {
                return {
                    "status": 404,
                    "message": "Libro no encontrado",
                    "data": null
                }
            }
            const codigoBarras = 'CB-' + Date.now();
            await connection.query('INSERT INTO Copia_libro (codigo_barras, estado, Libroid) VALUES (?, 1, ?)', [codigoBarras, id]);
            await connection.query('UPDATE Libro SET cantidad_copias = cantidad_copias + 1 WHERE id = ?', [id]);
            return {
                "status": 201,
                "message": "Stock incrementado correctamente",
                "data": null
            };
        } catch (error) {
            return {
                "status": 500,
                "message": "Error al incrementar stock" + error.message,
                "data": null
            }
        }
    }

    static async CantidadLibrosVendidosAnio() {
        try {
            const [resultado] = await connection.query(`
                SELECT COUNT(*) as total_vendidos FROM Transaccion
                WHERE es_venta = 1 AND YEAR(Fecha) = YEAR(CURDATE())
            `);
            return {
                "status": 200,
                "message": "Cantidad de libros vendidos",
                "data": resultado
            };
        } catch (error) {
            return {
                "status": 500,
                "message": "Error al contar libros" + error.message,
                "data": null
            }
        }
    }

    static async TopLibrosFiccion() {
        try {
            const [libros] = await connection.query(`
                SELECT l.Nombre, l.Autor, COUNT(t.id) as total_ventas
                FROM Libro l
                JOIN Copia_libro cl ON l.id = cl.Libroid
                JOIN Transaccion t ON cl.id = t.Copia_libroid
                WHERE l.Genero = 1 AND t.es_venta = 1
                AND t.semestre = 1 AND YEAR(t.Fecha) = 2026
                GROUP BY l.id
                ORDER BY total_ventas DESC
                LIMIT 10
            `);
            return {
                "status": 200,
                "message": "Top 10 libros ficcion",
                "data": libros
            };
        } catch (error) {
            return {
                "status": 500,
                "message": "Error al obtener top libros" + error.message,
                "data": null
            }
        }
    }
}
