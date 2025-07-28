const obtenerPaginaInicio = (req, res) => {
    res.render("home", { titulo: "Página de Inicio" });
};

const obtenerPaginaPanelControl = (req, res) => {
    res.render("panelControl", { titulo: "Panel de Control" });
};

const obtenerPaginaInicioSesion = (req, res) => {
    res.render("inicioSesion", { titulo: "Iniciar Sesión" });
};

const obtenerPaginaCerrarSesion = (req, res) => {
    res.render("cerrarSesion", { titulo: "Cerrar Sesión" });
};

export {
    obtenerPaginaInicio,
    obtenerPaginaPanelControl,
    obtenerPaginaInicioSesion,
    obtenerPaginaCerrarSesion,
};
