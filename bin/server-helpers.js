// Normaliza un valor de puerto a número, string o false
export function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val; // Es un named pipe
    }

    if (port >= 0) {
        return port; // Es un número de puerto válido
    }

    return false;
}

// Maneja los errores del servidor HTTP
export function onError(error, port) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Tubería ' + port
        : 'Puerto ' + port;

    switch (error.code) { // Maneja errores específicos con mensajes amigables
        case 'EACCES':
            console.error(`Error: ${bind} requiere permisos de administrador`);
            console.error('Intenta ejecutar con sudo o cambia a un puerto mayor a 1024');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`Error: ${bind} ya está siendo usado por otra aplicación`);
            console.error('Intenta con un puerto diferente o cierra la aplicación que lo está usando');
            process.exit(1);
            break;
        default:
            console.error(`Error del servidor: ${error.message}`);
            throw error;
    }
}

// Se ejecuta cuando el servidor está listo y escuchando
export function onListening(server, debug) {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'tubería ' + addr
        : 'puerto ' + addr.port;

    console.log(`Aplicación: Servidor iniciando correctamente en el puerto ${bind}.`);
    console.log(`Aplicación: Accede a tu aplicación en: http://localhost:${addr.port}`);

    debug('Listening on ' + bind); // Log de debug técnico
}