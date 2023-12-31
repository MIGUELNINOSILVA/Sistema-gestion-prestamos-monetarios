import {
    getClientes,
    getPrestamos
} from "./API.js";

document.addEventListener('DOMContentLoaded', loadContent());

// Selectores
const cantidadClientes = document.getElementById('cantidadClientes');
const cantidadPrestamos = document.getElementById('cantidadPrestamos');
const cantidadTotalPrestada = document.getElementById('cantidadTotalPrestada');
const ganaciaParcial = document.getElementById('ganaciaParcial');

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

        ganaciaParcial.innerHTML = `$${sumaTotalInteres.toLocaleString(undefined, {maximumFractionDigits: 2,
            minimumFractionDigits: 2})}`
        cantidadTotalPrestada.innerHTML = `$${formattedNumber}`;

        const ctx = document.getElementById('myChart');
        ctx.width = '300px';
        ctx.height = '300px';
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: [`Prestado - $${sumaTotalPrestamo.toLocaleString()}`, `Intereses  - $${sumaTotalInteres.toLocaleString()}`],
                datasets: [{
                    label: 'Estadisticas generales',
                    data: [sumaTotalPrestamo, sumaTotalInteres, 0, 0],
                    borderWidth: 2
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

        
    }  catch (error) {
        console.log("NO CARGA LA DATA, INTENTA DE NUEVO")
    } finally {
        // Ocultar el indicador de carga una vez que se complete la función
        loading.style.display = 'none';
    };

}