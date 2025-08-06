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
        const mongoStore = MongoStore.create({
            mongoUrl: process.env.MONGODB_CONNECT_URI,
            collectionName: 'sesiones'
        });

        mongoStore.all(async (err, sesiones) => {
            if (err) {
                console.error('Error al obtener sesiones:', err);
                return res.status(500).render('panelSesiones', {
                    titulo: 'Panel de sesiones',
                    sesiones: [],
                    mensaje: 'Error al cargar las sesiones'
                });
            }

            // Obtener info de usuarios para cada sesión (si existe userId)
            const ids = Object.values(sesiones)
                .map(s => s.userId)
                .filter(Boolean)
                .map(id => new mongoose.Types.ObjectId(id));


            const usuarios = usuarioModel.find();
            for (let i = 0; i < sesiones.length; i++) {
                const element = sesiones[i].userId;
            }

            // const sesionesConUsuarios = Object.entries(sesiones).map(([sid, datos]) => {
            //   const usuario = usuarios.find(u => u._id.toString() === datos.userId);
            //   return {
            //     sid,
            //     userId: datos.userId || null,
            //     usuario,
            //     datos
            //   };
            // });

            const resultado = await usuarioSessionModel.find()
            const usuariosResultado = await usuarioModel.find({ _id: { $in: ids } });

            console.log("resultado");
            console.log(resultado);
            console.log("resultado");
            console.log(usuariosResultado);

            res.render('panelSesiones', {
                titulo: 'Panel de sesiones',
                // sesiones: sesionesConUsuarios,
                sesiones: [],
                mensaje: null,
                usuarios: usuariosResultado
            });
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