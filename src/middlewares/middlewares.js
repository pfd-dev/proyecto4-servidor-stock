function protegerRuta(req, res, next) {
    // Si no hay sesión activa o expiró
    if (!req.session || !req.session.userId) {
        return res.status(401).json({ mensaje: 'Debes iniciar sesión para continuar.' });
    }
    next();
}

export {
    protegerRuta
}