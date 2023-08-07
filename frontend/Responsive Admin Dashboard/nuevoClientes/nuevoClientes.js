import { getClientes, addClientes } from "../Responsive Admin Dashboard - final/assets/js/API.js"; 

document.addEventListener('DOMContentLoaded', loadContent());

// Selectores
const formAddClientes = document.getElementById('formAddClientes');

async function loadContent() {
    try {
        const clientes  = await getClientes();
        console.log(clientes);
        
    } catch (error) {
        
    } finally {
        // Ocultar el indicador de carga una vez que se complete la función
        loading.style.display = 'none';
    }
}

formAddClientes.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        identificacion: parseInt(document.getElementById('identificacionClientesFormulario').value),
        nombre: document.getElementById('nombreClientesFormulario').value,
        mail: document.getElementById('emailClientesFormulario').value,
        direccion: document.getElementById('direccionClientesFormulario').value,
        telefono: parseInt(document.getElementById('telefonoClientesFormulario').value),
    }
    validateForm(data);

});

async function validateForm(data) {
    const clientes  = await getClientes();
    const resultado = clientes.find((cliente) => cliente.identificacion === data.identificacion);
     if (resultado) {
        // Si se encontró un cliente con la misma identificación, muestra una alerta
        alert('No se puede enviar porque ya existe un cliente con la misma identificación.');
    } else {
        // Si no se encontró un cliente con la misma identificación, muestra el log
        await addClientes(data);
        alert('Cliente agregado correctamente');
        setTimeout(() =>{
            window.location.reload();
        });
    }
}