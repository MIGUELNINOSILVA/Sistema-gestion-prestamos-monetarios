import {
    getClientes,
    getPrestamos
} from "./API.js";

document.addEventListener('DOMContentLoaded', loadContent());

// Selectores
const cantidadClientes = document.getElementById('cantidadClientes');
const cantidadPrestamos = document.getElementById('cantidadPrestamos');
const cantidadTotalPrestada = document.getElementById('cantidadTotalPrestada');

async function loadContent() {
    try {
        const clientes = await getClientes();
        const prestamos = await getPrestamos();
        cantidadClientes.innerHTML = clientes.length;
        cantidadPrestamos.innerHTML = prestamos.length;

        // Mostrar cantidad total prestada
        let sumaTotalPrestamo = 0;
        prestamos.forEach(prestamo => {
            console.log(prestamo);
            const {
                monto
            } = prestamo;
            sumaTotalPrestamo += monto;
        });
        const number = 1234567.89123;
        const formattedNumber = sumaTotalPrestamo.toLocaleString(undefined, {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
        });

        cantidadTotalPrestada.innerHTML = `$ ${formattedNumber}`;
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