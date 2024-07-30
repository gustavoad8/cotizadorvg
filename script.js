document.addEventListener('DOMContentLoaded', () => {
    const nombreCliente = document.getElementById('nombreCliente');
    const emailCliente = document.getElementById('emailCliente');
    const telefonoCliente = document.getElementById('telefonoCliente');
    const fecha = document.getElementById('fecha');
    const consecutivo = document.getElementById('consecutivo');
    const formularioCliente = document.getElementById('formularioCliente');
    const formularioProducto = document.getElementById('formularioProducto');
    const listaProductos = document.getElementById('listaProductos');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    const envioInput = document.getElementById('envioInput');
    const actualizarEnvioButton = document.getElementById('actualizarEnvio');
    const envioDisplay = document.getElementById('envioDisplay');
    const observaciones = document.getElementById('observaciones');
    const generarPDFButton = document.getElementById('generarPDF');

    const productos = []; // Array para almacenar productos

    // Establecer fecha actual
    const today = new Date();
    fecha.textContent = today.toLocaleDateString('es-CO');
    
    // Establecer consecutivo aleatorio
    consecutivo.textContent = Math.floor(Math.random() * (500 - 200 + 1)) + 200;

    formularioCliente.addEventListener('input', () => {
        nombreCliente.textContent = document.getElementById('cliente').value;
        emailCliente.textContent = document.getElementById('email').value;
        telefonoCliente.textContent = document.getElementById('telefono').value;
    });

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

    function formatearNumero(numero) {
        return numero.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    }

    generarPDFButton.addEventListener('click', () => {
        const doc = new jsPDF();

        doc.setFontSize(12);
        doc.text(20, 20, 'Kids Decor Colombia');
        doc.text(20, 30, `NIT: 1067854425-6`);
        doc.text(20, 40, 'Cotización');
        doc.text(20, 50, `Fecha: ${fecha.textContent}`);
        doc.text(20, 60, `Consecutivo: ${consecutivo.textContent}`);
        doc.text(20, 70, `Cliente: ${nombreCliente.textContent}`);
        doc.text(20, 80, `Email: ${emailCliente.textContent}`);
        doc.text(20, 90, `Teléfono: ${telefonoCliente.textContent}`);

        let y = 110;
        doc.text(20, y, 'Productos:');
        y += 10;

        doc.autoTable({
            startY: y,
            head: [['Descripción', 'Cantidad', 'Precio', 'Total']],
            body: productos.map(p => [p.producto, p.cantidad, `$${formatearNumero(p.precio)}`, `$${formatearNumero(p.total)}`]),
        });

        y = doc.autoTable.previous.finalY + 10;
        doc.text(20, y, `Subtotal: $${subtotalElement.textContent}`);
        doc.text(20, y + 10, `Envío: $${envioDisplay.textContent}`);
        doc.text(20, y + 20, `Total: $${totalElement.textContent}`);

        y += 40;
        doc.text(20, y, 'Observaciones:');
        doc.text(20, y + 10, observaciones.value);

        y += 30;
        doc.text(20, y, 'Datos Bancarios:');
        doc.text(20, y + 10, 'Gustavo Alberto Acosta Diaz');
        doc.text(20, y + 20, 'C.C. 1.067.854.425');
        doc.text(20, y + 30, 'Bancolombia - Cta. Ahorros #09112958093');
        doc.text(20, y + 40, 'Davivienda - Cta. Corriente #156960000388');

        doc.save('cotizacion.pdf');
    });
});
