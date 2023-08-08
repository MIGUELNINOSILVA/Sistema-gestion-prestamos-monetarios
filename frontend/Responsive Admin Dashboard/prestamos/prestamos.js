import { getPrestamos, getClientes, deletePrestamo } from "../Responsive Admin Dashboard - final/assets/js/API.js";

document.addEventListener('DOMContentLoaded', loadContent);

const tablaPrestamos = document.getElementById('tablaPrestamos');

async function loadContent() {
    try {
        const prestamos = await getPrestamos();
        const clientes = await getClientes();

        prestamos.forEach(prestamo => {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const fechaInicioFormateada = new Date(prestamo.fechaInicio).toLocaleDateString('es-ES', options);
            const fechaFinFormateada = new Date(prestamo.fechaFin).toLocaleDateString('es-ES', options);
            const montoFormateado = prestamo.monto.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
            const cuotaFormateado = prestamo.valorCuota.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
            const totalFormateado = prestamo.total.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
            const identificacionClientes = clientes.find((cliente) => cliente._id === prestamo.idCliente);
            
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${identificacionClientes.identificacion}</td>
                <td>${identificacionClientes.nombre}</td>
                <td>${prestamo.frecuenciaPago.toUpperCase()}</td>
                <td>${fechaInicioFormateada}</td>
                <td>${fechaFinFormateada}</td>
                <td>${montoFormateado}</td>
                <td>${prestamo.tasaInteres}%</td>
                <td>${cuotaFormateado}</td>
                <td>${totalFormateado}</td>
                <td>${prestamo.estado ? 'ACTIVO':'PAGO'}</td>
                <td><button><a href="detallePrestamos.html?id=${prestamo._id}">Detalle</a></button></td>
            `;
            
            // Botón de Eliminar
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.classList.add('delete', 'delete-cliente');
            deleteButton.id = prestamo._id;
            deleteButton.addEventListener('click', async () => {
                const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este préstamo?');
                if (confirmDelete) {
                    try {
                        await deletePrestamo(prestamo._id);
                        alert('Préstamo eliminado exitosamente');
                        location.reload(); // Recargar la página para reflejar los cambios
                    } catch (error) {
                        console.error('Error al eliminar el préstamo', error);
                        alert('No se pudo eliminar el préstamo');
                    }
                }
            });

            const deleteCell = document.createElement('td');
            deleteCell.appendChild(deleteButton);
            row.appendChild(deleteCell);
            
            tablaPrestamos.appendChild(row);
        });
    } catch (error) {
        console.error('Error al cargar los datos', error);
        // Manejo de errores
    } finally {
        // Ocultar el indicador de carga una vez que se complete la función
        loading.style.display = 'none';
    }
}
