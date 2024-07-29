document.addEventListener('DOMContentLoaded', () => {
    const listaProductos = document.getElementById('listaProductos');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    const envioInput = document.getElementById('envioInput');
    const actualizarEnvioButton = document.getElementById('actualizarEnvio');

    const productos = []; // Array para almacenar productos

    document.getElementById('agregarProducto').addEventListener('click', () => {
        const producto = document.getElementById('producto').value;
        const cantidad = parseFloat(document.getElementById('cantidad').value);
        const precio = parseFloat(document.getElementById('precio').value);

        if (producto && cantidad && precio) {
            const total = cantidad * precio;
            productos.push({ producto, cantidad, precio, total });
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
                    <td>${prod.precio.toFixed(2)}</td>
                    <td>${prod.total.toFixed(2)}</td>
                    <td><button onclick="eliminarProducto(${index})">Eliminar</button></td>
                </tr>
            `;
        });

        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        actualizarTotal();
    }

    window.eliminarProducto = function(index) {
        productos.splice(index, 1);
        actualizarListaProductos();
    };

    function actualizarTotal() {
        const envio = parseFloat(envioInput.value) || 0;
        const subtotal = parseFloat(subtotalElement.textContent.replace('$', '')) || 0;
        totalElement.textContent = `$${(subtotal + envio).toFixed(2)}`;
    }

    actualizarEnvioButton.addEventListener('click', actualizarTotal);
});
