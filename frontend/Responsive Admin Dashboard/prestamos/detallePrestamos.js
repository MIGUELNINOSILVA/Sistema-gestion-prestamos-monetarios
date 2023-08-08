import {
  getOnePrestamos,
  getClientes,
  getCuotas,
} from "../Responsive Admin Dashboard - final/assets/js/API.js";

document.addEventListener("DOMContentLoaded", loadContent());

// Selectores
const numeroPrestamoTitle = document.getElementById("numeroPrestamoTitle");
const tablaDetallePrestamos = document.getElementById("tablaDetallePrestamos");

async function loadContent() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const prestamoId = urlParams.get("id");

    const clientes = await getClientes();
    const prestamos = await getOnePrestamos(prestamoId);
    const cuotas = await getCuotas();

    console.log(prestamos);
    // Encontrando cliente con el id
    const identificacionClientes = clientes.find(
      (cliente) => cliente._id === prestamos.idCliente
    );
    // Encontrando las cuotas con el mismo ID del prestamo
    const cuotasCopia = cuotas.map((cuota) => {
      if (cuota.idPrestamo === prestamos._id) {
        return cuota;
      }
      // Si no cumple la condición, no se incluirá en la copia
    });
    if (cuotasCopia.length > 0) {
      cuotasCopia.forEach((cuotas) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        const fechaPagoFormateada = new Date(
          cuotas.fechaPago
        ).toLocaleDateString("es-ES", options);
        const montoFormateado = cuotas.monto.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
        const restantaFormateado = cuotas.restante.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
        tablaDetallePrestamos.innerHTML += `
            <tr>
                <td>${cuotas.numeroCuota}</td>
                <td>${montoFormateado}</td>
                <td>${fechaPagoFormateada}</td>
                <td>${restantaFormateado}</td>
            </tr>
        `;
      });
    }

    const montoFormateado = prestamos.monto.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
    });
    numeroPrestamoTitle.innerHTML = `${identificacionClientes.nombre} - ${montoFormateado}`;
  } catch (error) {
    console.log(error);
  } finally {
    // Ocultar el indicador de carga una vez que se complete la función
    loading.style.display = "none";
  }
}
