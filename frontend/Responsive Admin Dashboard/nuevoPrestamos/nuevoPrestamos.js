
import {
    getClientes,
    addPrestamo
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
const totalPrestamosFormulario = document.getElementById('totalPrestamosFormulario');

tasaInteresPrestamosFormulario.addEventListener('input', (e) => {
    const valor = (e.target.value).match(/[0-9]/g);

    if (valor.length > 3) {
        e.target.value = '0';
    }
});

for (let i = 0; i < 24; i++) {
    tiempoPrestamosFormulario.innerHTML += `
        <option value="${i+1}" selected>${i+1} Mes</option>
    `;

}

/* fInicioPrestamosFormulario.addEventListener('input', (e) => {
    if (fInicioPrestamosFormulario.value != '') {
        fFinalPrestamosFormulario.disabled = false;
    }
}); */
let interesCantidad;
let totalPagar;
let cantidadCuotasTotal;
let valorCuotaTotal;
frecuenciaPagoPrestamosFormulario.addEventListener('change', (e) => {
    if (frecuenciaPagoPrestamosFormulario.value != 'seleccionar') {
        if (frecuenciaPagoPrestamosFormulario.value === 'diario') {
            console.log("diario");
            // Paso 1: Parsear fInicioPrestamosFormulario.value a un objeto Date
            const fechaInicio = new Date(fInicioPrestamosFormulario.value);

            // Paso 2: Calcular la nueva fecha sumando los días requeridos
            const diasMes = 30 * tiempoPrestamosFormulario.value;
            fechaInicio.setDate(fechaInicio.getDate() + diasMes);

            // Paso 3: Formatear la nueva fecha y actualizar el campo fFinalPrestamosFormulario
            const year = fechaInicio.getFullYear();
            const month = (fechaInicio.getMonth() + 1).toString().padStart(2, '0');
            const day = fechaInicio.getDate().toString().padStart(2, '0');
            const nuevaFecha = `${year}-${month}-${day}`;
            fFinalPrestamosFormulario.value = nuevaFecha;
            const totalPrestamo = (((parseInt(montoPrestamosFormulario.value) * parseFloat(tasaInteresPrestamosFormulario.value * tiempoPrestamosFormulario.value))/100)+parseInt(montoPrestamosFormulario.value))/diasMes;
            let interesCantidadDentro = ((parseInt(montoPrestamosFormulario.value)*parseFloat(tasaInteresPrestamosFormulario.value))/100)*tiempoPrestamosFormulario.value;
            interesCantidad = interesCantidadDentro;
            let totalPagarDentro = interesCantidadDentro + parseInt(montoPrestamosFormulario.value);
            totalPagar = totalPagarDentro;
            totalPrestamosFormulario.value = totalPrestamo;
            let cantidadCuotasDentro = diasMes;
            cantidadCuotasTotal = cantidadCuotasDentro;
            totalPrestamosFormulario.textContent = totalPrestamo;
            valorCuotaTotal = totalPrestamo;

        }
        if (frecuenciaPagoPrestamosFormulario.value === 'semanal') {
            console.log("semanal");
            // Paso 1: Parsear fInicioPrestamosFormulario.value a un objeto Date
            const fechaInicio = new Date(fInicioPrestamosFormulario.value);

            // Paso 2: Calcular la nueva fecha sumando los días requeridos
            const diasMes = 30 * tiempoPrestamosFormulario.value;
            fechaInicio.setDate(fechaInicio.getDate() + diasMes);

            // Paso 3: Formatear la nueva fecha y actualizar el campo fFinalPrestamosFormulario
            const year = fechaInicio.getFullYear();
            const month = (fechaInicio.getMonth() + 1).toString().padStart(2, '0');
            const day = fechaInicio.getDate().toString().padStart(2, '0');
            const nuevaFecha = `${year}-${month}-${day}`;
            fFinalPrestamosFormulario.value = nuevaFecha;
            const totalInteres = (parseInt(montoPrestamosFormulario.value) * parseFloat(tasaInteresPrestamosFormulario.value)/100);
            const totalPagarConInteres = (((totalInteres * tiempoPrestamosFormulario.value) + parseInt(montoPrestamosFormulario.value))/4);
            const totalCuotaFinal = totalPagarConInteres / tiempoPrestamosFormulario.value
            let interesCantidadDentro = ((parseInt(montoPrestamosFormulario.value)*parseFloat(tasaInteresPrestamosFormulario.value))/100)*tiempoPrestamosFormulario.value;
            interesCantidad = interesCantidadDentro;
            let totalPagarDentro = interesCantidadDentro + parseInt(montoPrestamosFormulario.value);
            totalPagar = totalPagarDentro;
            totalPrestamosFormulario.value = totalCuotaFinal;
            let cantidadCuotasDentro = (diasMes*4)/30;
            cantidadCuotasTotal = cantidadCuotasDentro;
            totalPrestamosFormulario.textContent = totalCuotaFinal;
            valorCuotaTotal = totalCuotaFinal;
        }
        if (frecuenciaPagoPrestamosFormulario.value === 'quincenal') {
            console.log("quincenal");
            // Paso 1: Parsear fInicioPrestamosFormulario.value a un objeto Date
            const fechaInicio = new Date(fInicioPrestamosFormulario.value);

            // Paso 2: Calcular la nueva fecha sumando los días requeridos
            const diasMes = 30 * tiempoPrestamosFormulario.value;
            fechaInicio.setDate(fechaInicio.getDate() + diasMes);

            // Paso 3: Formatear la nueva fecha y actualizar el campo fFinalPrestamosFormulario
            const year = fechaInicio.getFullYear();
            const month = (fechaInicio.getMonth() + 1).toString().padStart(2, '0');
            const day = fechaInicio.getDate().toString().padStart(2, '0');
            const nuevaFecha = `${year}-${month}-${day}`;
            fFinalPrestamosFormulario.value = nuevaFecha;
            const totalInteres = (parseInt(montoPrestamosFormulario.value) * parseFloat(tasaInteresPrestamosFormulario.value)/100);
            const totalPagarConInteres = (((totalInteres * tiempoPrestamosFormulario.value) + parseInt(montoPrestamosFormulario.value))/2);
            const totalCuotaFinal = totalPagarConInteres / tiempoPrestamosFormulario.value
            let interesCantidadDentro = ((parseInt(montoPrestamosFormulario.value)*parseFloat(tasaInteresPrestamosFormulario.value))/100)*tiempoPrestamosFormulario.value;
            interesCantidad = interesCantidadDentro;
            let totalPagarDentro = interesCantidadDentro + parseInt(montoPrestamosFormulario.value);
            totalPagar = totalPagarDentro;
            totalPrestamosFormulario.value = totalCuotaFinal;
            let cantidadCuotasDentro = (diasMes*2)/30;
            cantidadCuotasTotal = cantidadCuotasDentro;
            totalPrestamosFormulario.textContent = totalCuotaFinal;
            valorCuotaTotal = totalCuotaFinal;
        }
        if (frecuenciaPagoPrestamosFormulario.value === 'mensual') {
            console.log("mensual");
            // Paso 1: Parsear fInicioPrestamosFormulario.value a un objeto Date
            const fechaInicio = new Date(fInicioPrestamosFormulario.value);

            // Paso 2: Calcular la nueva fecha sumando los días requeridos
            const diasMes = 30 * tiempoPrestamosFormulario.value;
            fechaInicio.setDate(fechaInicio.getDate() + diasMes);

            // Paso 3: Formatear la nueva fecha y actualizar el campo fFinalPrestamosFormulario
            const year = fechaInicio.getFullYear();
            const month = (fechaInicio.getMonth() + 1).toString().padStart(2, '0');
            const day = fechaInicio.getDate().toString().padStart(2, '0');
            const nuevaFecha = `${year}-${month}-${day}`;
            fFinalPrestamosFormulario.value = nuevaFecha;
            const totalInteres = (parseInt(montoPrestamosFormulario.value) * parseFloat(tasaInteresPrestamosFormulario.value)/100);
            const totalPagarConInteres = (((totalInteres * tiempoPrestamosFormulario.value) + parseInt(montoPrestamosFormulario.value))/1);
            const totalCuotaFinal = totalPagarConInteres / tiempoPrestamosFormulario.value
            let interesCantidadDentro = ((parseInt(montoPrestamosFormulario.value)*parseFloat(tasaInteresPrestamosFormulario.value))/100)*tiempoPrestamosFormulario.value;
            interesCantidad = interesCantidadDentro;
            let totalPagarDentro = interesCantidadDentro + parseInt(montoPrestamosFormulario.value);
            totalPagar = totalPagarDentro;
            totalPrestamosFormulario.value = totalCuotaFinal;
            let cantidadCuotasDentro = (diasMes)/30;
            cantidadCuotasTotal = cantidadCuotasDentro;
            totalPrestamosFormulario.textContent = totalCuotaFinal;
            valorCuotaTotal = totalCuotaFinal;
        }
        if (frecuenciaPagoPrestamosFormulario.value === 'unico') {
            console.log("unico");
            // Paso 1: Parsear fInicioPrestamosFormulario.value a un objeto Date
            const fechaInicio = new Date(fInicioPrestamosFormulario.value);

            // Paso 2: Calcular la nueva fecha sumando los días requeridos
            const diasMes = 30 * tiempoPrestamosFormulario.value;
            fechaInicio.setDate(fechaInicio.getDate() + diasMes);

            // Paso 3: Formatear la nueva fecha y actualizar el campo fFinalPrestamosFormulario
            const year = fechaInicio.getFullYear();
            const month = (fechaInicio.getMonth() + 1).toString().padStart(2, '0');
            const day = fechaInicio.getDate().toString().padStart(2, '0');
            const nuevaFecha = `${year}-${month}-${day}`;
            const totalInteres = (parseInt(montoPrestamosFormulario.value) * parseFloat(tasaInteresPrestamosFormulario.value)/100);
            const totalPagarConInteres = (((totalInteres * tiempoPrestamosFormulario.value) + parseInt(montoPrestamosFormulario.value))/1);
            const totalCuotaFinal = totalPagarConInteres / tiempoPrestamosFormulario.value
            let interesCantidadDentro = ((parseInt(montoPrestamosFormulario.value)*parseFloat(tasaInteresPrestamosFormulario.value))/100)*tiempoPrestamosFormulario.value;
            interesCantidad = interesCantidadDentro;
            let totalPagarDentro = interesCantidadDentro + parseInt(montoPrestamosFormulario.value);
            totalPagar = totalPagarDentro;
            totalPrestamosFormulario.value = totalCuotaFinal;
            let cantidadCuotasDentro = (diasMes)/30;
            cantidadCuotasTotal = cantidadCuotasDentro;
            totalPrestamosFormulario.textContent = totalCuotaFinal;
            valorCuotaTotal = totalCuotaFinal;
        }

    }
});

let clienteSeleccionadoGlobal;
const completeForm = (clienteSeleccionado) => {
    clienteSeleccionadoGlobal = clienteSeleccionado;
}

//Formulario ENVIAR DATA

const formAddPrestamos = document.getElementById('formAddPrestamos');
formAddPrestamos.addEventListener('submit', async(e)=>{
    e.preventDefault();//Evita que se envie el formulario al servidor
    const dataSend = {
        idCliente : clienteSeleccionadoGlobal._id,
        monto: parseInt(montoPrestamosFormulario.value),
        frecuenciaPago: frecuenciaPagoPrestamosFormulario.value,
        fechaInicio: fInicioPrestamosFormulario.value,
        fechaFin: fFinalPrestamosFormulario.value,
        tasaInteres: parseInt(tasaInteresPrestamosFormulario.value),
        interes : interesCantidad,
        total: totalPagar,
        cantidadCuotas : cantidadCuotasTotal,
        valorCuota: valorCuotaTotal,
        estado: true
    };
    console.log(dataSend);
    if (await addPrestamo(dataSend)) {
        alert("Datos enviados correctamente");
        window.location = "./nuevoPrestamos.html";
    }
})

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