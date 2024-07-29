document.getElementById('agregarProducto').addEventListener('click', agregarProducto);
document.getElementById('actualizarEnvio').addEventListener('click', actualizarEnvio);

function agregarProducto() {
    const producto = document.getElementById('producto').value;
    const cantidad = parseInt(document.getElementById('cantidad').value);
    const precio = parseFloat(document.getElementById('precio').value);

    if (producto && cantidad > 0 && precio > 0) {
        const table = document.getElementById('listaProductos');
        const newRow = table.insertRow();

        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        const cell4 = newRow.insertCell(3);
        const cell5 = newRow.insertCell(4);

        cell1.textContent = producto;
        cell2.textContent = cantidad;
        cell3.textContent = `$${formatNumber(precio)}`;
        cell4.textContent = `$${formatNumber(cantidad * precio)}`;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.className = 'eliminar';
        deleteButton.addEventListener('click', function() {
            table.deleteRow(newRow.rowIndex - 1);
            actualizarTotales();
        });
        cell5.appendChild(deleteButton);

        actualizarTotales();
        document.getElementById('formularioProducto').reset();
    } else {
        alert('Por favor, completa todos los campos con valores válidos.');
    }
}

function actualizarTotales() {
    const table = document.getElementById('listaProductos');
    let subtotal = 0;

    for (let i = 0; i < table.rows.length; i++) {
        const row = table.rows[i];
        const total = parseFloat(row.cells[3].textContent.replace(/\./g, '').replace(',', '.').replace('$', ''));
        subtotal += total;
    }

    const envio = parseFloat(document.getElementById('envio').value);
    const total = subtotal + envio;

    document.getElementById('total').textContent = `$${formatNumber(total)}`;
}

function actualizarEnvio() {
    actualizarTotales();
}

function formatNumber(number) {
    return number.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

document.getElementById('formularioProducto').addEventListener('input', function() {
    document.getElementById('nombreCliente').textContent = document.getElementById('cliente').value;
    document.getElementById('emailCliente').textContent = document.getElementById('email').value;
    document.getElementById('telefonoCliente').textContent = document.getElementById('telefono').value;
});

function generarConsecutivo() {
    return Math.floor(Math.random() * 901) + 100;
}

function actualizarFechaYConsecutivo() {
    const fecha = new Date().toLocaleDateString();
    document.getElementById('fecha').textContent = fecha;
    document.getElementById('consecutivo').textContent = generarConsecutivo();
}

document.addEventListener('DOMContentLoaded', actualizarFechaYConsecutivo);
