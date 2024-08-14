document.addEventListener('DOMContentLoaded', () => {
    const nombreCliente = document.getElementById('nombreCliente');
    const emailCliente = document.getElementById('emailCliente');
    const telefonoCliente = document.getElementById('telefonoCliente');
    
    const formularioCliente = document.getElementById('formularioCliente');
    const formularioProducto = document.getElementById('formularioProducto');

    formularioCliente.addEventListener('input', () => {
        nombreCliente.textContent = document.getElementById('cliente').value;
        emailCliente.textContent = document.getElementById('email').value;
        telefonoCliente.textContent = document.getElementById('telefono').value;
    });

    const listaProductos = document.getElementById('listaProductos');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    const envioInput = document.getElementById('envioInput');
    const actualizarEnvioButton = document.getElementById('actualizarEnvio');
    const envioDisplay = document.getElementById('envioDisplay');

    let productos = []; // Array para almacenar productos

    document.getElementById('agregarProducto').addEventListener('click', () => {
        const producto = document.getElementById('producto').value;
        const cantidad = parseInt(document.getElementById('cantidad').value, 10);
        const precio = parseFloat(document.getElementById('precio').value);

        if (producto && cantidad && !isNaN(precio)) {
            const total = Math.round(cantidad * precio);
            productos.push({ producto, cantidad, precio: Math.round(precio), total });
            actualizarListaProductos();
        } else {
            alert('Por favor ingresa todos los valores correctamente.');
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
                    <td><button class="eliminar" onclick="eliminarProducto(${index})">Eliminar</button></td>
                </tr>
            `;
        });

        const subtotalFormateado = formatearNumero(subtotal);
        subtotalElement.textContent = `$${subtotalFormateado}`;
        actualizarTotal();
    }

    function actualizarTotal() {
        const envio = parseInt(envioInput.value, 10) || 0;
        const subtotal = parseInt(subtotalElement.textContent.replace('$', '').replace(/\./g, ''), 10) || 0;
        const total = subtotal + envio;
        envioDisplay.textContent = `$${formatearNumero(envio)}`;
        totalElement.textContent = `$${formatearNumero(total)}`;
    }

    window.eliminarProducto = function(index) {
        productos.splice(index, 1);
        actualizarListaProductos();
    };

    actualizarEnvioButton.addEventListener('click', actualizarTotal);

    // Función para formatear números con puntos de miles y sin decimales
    function formatearNumero(numero) {
        return numero.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    }
});
