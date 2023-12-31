import {
    getClientes,
    getPrestamos,
    deleteClientes
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
                <td><button><a href="detalleCliente.html?id=${_id}">Detalle</a></button></td>
                <td><button class="delete delete-cliente" id="${_id}">Eliminar</button></td>

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
        const deleteCliente = document.querySelectorAll('.delete-cliente');
        deleteCliente.forEach(eliminar => {
            eliminar.addEventListener('click', async (e) => {
                if (window.confirm('¿Estás seguro de eliminar este cliente?')) {
                    const clientesPrestado = clientes.filter(cliente => cliente._id === e.target.id);
                    console.log(clientesPrestado);
                    const prestamosCliente = prestamos.filter(prestamo => prestamo.idCliente === e.target.id);
                    console.log(prestamosCliente);
                    if (prestamosCliente.length > 0) {
                        alert("No se puede borrar porque tiene prestamos vinculados");
                        return;
                    } else {
                        console.log("Borrar, no tiene prestamos vinculados");
                        deleteClientes(e.target.id);
                        // Recarga la página después de 2 segundos (2000 milisegundos)
                        setTimeout(function () {
                            location.reload();
                        }, 1000);
                    }

                }
            });
        });
        botonModal.forEach(boton => {
            boton.addEventListener('click', (e) => {

            })
        });
    } catch (error) {
        console.log("NO CARGA LA DATA, INTENTA DE NUEVO");
    } finally {
        // Ocultar el indicador de carga una vez que se complete la función
        loading.style.display = 'none';
    }
}