function main() {
    if (document.getElementById('paginaPanelControl')) {
        // Event listener para el formulario de crear producto
        const formCrear = document.getElementById('form-crear');
        if (formCrear) {
            formCrear.addEventListener('submit', async (event) => {
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
            });
        }

        // Event listeners para los formularios de edición
        document.addEventListener('submit', async (event) => {
            event.preventDefault();
            
            if (event.target.hasAttribute('data-id')) {
                const id = event.target.getAttribute('data-id');
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
        });

        // Event listeners para los botones de editar
        document.addEventListener('click', async (event) => {
            if (event.target.classList.contains('btn-editar')) {
                const id = event.target.getAttribute('data-id');
                const formulario = document.getElementById(`form-editar-${id}`);
                formulario.classList.add('activo');
            }
        });

        // Event listeners para los botones de eliminar
        document.addEventListener('click', async (event) => {
            if (event.target.classList.contains('btn-eliminar')) {
                const id = event.target.getAttribute('data-id');
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
        });

        // Event listeners para los botones de cancelar
        document.addEventListener('click', (event) => {
            if (event.target.classList.contains('btn-cancelar')) {
                const id = event.target.getAttribute('data-id');
                const formulario = document.getElementById(`form-editar-${id}`);
                formulario.classList.remove('activo');
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", main);