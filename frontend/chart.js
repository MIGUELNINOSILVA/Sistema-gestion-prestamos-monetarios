const ctx = document.getElementById('myChart');
const prestamoTotal = document.querySelector('#prestamoTotal');
const prestamoInteresTotal = document.querySelector('#prestamoInteresTotal');

let totalPrestamos = [100000,250000,350000, 800000,1500000, 200000, 100000];
let interes = 20;
let sumaIntereses = [];
totalPrestamos.forEach(prestamo => {
    console.log(prestamo);
    let intereses = (prestamo * interes)/100;
    console.log(intereses);
    saveIntereses(intereses);
});


function saveIntereses(intereses) {
    sumaIntereses.push(intereses);
    console.log(`La suma de los intereses es: ${intereses}`);
    console.log(sumaIntereses.length);
};

// lo mismo, pero más conciso, y en solo una línea
const suma1 = totalPrestamos.reduce((anterior, actual) => anterior + actual, 0);
const suma2 = sumaIntereses.reduce((anterior, actual) => anterior + actual, 0);

prestamoTotal.innerHTML = `$ ${suma1.toLocaleString()}`;
prestamoInteresTotal.innerHTML = `$ ${suma2.toLocaleString()}`;

alert(suma2)

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: sumaIntereses,
        datasets: [{
            label: '# of Votes',
            data: totalPrestamos,
            backgroundColor: [
                '#2C3E50',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
              ],
            borderWidth: 1,
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