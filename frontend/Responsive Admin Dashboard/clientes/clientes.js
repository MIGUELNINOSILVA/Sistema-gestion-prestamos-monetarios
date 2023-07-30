import {
    getClientes,
    getPrestamos
} from "../Responsive Admin Dashboard - final/assets/js/API.js";

document.addEventListener('DOMContentLoaded', loadContent());

// Selectores
const tablaClientes = document.getElementById('tablaClientes');
const loading = document.getElementById('loading');

async function loadContent() {
    try {
        const clientes = await getClientes();
        const prestamos = await getPrestamos();
        console.log(clientes);

        clientes.forEach(cliente => {
            const {
                _id,
                identificacion,
                nombre,
                telefono
            } = cliente;
            const prestamosCliente = prestamos.filter(prestamo => prestamo.idCliente === _id);
            const cantidadPrestamos = prestamosCliente.length;
            const cantidadPrestamosActivos = prestamosCliente.filter(prestamo => prestamo.estado).length; // Filtrar y contar los préstamos activos
            console.log(cantidadPrestamosActivos);

            tablaClientes.innerHTML += `
            <tr>
                <td>${identificacion}</td>
                <td>${nombre}</td>
                <td>${telefono}</td>
                <td>${cantidadPrestamosActivos}</td>
                <td>${cantidadPrestamos}</td>
                <td><button>Detalles</button></td>
                <td><button class="delete">Eliminar</button></td>
            </tr>
            `;
        });
    } catch (error) {
        alert("NO CARGA LA DATA, INTENTA DE NUEVO")
    } finally {
        // Ocultar el indicador de carga una vez que se complete la función
        loading.style.display = 'none';
    }
}