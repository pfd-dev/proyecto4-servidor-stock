import express from 'express';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';

// Modelos
import { usuarioModel } from '../models/usuario.model.js';
import { productoModel } from '../models/productos.model.js';
import { protegerRuta } from '../middlewares/middlewares.js';

// Controladores
import { damePaginaInicio, damePanelSesiones } from '../controllers/paginas.controller.js';

const enrutadorPaginas = express.Router();

enrutadorPaginas.get('/', damePaginaInicio);

// NUEVA RUTA: panel de sesiones
enrutadorPaginas.get('/panel-sesiones', damePanelSesiones);

// Ruta para eliminar una sesión manualmente
enrutadorPaginas.post('/panel-sesiones/eliminar/:sid', protegerRuta, async (req, res) => {
  try {
    const mongoStore = MongoStore.create({
      mongoUrl: process.env.MONGODB_CONNECT_URI,
      collectionName: 'sesiones'
    });

    mongoStore.destroy(req.params.sid, (err) => {
      if (err) {
        console.error('Error al eliminar sesión:', err);
        return res.status(500).send('Error al eliminar la sesión');
      }

      res.redirect('/panel-sesiones');
    });
  } catch (error) {
    console.error('Error al procesar eliminación:', error.message);
    res.status(500).send('Error interno');
  }
});


enrutadorPaginas.get('/panel-control', protegerRuta, async (req, res) => {
  try {
    const productos = await productoModel.find();

    res.render('panelControl', {
      titulo: 'Página de Panel de control',
      productos: productos,
      estado: productos.length === 0 ? 'vacio' : 'ok'
    });
  } catch (error) {
    console.error('Error al obtener productos:', error.message);
    res.render('panelControl', {
      titulo: 'Página de Panel de control',
      productos: [],
      estado: 'error'
    });
  }
});

enrutadorPaginas.get('/iniciar-sesion', (req, res) => {
  res.render('inicioSesion', { titulo: 'pagina de iniciar sesion' });
});

enrutadorPaginas.get('/iniciar-sesion-bd', (req, res) => {
  res.render('inicioSesionBD', { titulo: 'pagina de iniciar sesion con la base de datos.' });
});

enrutadorPaginas.get('/cerrar-sesion', protegerRuta, (req, res) => {
  res.render('cerrarSesion', { titulo: 'pagina de cerrar sesion' });
});


export { enrutadorPaginas };
