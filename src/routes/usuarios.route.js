// usuario.route.js
import express from 'express';
import {
    verificarToken,
    obtenerTodosUsuarios,
    obtenerUsuarioID,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
    iniciarSesion,
    cerrarSesion,
} from '../controllers/usuarios.controller.js';

const enrutadorUsuarios = express.Router();

enrutadorUsuarios.get('/', obtenerTodosUsuarios);
enrutadorUsuarios.get('/:id', obtenerUsuarioID);
enrutadorUsuarios.post('/', crearUsuario);
enrutadorUsuarios.put('/:id', verificarToken, actualizarUsuario);
enrutadorUsuarios.delete('/:id', verificarToken, eliminarUsuario);
enrutadorUsuarios.post('/login', iniciarSesion);
enrutadorUsuarios.post('/logout', cerrarSesion);

export { enrutadorUsuarios };
