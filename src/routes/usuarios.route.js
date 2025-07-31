// usuario.route.js
import express from 'express';
import {
    // protegerRutaCookie,
    obtenerTodosUsuarios,
    obtenerUsuarioID,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
    iniciarSesion,
    iniciarSesionBD,
    cerrarSesion,
} from '../controllers/usuarios.controller.js';

import { protegerRuta } from "../middlewares/middlewares.js"

const enrutadorUsuarios = express.Router();

enrutadorUsuarios.get('/', obtenerTodosUsuarios);
enrutadorUsuarios.get('/:id', obtenerUsuarioID);
enrutadorUsuarios.post('/', crearUsuario);
enrutadorUsuarios.put('/:id', protegerRuta, actualizarUsuario);
enrutadorUsuarios.delete('/:id', protegerRuta, eliminarUsuario);
enrutadorUsuarios.post('/loginToken', iniciarSesion);
enrutadorUsuarios.post('/loginSesion', iniciarSesionBD);
enrutadorUsuarios.post('/logout', cerrarSesion);

export { enrutadorUsuarios };
