import {
    getClientes,
    getPrestamos
} from "../Responsive Admin Dashboard - final/assets/js/API.js";







document.addEventListener('DOMContentLoaded', loadContent());

// Selectores
const tablaClientes = document.getElementById('tablaClientes');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const modal = document.getElementById('modal');

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

            tablaClientes.innerHTML += `
            <tr>
                <td>${identificacion}</td>
                <td>${nombre}</td>
                <td>${telefono}</td>
                <td>${cantidadPrestamos}</td>
                <td><button>Detalles</button></td>
                <td><button class="delete">Eliminar</button></td>
            </tr>
            `;
        });
    } catch (error) {
        console.log(error);
    }
}

openModalBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});