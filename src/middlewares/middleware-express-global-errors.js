export function middlewareExpressGlobalError(err, req, res, next) {
    // Define variables locales para renderizar el error
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Renderiza la vista de error con el código correspondiente
    res.status(err.status || 500);
    res.render('error');
}