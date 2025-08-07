import bcrypt from 'bcrypt'; // Para hashear contraseñas
import jwt from 'jsonwebtoken'; // Para manejar sesiones con tokens

// Módulos
import { usuarioModel } from '../models/usuario.model.js';

async function obtenerTodosUsuarios(req, res) {
    try {
        const usuarios = await usuarioModel.find();

        res.json(usuarios);
    } catch (error) {
        res.status(500).send('Error interno: Error al obtener usuarios:', error.message);
    }
};

async function obtenerUsuarioID(req, res) {
    try {
        const usuario = await usuarioModel.findById(req.params.id);

        if (!usuario) {
            return res.status(404).send('Usuario no encontrado.');
        }

        res.json(usuario);
    } catch (error) {
        console.error();
        res.status(500).send('Error interno: Error al obtener usuario por ID:', error.message);
    }
};

async function crearUsuario(req, res) {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const nuevoUsuario = new usuarioModel({
            ...req.body,
            password: hashedPassword
        });

        const resultado = await nuevoUsuario.save();

        res.status(201).json(resultado);
    } catch (error) {
        res.status(400).send('Datos interno: Error al crear usuario:', error.message);
    }
};

async function actualizarUsuario(req, res) {
    try {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }

        const actualizado = await usuarioModel.findByIdAndUpdate(req.params.id, req.body);

        if (!actualizado) {
            return res.status(404).send('Datos inválidos: Usuario no encontrado.');
        }

        res.json(actualizado);
    } catch (error) {
        res.status(400).send('Datos interno: Error al actualizar usuario:', error.message);
    }
};

async function eliminarUsuario(req, res) {
    try {
        const eliminado = await usuarioModel.findByIdAndDelete(req.params.id);

        if (!eliminado) {
            return res.status(404).send('Datos inválidos: Usuario no encontrado.');
        }

        res.json(eliminado);
    } catch (error) {
        res.status(500).send('Error interno: Error al eliminar usuario:', error.message);
    }
};

async function iniciarSesionJWT(req, res) {
    try {
        const { email, password } = req.body;
        const usuario = await usuarioModel.findOne({ email });

        if (!usuario) return res.status(401).send('Credenciales inválidas.');

        const passwordValida = await bcrypt.compare(password, usuario.password);
        if (!passwordValida) return res.status(401).send('Credenciales inválidas');

        const token = jwt.sign(
            { id: usuario.email },
            process.env.CLAVE_TOKEN_JWT,
            { expiresIn: '10m' }    // 10 minutos
        );

        res.cookie('tokenUsuario', token, {
            httpOnly: true,
            maxAge: 10 * 60 * 1000 // 10 minutos
        });

        res.json({ mensaje: 'Sesión iniciada con JWT' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno: Error al iniciar sesión:', error);
    }
};

async function iniciarSesionExpressSession(req, res) {
    try {
        const { email, password } = req.body;
        const usuario = await usuarioModel.findOne({ email });

        if (!usuario) {
            return res.status(401).send('Credenciales inválidas');
        }

        const passwordValida = await bcrypt.compare(password, usuario.password);

        if (!passwordValida) {
            return res.status(401).send('Credenciales inválidas');
        }

        req.session.usuarioExpressSession = { usuarioNombre: usuario.name, usuarioEmail: usuario.email };

        res.json({ mensaje: 'Sesión iniciada' });
    } catch (error) {
        res.status(500).send('Error interno: Error al iniciar sesión:', error.message);
    }
};

async function cerrarSesion(req, res) {
    if (req.session && req.session.usuarioExpressSession) {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send('Error interno: Error al cerrar sesión');
            }
            res.clearCookie('nombreTokenSesionUsuario');
            res.send('Sesión cerrada correctamente');
        });
    }

    if (req.cookies.tokenUsuario) {
        res.clearCookie('tokenUsuario');
    }

    res.send('Sesión cerrada');
};

export {
    obtenerTodosUsuarios,
    obtenerUsuarioID,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
    iniciarSesionJWT,
    iniciarSesionExpressSession,
    cerrarSesion
};
