// usuario.route.js
import { usuarioModel } from '../models/usuario.model.js';
import bcrypt from 'bcrypt'; // Para hashear contraseñas
import jwt from 'jsonwebtoken'; // Para manejar sesiones con tokens

const JWT_SECRET = 'tu_clave_secreta'; // En producción, guardala en una variable de entorno

function verificarToken(req, res, next) {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({ mensaje: 'Acceso denegado. No se encontró el token.' });
    }

    try {
        const verificado = jwt.verify(token, JWT_SECRET);
        req.usuario = verificado; // Guardamos los datos del token en la request
        next();
    } catch (error) {
        res.status(401).json({ mensaje: 'Token inválido o expirado.' });
    }
}

async function obtenerTodosUsuarios(req, res) {
    try {
        const usuarios = await usuarioModel.find();
        res.json(usuarios);
    } catch (error) {
        console.error('Error al obtener usuarios:', error.message);
        res.status(500).send('Error interno');
    }
};

async function obtenerUsuarioID(req, res) {
    try {
        const usuario = await usuarioModel.findById(req.params.id);
        if (!usuario) return res.status(404).send('Usuario no encontrado');
        res.json(usuario);
    } catch (error) {
        console.error('Error al obtener usuario por ID:', error.message);
        res.status(500).send('Error interno');
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
        console.error('Error al crear usuario:', error.message);
        res.status(400).send('Datos inválidos');
    }
};

async function actualizarUsuario(req, res) {
    try {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        const actualizado = await usuarioModel.findByIdAndUpdate(req.params.id, req.body);
        if (!actualizado) return res.status(404).send('Usuario no encontrado');
        res.json(actualizado);
    } catch (error) {
        console.error('Error al actualizar usuario:', error.message);
        res.status(400).send('Datos inválidos');
    }
};

async function eliminarUsuario(req, res) {
    try {
        const eliminado = await usuarioModel.findByIdAndDelete(req.params.id);
        if (!eliminado) return res.status(404).send('Usuario no encontrado');
        res.json(eliminado);
    } catch (error) {
        console.error('Error al eliminar usuario:', error.message);
        res.status(500).send('Error interno');
    }
};

async function iniciarSesion(req, res) {
    try {
        const { email, password } = req.body;
        const usuario = await usuarioModel.findOne({ email });
        console.log(!usuario)
        if (!usuario) return res.status(401).send('Credenciales inválidas');
        console.log("si")
        const passwordValida = await bcrypt.compare(password, usuario.password);
        if (!passwordValida) return res.status(401).send('Credenciales inválidas');

        const token = jwt.sign({ id: usuario._id }, JWT_SECRET, { expiresIn: '1h' });

        // Guardar token en cookie httpOnly
        res.cookie('token', token, {
            // httpOnly: true,
            // secure: false, // Ponlo en true si usas HTTPS
            // maxAge: 3600000, // 1 hora
        });

        res.json({ mensaje: 'Sesión iniciada' });
    } catch (error) {
        console.error('Error al iniciar sesión:', error.message);
        res.status(500).send('Error interno');
    }
};


async function cerrarSesion(req, res) {
    res.clearCookie('token');
    res.json({ mensaje: 'Sesión cerrada' });
};

export {
    verificarToken,
    obtenerTodosUsuarios,
    obtenerUsuarioID,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
    iniciarSesion,
    cerrarSesion
};
