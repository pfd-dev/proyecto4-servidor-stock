// importaciones módulos y librerías nativos
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// importaciones módulos y librerías terceros
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

// configuración
import { configureCookieExpressSession } from './config/cookie-usuario-session.config.js';

// middlewares
import { middlewareExpressGlobalError } from './middlewares/middlewares-express/middleware-express-global-errors.js';
import { middlewareExpressHttpError } from './middlewares/middlewares-express/middleware-express-http-errors.js';

// rutas
import { indexRouter } from './routes/index.router.js';

// Configuración para obtener __dirname en ES Modules
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express(); // Inicialización de la aplicación Express

// Middlewares para manejo de solicitudes en modo desarrollo
app.use(logger('dev'));

// configuración de middlewares conexion de datos
app.use(cors()); // Habilitar CORS
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser()); // Parseo de cookies

// Configura cookie sesion de express-session
app.use(configureCookieExpressSession());

// configuración de vistas y archivos estáticos
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '../public')));

// Rutas principales de la aplicación
app.use('/', indexRouter);

// Middleware para capturar errores 404
app.use(middlewareExpressHttpError);

// Middleware para manejo general de errores
app.use(middlewareExpressGlobalError);

export default app;
