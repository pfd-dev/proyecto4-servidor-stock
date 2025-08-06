function protegerRutaCookieExpressSession(req, res, next) {
    if (req.session && req.session.usuarioExpressSession) {
        return next();
    }
    res.status(401).send('No autorizado: sesión no activa');
}

export {
    protegerRutaCookieExpressSession
}