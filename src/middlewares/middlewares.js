import jwt from 'jsonwebtoken'; // Para manejar sesiones con tokens
import dotenv from 'dotenv';
dotenv.config();

function protegerRuta(req, res, next) {
    
    // 1. Verificar sesión activa
    if (req.session && req.cookies.nombreTokenSesion) {
        return next(); // Si hay sesión, todo ok
    }

    // 2. Si no hay sesión, verificar token JWT
    const token = req.cookies?.nombreTokenJwt;

    if (!token) {
        return res.status(401).json({ mensaje: 'Acceso denegado. No tienes sesión ni token.' });
    }

    console.log(req.cookies)
    
    try {
        const verificado = jwt.verify(token, process.env.CLAVE_TOKEN, {expiresIn: '30s'});
        req.usuario = verificado; // Guardar datos del token en la request
        return next(); // Si el token es válido, continuar
    } catch (error) {
        return res.status(401).json({ mensaje: 'Token inválido o expirado.' });
    }
}

export {
    protegerRuta
}