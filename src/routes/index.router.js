import express from 'express';
// rutas
import { enrutadorPaginas } from '../routes/paginas.route.js';
import { enrutadorUsuarios } from '../routes/usuarios.route.js';
import { enrutadorProductos } from '../routes/productos.route.js';
import { enrutadorCompras } from '../routes/compras.route.js';

const indexRouter = express.Router();

// Rutas principales de la aplicación
indexRouter.use('/api/productos', enrutadorProductos);
indexRouter.use('/api/usuarios', enrutadorUsuarios);
indexRouter.use('/api/compras', enrutadorCompras);
indexRouter.use('/', enrutadorPaginas);

export { indexRouter };