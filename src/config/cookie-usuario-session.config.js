import dotenv from 'dotenv';
import session from 'express-session';
import MongoStore from 'connect-mongo';


export function configureCookieExpressSession() {
    dotenv.config();
    const nombreSesion = 'nombreTokenSesion';
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
                ttl: 60 * 5, // Tiempo de vida en segundos (5 min)
            }),
        })
    );
}
