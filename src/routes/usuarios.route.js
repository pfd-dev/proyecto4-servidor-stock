import express from 'express';

import {
    obtenerTodosUsuarios,
    obtenerUsuarioID,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
    iniciarSesionJWT,
    iniciarSesionExpressSession,
    cerrarSesion,
} from '../controllers/usuarios.controller.js';

const enrutadorUsuarios = express.Router();

enrutadorUsuarios.get('/', obtenerTodosUsuarios);
enrutadorUsuarios.get('/:id', obtenerUsuarioID);
enrutadorUsuarios.post('/', crearUsuario);
enrutadorUsuarios.put('/:id', actualizarUsuario);
enrutadorUsuarios.delete('/:id', eliminarUsuario);
enrutadorUsuarios.post('/iniciarSesionJWT', iniciarSesionJWT);
enrutadorUsuarios.post('/iniciarSesionExpressSession', iniciarSesionExpressSession);
enrutadorUsuarios.post('/logout', cerrarSesion);

export { enrutadorUsuarios };
