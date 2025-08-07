import express from 'express';
// Controladores
import { damePaginaInicio, damePaginaPanelSesiones, damePaginaPanelControl } from '../controllers/paginas.controller.js';
import { protegerRutaCookieJWT } from '../middlewares/middleware-protegerRuta-jwt.js';
import { protegerRutaCookieExpressSession } from '../middlewares/middleware-protegerRuta-session.js';

const enrutadorPaginas = express.Router();

enrutadorPaginas.get('/', damePaginaInicio);

enrutadorPaginas.get('/panel-control', protegerRutaCookieJWT, damePaginaPanelControl);
enrutadorPaginas.get('/panel-sesiones', protegerRutaCookieExpressSession, damePaginaPanelSesiones);
enrutadorPaginas.post('/panel-sesiones/eliminar/:sid', (req, res) => { res.send(`Eliminar la sesion con SID ${req.params.sid}`) });
enrutadorPaginas.get('/iniciar-sesion-jwt', (req, res) => {
  res.render('inicioSesionJWT', { titulo: 'pagina de iniciar sesion con JWT' });
});

enrutadorPaginas.get('/iniciar-sesion-express-session', (req, res) => {
  res.render('inicioSesionExpressSession', { titulo: 'pagina de iniciar sesion con express-session.' });
});

enrutadorPaginas.get('/cerrar-sesion', (req, res) => {
  res.render('inicioSesionJWT', { titulo: 'pagina de cerrar sesion' });
});

export { enrutadorPaginas };
