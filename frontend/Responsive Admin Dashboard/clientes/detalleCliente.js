
import {
    getOneClientes,
    updateClientes
} from "../Responsive Admin Dashboard - final/assets/js/API.js";

/* Selectores */
const nombreClienteTitle = document.getElementById('nombreClienteTitle');
document.addEventListener('DOMContentLoaded', loadData());
const titleForm = document.getElementById('titleForm');
const nombreClienteFormulario = document.getElementById('nombreClienteFormulario');
const identificacionClienteFormulario = document.getElementById('identificacionClienteFormulario');
const telefonoClienteFormulario = document.getElementById('telefonoClienteFormulario');
const emailClienteFormulario = document.getElementById('emailClienteFormulario');
const direccionClienteFormulario = document.getElementById('direccionClienteFormulario');
const formUpdateClientes = document.getElementById('formUpdateClientes');

async function loadData() {
    try {
        // Obtener el parámetro "id" de la URL
        const urlParams = new URLSearchParams(window.location.search);
        const clienteId = urlParams.get('id');
        const cliente = await getOneClientes(clienteId);
        console.log(cliente);

        nombreClienteTitle.textContent = `${cliente.nombre}`;
        titleForm.textContent = `${cliente.nombre}`;
        nombreClienteFormulario.value = `${cliente.nombre}`;
        identificacionClienteFormulario.value = `${cliente.identificacion}`;
        telefonoClienteFormulario.value = `${cliente.telefono}`;
        emailClienteFormulario.value = `${cliente.mail}`;
        direccionClienteFormulario.value = `${cliente.direccion}`;


        formUpdateClientes.addEventListener('submit', async(e) => {
            e.preventDefault();
            const objetoActualizar = {
                nombre: nombreClienteFormulario.value,
                identificacion: identificacionClienteFormulario.value,
                telefono: telefonoClienteFormulario.value,
                mail:emailClienteFormulario.value,
                direccion : direccionClienteFormulario.value
            }
            console.log(objetoActualizar);
            
            if (await updateClientes(clienteId, objetoActualizar)) {
                alert('Actualizado Cliente Correctamente');
                window.location = "./clientes.html";
            }
        })
    } catch (error) {
        console.log(error);
    } finally {
        // Ocultar el indicador de carga una vez que se complete la función
        loading.style.display = 'none';
    };

}