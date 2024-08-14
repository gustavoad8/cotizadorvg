document.addEventListener('DOMContentLoaded', () => {
    const nombreCliente = document.getElementById('nombreCliente');
    const emailCliente = document.getElementById('emailCliente');
    const telefonoCliente = document.getElementById('telefonoCliente');
    const fechaElement = document.getElementById('fecha');
    const consecutivoElement = document.getElementById('consecutivo');
    const formularioCliente = document.getElementById('formularioCliente');
    const listaProductos = document.getElementById('listaProductos');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    const envioInput = document.getElementById('envioInput');
    const actualizarEnvioButton = document.getElementById('actualizarEnvio');
    const agregarProductoButton = document.getElementById('agregarProducto');

    const productos = []; // Array para almacenar productos
    let consecutivo = Math.floor(Math.random() * (1000 - 200 + 1)) + 200; // Consecutivo aleatorio entre 200 y 1000

    // Función para formatear números con puntos de miles y sin decimales
    function formatearNumero(numero) {
        return numero.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    }

    // Actualizar fecha y consecutivo
    const fecha = new Date();
    fechaElement.textContent = fecha.toLocaleDateString('es-CO');
    consecutivoElement.textContent = consecutivo;

    formularioCliente.addEventListener('input', () => {
        nombreCliente.textContent = document.getElementById('cliente').value;
        emailCliente.textContent = document.getElementById('email').value;
        telefonoCliente.textContent = document.getElementById('telefono').value;
    });

    agregarProductoButton.addEventListener('click', () => {
        const producto = document.getElementById('producto').value;
        const cantidad = parseInt(document.getElementById('cantidad').value, 10);
        const precio = parseFloat(document.getElementById('precio').value);

        if (producto && cantidad && !isNaN(precio)) {
            const total = Math.round(cantidad * precio);
            productos.push({ producto, cantidad, precio: Math.round(precio), total });
            actualizarListaProductos();
        } else {
            alert('Por favor, complete todos los campos del producto.');
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
                    <td><button type="button" onclick="eliminarProducto(${index})">Eliminar</button></td>
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
});
