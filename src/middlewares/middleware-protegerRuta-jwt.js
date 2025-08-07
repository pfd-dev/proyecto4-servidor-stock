import jwt from 'jsonwebtoken';

export function protegerRutaCookieJWT(req, res, next) {
    try {
        const token = req.cookies.tokenUsuario;

        if (!token) {
            return res.status(401).send('Token no proporcionado');
        }

        const datosUsuario = jwt.verify(token, process.env.CLAVE_TOKEN_JWT);
        req.usuario = datosUsuario;
        next();
    } catch (error) {
        res.status(403).send('Token inválido o expirado');
    }
}