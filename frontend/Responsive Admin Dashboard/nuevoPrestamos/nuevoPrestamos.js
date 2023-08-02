console.log({
    "_id": {
        "$oid": "64c6b823aaafef6963b15a03"
    },
    "idCliente": "64be7cdeee349e0e4529c7f3",
    "frecuenciaPago": "diario",
    "fechaInicio": "01-01-2023",
    "fechaFin": "01-02-2023",
    "monto": 150000,
    "tasaInteres": 20,
    "interes": 30000,
    "total": 180000,
    "cantidadCuotas": 30,
    "valorCuota": 6000,
    "estado": true
});
import {
    getClientes
} from '../Responsive Admin Dashboard - final/assets/js/API.js'

document.addEventListener('DOMContentLoaded', loadContent());
const selectOpciones = document.getElementById('selectOpciones');

async function loadContent() {
    try {
        const clientes = await getClientes();
        console.log(clientes);
        clientes.forEach(cliente => {
            selectOpciones.innerHTML += `
                <option value="${cliente.identificacion}">${cliente.identificacion} - ${cliente.nombre}</option>
            `;
        });
        selectOpciones.addEventListener('change', (e) => {
            const idClienteSeleccionado = clientes.find(cliente => cliente.identificacion === parseInt(e.target.value));
            completeForm(idClienteSeleccionado);
        })

    } catch (error) {
        console.log(error);
    } finally {
        // Ocultar el indicador de carga una vez que se complete la función
        loading.style.display = 'none';
    };
};
/* Selectores formulario */
const montoPrestamosFormulario = document.getElementById('montoPrestamosFormulario');
const tasaInteresPrestamosFormulario = document.getElementById('tasaInteresPrestamosFormulario');
const fInicioPrestamosFormulario = document.getElementById('fInicioPrestamosFormulario');
const fFinalPrestamosFormulario = document.getElementById('fFinalPrestamosFormulario');
const frecuenciaPagoPrestamosFormulario = document.getElementById('frecuenciaPagoPrestamosFormulario');
const tiempoPrestamosFormulario = document.getElementById('tiempoPrestamosFormulario')

tasaInteresPrestamosFormulario.addEventListener('input', (e) => {
    const valor = (e.target.value).match(/[0-9]/g);

    if (valor.length > 3) {
        e.target.value = '0';
    }
});

for (let i = 0; i < 12; i++) {
    tiempoPrestamosFormulario.innerHTML+=`
        <option value="${i+1}" selected>${i+1} Mes</option>
    `;
    
}

fInicioPrestamosFormulario.addEventListener('input', (e) => {
    if (fInicioPrestamosFormulario.value != '') {
        fFinalPrestamosFormulario.disabled = false;
    }
});

frecuenciaPagoPrestamosFormulario.addEventListener('change', (e) => {
    if (frecuenciaPagoPrestamosFormulario.value != 'seleccionar') {
        if (frecuenciaPagoPrestamosFormulario.value === 'diario') {
            console.log("diario");
            const diasFrecuencia = (fFinalPrestamosFormulario.value - fInicioPrestamosFormulario.value);
            console.log(diasFrecuencia);
        }
        if (frecuenciaPagoPrestamosFormulario.value === 'semanal') {
            console.log("semanal");
        }
        if (frecuenciaPagoPrestamosFormulario.value === 'quincenal') {
            console.log("quincenal");
        }
        if (frecuenciaPagoPrestamosFormulario.value === 'mensual') {
            console.log("mensual");
        }
        if (frecuenciaPagoPrestamosFormulario.value === 'unico') {
            console.log("unico");
        }

    }
});

const completeForm = (clienteSeleccionado) => {
    console.log(clienteSeleccionado);
    console.log(tasaInteresPrestamosFormulario.value);
    console.log(montoPrestamosFormulario.value);

    
}


document.getElementById("buscador").addEventListener("input", function () {
    let input, filter, select, option, i;
    input = document.getElementById("buscador");
    filter = input.value.toUpperCase();
    select = document.getElementById("selectOpciones");
    option = select.getElementsByTagName("option");

    for (i = 0; i < option.length; i++) {
        if (option[i].textContent.toUpperCase().indexOf(filter) > -1) {
            option[i].style.display = "";
        } else {
            option[i].style.display = "none";
        }
    }
});