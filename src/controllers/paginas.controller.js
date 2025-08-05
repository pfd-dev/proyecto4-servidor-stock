// Modelos
import { usuarioModel } from '../models/usuario.model.js';
import { productoModel } from '../models/productos.model.js';

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

async function damePanelSesiones(req, res) {
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
            console.log(sesiones)

            // const sesionesConUsuarios = Object.entries(sesiones).map(([sid, datos]) => {
            //   const usuario = usuarios.find(u => u._id.toString() === datos.userId);
            //   return {
            //     sid,
            //     userId: datos.userId || null,
            //     usuario,
            //     datos
            //   };
            // });

            res.render('panelSesiones', {
                titulo: 'Panel de sesiones',
                // sesiones: sesionesConUsuarios,
                sesiones: [],
                mensaje: null
            });
        });

    } catch (error) {
        console.error('Error al mostrar el panel de sesiones:', error.message);
        res.status(500).render('panelSesiones', {
            titulo: 'Panel de sesiones',
            sesiones: [],
            mensaje: 'Error interno del servidor'
        });
    }

}

export {
    damePaginaInicio,
    damePanelSesiones
}