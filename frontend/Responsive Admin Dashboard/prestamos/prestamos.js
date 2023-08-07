import { getPrestamos, getClientes } from "../Responsive Admin Dashboard - final/assets/js/API.js";

document.addEventListener('DOMContentLoaded', loadContent());

// Selectores
const tablaPrestamos = document.getElementById('tablaPrestamos');
async function loadContent() {
    try {
        const prestamos = await getPrestamos();
        const clientes = await getClientes();
        console.log(clientes);
        prestamos.forEach(prestamo => {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const fechaInicioFormateada = new Date(prestamo.fechaInicio).toLocaleDateString('es-ES', options);
            const fechaFinFormateada = new Date(prestamo.fechaFin).toLocaleDateString('es-ES', options);
            const montoFormateado = prestamo.monto.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
            const cuotaFormateado = prestamo.valorCuota.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
            const totalFormateado = prestamo.total.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
            const identificacionClientes = clientes.find((cliente) => cliente._id === prestamo.idCliente);

            tablaPrestamos.innerHTML += `
            <tr>
                <td>${identificacionClientes.identificacion}</td>
                <td>${identificacionClientes.nombre}</td>
                <td>${prestamo.frecuenciaPago.toUpperCase()}</td>
                <td>${fechaInicioFormateada}</td>
                <td>${fechaFinFormateada}</td>
                <td>${montoFormateado}</td>
                <td>${prestamo.tasaInteres}%</td>
                <td>${cuotaFormateado}</td>
                <td>${totalFormateado}</td>
            </tr>`;
        });
    } catch (error) {
        // Manejo de errores
    } finally {
        // Ocultar el indicador de carga una vez que se complete la función
        loading.style.display = 'none';
    }
}


