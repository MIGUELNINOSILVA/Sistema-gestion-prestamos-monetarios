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
        let sumaTotalInteres = 0;
        prestamos.forEach(prestamo => {
            console.log(prestamo);
            const {
                monto,
                interes
            } = prestamo;
            sumaTotalPrestamo += monto;
            sumaTotalInteres += interes;
        });
        const formattedNumber = sumaTotalPrestamo.toLocaleString(undefined, {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
        });
        cantidadTotalPrestada.innerHTML = `$${formattedNumber}`;

        const ctx = document.getElementById('myChart');
        ctx.width = '300px';
        ctx.height = '300px';
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Prestado', 'Intereses', 'Por Cobrar', 'Cobrado'],
                datasets: [{
                    label: 'Estadisticas generales',
                    data: [sumaTotalPrestamo, sumaTotalInteres, 400000, 800000],
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

        
    } catch (error) {
        console.log(error);
    };

}