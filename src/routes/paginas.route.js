import express from 'express';

import { productoModel } from '../models/productos.model.js';
import { protegerRuta } from '../middlewares/middlewares.js';

const enrutadorPaginas = express.Router();

enrutadorPaginas.get('/', (req, res) => {
  res.render('index', { titulo: 'pagina de inicio' });
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

enrutadorPaginas.get('/cerrar-sesion', protegerRuta, (req, res) => {
  res.render('cerrarSesion', { titulo: 'pagina de cerrar sesion' });
});


export { enrutadorPaginas };
