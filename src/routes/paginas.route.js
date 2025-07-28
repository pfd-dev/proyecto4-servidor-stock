import express from 'express';
import { productoModel } from '../models/productos.model.js';
const enrutadorPaginas = express.Router();

enrutadorPaginas.get('/', async (req, res) => {
  try {
    const productos = await productoModel.find();

    res.render('index', {
      titulo: 'Página de Inicio',
      productos: productos,
      estado: productos.length === 0 ? 'vacio' : 'ok'
    });
  } catch (error) {
    console.error('Error al obtener productos:', error.message);
    res.render('index', {
      titulo: 'Página de Inicio',
      productos: [],
      estado: 'error'
    });
  }
});

enrutadorPaginas.get('/panel-control', (req, res) => {
  res.render('panelControl', { titulo: 'pagina de panel de control' });
})

enrutadorPaginas.get('/iniciar-sesion', (req, res) => {
  res.render('inicioSesion', { titulo: 'pagina de iniciar sesion' });
})

enrutadorPaginas.get('/cerrar-sesion', (req, res) => {
  res.render('cerrarSesion', { titulo: 'pagina de cerrar sesion' });
})


export { enrutadorPaginas };
