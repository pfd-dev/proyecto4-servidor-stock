import session from 'express-session';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';
dotenv.config();


export function configureCookieExpressSession() {
    const nombreSesion = 'nombreTokenSesionUsuario';
    const claveSecreta = process.env.CLAVE_SESSION;

    const conexionBaseDatos = process.env.MONGODB_CONNECT_URI;
    const nombreColeccionBD = 'sesiones';

    return (
        session({
            name: nombreSesion, // nombre de la cookie de sesión
            secret: claveSecreta,
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 10 * 60 * 1000, // 10 min
                httpOnly: true,
                // secure: true, // solo para https
            },
            store: MongoStore.create({
                mongoUrl: conexionBaseDatos,
                collectionName: nombreColeccionBD,
                ttl: 60 * 1, // Tiempo de vida en segundos (5 min)
            }),
        })
    );
}
