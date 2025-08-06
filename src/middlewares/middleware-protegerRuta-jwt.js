import jwt from 'jsonwebtoken';

export function protegerRutaCookieJWT(req, res, next) {
    try {
        const token = req.cookies.tokenUsuario || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).send('Token no proporcionado');
        }

        const datosUsuario = jwt.verify(token, process.env.CLAVE_JWT);
        req.usuario = datosUsuario;
        next();
    } catch (error) {
        res.status(403).send('Token inválido o expirado');
    }
}