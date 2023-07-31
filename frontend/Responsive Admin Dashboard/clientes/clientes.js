import {
    getClientes,
    getPrestamos
} from "../Responsive Admin Dashboard - final/assets/js/API.js";

document.addEventListener('DOMContentLoaded', loadContent());

// Selectores
const tablaClientes = document.getElementById('tablaClientes');
const loading = document.getElementById('loading');
const tablaClientesResumen = document.getElementById('tablaClientesResumen');
/* Modal */

async function loadContent() {
    try {
        const clientes = await getClientes();
        const prestamos = await getPrestamos();
        console.log(clientes);

        let sumaTotalPrestamosActivos = 0;
        let sumaTotalPrestamos = 0;
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
                <td><button onclick="detailsClient('${_id}')">Detalles</button></td>
                <td><button class="delete">Eliminar</button></td>
                <td><button class="open-modal" id="${_id}">Abrir Modal</button></td>

            </tr>
            `;
            sumaTotalPrestamosActivos += cantidadPrestamosActivos;
            sumaTotalPrestamos += cantidadPrestamos;
            tablaClientesResumen.innerHTML = `
            <tr>
            <td>${sumaTotalPrestamos}</td>
                <td>${sumaTotalPrestamosActivos}</td>
            </tr>`;
        });
        const botonModal = document.querySelectorAll('.open-modal');
        botonModal.forEach(boton => {
            boton.addEventListener('click', (e)=>{
                console.log(e.target.id);
            })
        });
    } catch (error) {
        console.log("NO CARGA LA DATA, INTENTA DE NUEVO");
    } finally {
        // Ocultar el indicador de carga una vez que se complete la función
        loading.style.display = 'none';
    }
}