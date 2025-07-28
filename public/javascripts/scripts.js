document.addEventListener("DOMContentLoaded", () => {

    // Función para mostrar el formulario de edición
    function mostrarFormularioEdicion(id) {
        const formulario = document.getElementById(`form-editar-${id}`);
        formulario.classList.add('activo');
    }

    // Función para ocultar el formulario de edición
    function ocultarFormularioEdicion(id) {
        const formulario = document.getElementById(`form-editar-${id}`);
        formulario.classList.remove('activo');
    }

    // Función para crear un producto
    async function crearProducto(event) {
        event.preventDefault();

        const nombre = document.getElementById('nuevo-nombre').value;
        const precio = document.getElementById('nuevo-precio').value;
        const cantidad = document.getElementById('nueva-cantidad').value;

        try {
            const response = await fetch('/api/productos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    nombre: nombre,
                    precio: parseFloat(precio),
                    cantidad: parseInt(cantidad)
                })
            });

            if (response.ok) {
                alert('Producto creado exitosamente');
                location.reload(); // Recargar la página para mostrar el nuevo producto
            } else {
                const errorText = await response.text();
                alert('Error al crear producto: ' + errorText);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error de conexión al crear producto');
        }
    }

    // Función para editar un producto
    async function editarProducto(event, id) {
        event.preventDefault();

        const nombre = document.getElementById(`nombre-${id}`).value;
        const precio = document.getElementById(`precio-${id}`).value;
        const cantidad = document.getElementById(`cantidad-${id}`).value;

        try {
            const response = await fetch(`/api/productos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    nombre: nombre,
                    precio: parseFloat(precio),
                    cantidad: parseInt(cantidad)
                })
            });

            if (response.ok) {
                alert('Producto actualizado exitosamente');
                location.reload(); // Recargar la página para mostrar los cambios
            } else {
                const errorText = await response.text();
                alert('Error al actualizar producto: ' + errorText);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error de conexión al actualizar producto');
        }
    }

    // Función para eliminar un producto
    async function eliminarProducto(id) {
        if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
            try {
                const response = await fetch(`/api/productos/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    alert('Producto eliminado exitosamente');
                    location.reload(); // Recargar la página para actualizar la lista
                } else {
                    const errorText = await response.text();
                    alert('Error al eliminar producto: ' + errorText);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error de conexión al eliminar producto');
            }
        }
    }

    // Event listeners para los botones de editar
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-editar')) {
            const id = e.target.getAttribute('data-id');
            mostrarFormularioEdicion(id);
        }
    });

    // Event listeners para los botones de eliminar
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-eliminar')) {
            const id = e.target.getAttribute('data-id');
            eliminarProducto(id);
        }
    });

    // Event listeners para los botones de cancelar
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-cancelar')) {
            const id = e.target.getAttribute('data-id');
            ocultarFormularioEdicion(id);
        }
    });

    // Event listener para el formulario de crear producto
    const formCrear = document.getElementById('form-crear');
    if (formCrear) {
        formCrear.addEventListener('submit', crearProducto);
    }

    // Event listeners para los formularios de edición
    document.addEventListener('submit', (e) => {
        if (e.target.hasAttribute('data-id')) {
            const id = e.target.getAttribute('data-id');
            editarProducto(e, id);
        }
    });
});