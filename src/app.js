import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import MongoStore from 'connect-mongo';

import express from 'express';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';

dotenv.config();

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

// Configuración de express-session
app.use(session({
  name: 'nombreTokenSesion',                        // nombre de la cookie de sesión
  secret: process.env.CLAVE_SESSION,  // guárdar en .env
  resave: false,                      // no volver a guardar si no hubo cambios
  saveUninitialized: false,           // no guardar sesión vacía
  cookie: {
    maxAge: 3 * 60 * 1000,          // 3 minutos en milisegundos
    httpOnly: true,
    // secure: true,               // habilitar en HTTPS
  },
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_CONNECT_URI,  // URL de tu base de datos MongoDB
    collectionName: 'sesiones',       // Nombre de la colección en MongoDB
    ttl: 60 * 5                       // Tiempo de vida en segundos (5 min)
  }),
}));

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
  next(createError(404));
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
