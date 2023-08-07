import { getOnePrestamos, getClientes } from "../Responsive Admin Dashboard - final/assets/js/API.js";

document.addEventListener("DOMContentLoaded", loadContent());

// Selectores
const numeroPrestamoTitle = document.getElementById("numeroPrestamoTitle");

async function loadContent() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const prestamoId = urlParams.get('id');

    const clientes = await getClientes();
    const prestamos = await getOnePrestamos(prestamoId);
    console.log(prestamos);
    const identificacionClientes = clientes.find((cliente) => cliente._id === prestamos.idCliente);
    console.log(identificacionClientes);
    const montoFormateado = prestamos.monto.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
    numeroPrestamoTitle.innerHTML = `${identificacionClientes.nombre} - ${montoFormateado}`;
  } catch (error) {
    console.log(error);
  } finally {
    // Ocultar el indicador de carga una vez que se complete la función
    loading.style.display = "none";
  }
}
