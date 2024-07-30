// Función para formatear números con puntos de miles y sin decimales
function formatearNumero(numero) {
    return numero.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

document.addEventListener('DOMContentLoaded', () => {
    const listaProductos = document.getElementById('listaProductos');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    const envioInput = document.getElementById('envioInput');
    const actualizarEnvioButton = document.getElementById('actualizarEnvio');
    const envioDisplay = document.getElementById('envioDisplay');

    const productos = []; // Array para almacenar productos

    document.getElementById('agregarProducto').addEventListener('click', () => {
        const producto = document.getElementById('producto').value;
        const cantidad = parseInt(document.getElementById('cantidad').value, 10);
        const precio = parseFloat(document.getElementById('precio').value);

        if (producto && cantidad && !isNaN(precio)) {
            const total = Math.round(cantidad * precio);
            productos.push({ producto, cantidad, precio: Math.round(precio), total });
            actualizarListaProductos();
        }
    });

    function actualizarListaProductos() {
        listaProductos.innerHTML = ''; // Limpiar tabla
        let subtotal = 0;

        productos.forEach((prod, index) => {
            subtotal += prod.total;
            listaProductos.innerHTML += `
                <tr>
                    <td>${prod.producto}</td>
                    <td>${prod.cantidad}</td>
                    <td>${formatearNumero(prod.precio)}</td>
                    <td>${formatearNumero(prod.total)}</td>
                    <td><button onclick="eliminarProducto(${index})">Eliminar</button></td>
                </tr>
            `;
        });

        const subtotalFormateado = formatearNumero(subtotal);
        subtotalElement.textContent = `$${subtotalFormateado}`;
        actualizarTotal();
    }

    window.eliminarProducto = function(index) {
        productos.splice(index, 1);
        actualizarListaProductos();
    };

    function actualizarTotal() {
        const envio = parseInt(envioInput.value, 10) || 0;
        const subtotal = parseInt(subtotalElement.textContent.replace('$', '').replace(/\./g, ''), 10) || 0;
        const total = subtotal + envio;
        envioDisplay.textContent = `$${formatearNumero(envio)}`;
        totalElement.textContent = `$${formatearNumero(total)}`;
    }

    actualizarEnvioButton.addEventListener('click', actualizarTotal);
    @media print {
    .no-print {
        display: none;
    }
    form {
        display: none;
    }
    button {
        display: none;
    }
    .cotizacion-container {
        box-shadow: none;
        margin: 0 auto;
        padding: 0;
        width: 100%;
        max-width: 800px;
    }
    th:last-child, td:last-child {
        display: none;
    }
    /* Asegúrate de ocultar también los elementos de entrada y los botones adicionales en la impresión */
    #formularioCliente,
    #formularioProducto,
    .observaciones {
        display: true;
    }
}

});
