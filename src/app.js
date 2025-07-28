import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import express from 'express';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

import { enrutadorPaginas } from './routes/paginas.route.js';
import { enrutadorUsuarios } from './routes/usuarios.route.js';
import { enrutadorProductos } from './routes/productos.route.js';

// Configuración para obtener __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Inicialización de la aplicación Express
const app = express();

// Habilitar CORS para todas las rutas
app.use(cors());

app.use(express.json()); // Parseo de JSON en body
app.use(express.urlencoded({ extended: false })); // Parseo de datos codificados en URL
app.use(cookieParser()); // Parseo de cookies

// Configuración del motor de vistas y carpeta de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '../public'))); // Servir archivos estáticos

// Middlewares para manejo de solicitudes en modo desarrollo
app.use(logger('dev'));

// Rutas principales de la aplicación
app.use('/', enrutadorPaginas);
app.use('/api/usuarios', enrutadorUsuarios);
app.use('/api/productos', enrutadorProductos);

// Middleware para capturar errores 404
app.use((req, res, next) => {
  next(createError(500));
});

// Middleware para manejo general de errores
app.use((err, req, res, next) => {
  // Define variables locales para renderizar el error
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Renderiza la vista de error con el código correspondiente
  res.status(err.status || 500);
  res.render('error');
});

export default app;
