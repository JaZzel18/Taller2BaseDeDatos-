import express from 'express';
import cookieParser from 'cookie-parser';
import trabajador from './router/Trabajador.js';
import libro from './router/Libro.js';
import usuario from './router/Usuario.js';
import transaccion from './router/Transaccion.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());
app.use('/trabajador', trabajador);
app.use('/libro', libro);
app.use('/usuario', usuario);
app.use('/transaccion', transaccion);

app.listen(PORT,()=>{
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
})