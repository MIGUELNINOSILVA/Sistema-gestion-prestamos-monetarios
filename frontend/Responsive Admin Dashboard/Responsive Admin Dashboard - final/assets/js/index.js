import {getClientes} from "./API.js";

document.addEventListener('DOMContentLoaded', loadContent());

// Selectores
const cantidadClientes  = document.getElementById('cantidadClientes');

async function loadContent() {
    try {
        const clientes  =  await getClientes();
        console.log(clientes);
        cantidadClientes.innerHTML = clientes.length;
    } catch (error) {
        console.log(error);
    };
    
}

const ctx = document.getElementById('myChart');

new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Prestado', 'Intereses', 'Por Cobrar', 'Cobrado'],
        datasets: [{
            label: 'Estadisticas generales',
            data: [1000000, 200000, 400000, 800000],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});