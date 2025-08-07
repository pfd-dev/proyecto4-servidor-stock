// Modelos
import { usuarioModel } from '../models/usuario.model.js';
import { productoModel } from '../models/productos.model.js';
import { usuarioSessionModel } from '../models/usuarioSession.model.js';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';

async function damePaginaInicio(req, res) {
    res.render(
        'index',
        {
            titulo: 'pagina de inicio',
            numero: 123,
            parrafo: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti deserunt error, quasi maiores atque eius repudiandae! Esse eius eaque maxime dolorem aspernatur quod magni blanditiis magnam quis! Harum, incidunt voluptates.",
            numeros: [1, 3, 4, 5],
            productos: [{ nombre: "papas fitras" }, { nombre: "papas fitras especial" }, { nombre: "papas fitras espcial xl" }]
        }
    );
}

async function damePaginaPanelSesiones(req, res) {
    try {
        const sesiones = await usuarioSessionModel.find();

        const usuariosActivos = sesiones.map(s => {
            const datosSesion = JSON.parse(s.session);
            return ({
                nombre: datosSesion.usuarioExpressSession?.usuarioNombre || 'Desconocido',
                email: datosSesion.usuarioExpressSession?.usuarioEmail || 'Desconocido',
            })
        });

        res.render('panelSesiones', {
            titulo: 'Panel de sesiones',
            // sesiones: sesionesConUsuarios,
            sesiones: [],
            mensaje: null,
            usuarios: usuariosActivos
        });

    } catch (error) {
        res.status(500).render('panelSesiones', {
            titulo: 'Panel de sesiones',
            sesiones: [],
            mensaje: 'Error interno del servidor' + error.message
        });
    }
}

async function damePaginaPanelControl(req, res) {
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
}

export {
    damePaginaInicio,
    damePaginaPanelSesiones,
    damePaginaPanelControl
}