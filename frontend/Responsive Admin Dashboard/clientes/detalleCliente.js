import {
    getOneClientes
} from "../Responsive Admin Dashboard - final/assets/js/API.js";

const nombreClienteTitle = document.getElementById('nombreClienteTitle');
document.addEventListener('DOMContentLoaded', loadData());
const titleForm = document.getElementById('titleForm');


async function loadData() {
    try {
        // Obtener el parámetro "id" de la URL
        const urlParams = new URLSearchParams(window.location.search);
        const clienteId = urlParams.get('id');
        const cliente = await getOneClientes(clienteId);
        console.log(cliente);

        nombreClienteTitle.textContent = `${cliente.nombre}`;
        titleForm.textContent = `${cliente.nombre}`;
    } catch (error) {
        console.log(error);
    } finally {
        // Ocultar el indicador de carga una vez que se complete la función
        loading.style.display = 'none';
    };

}