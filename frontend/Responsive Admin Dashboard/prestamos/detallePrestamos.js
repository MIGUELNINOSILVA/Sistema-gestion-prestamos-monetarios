import {
  getOnePrestamos,
  getClientes,
  getCuotas,
  addCuotas,
  updatePrestamo,
} from "../Responsive Admin Dashboard - final/assets/js/API.js";

document.addEventListener("DOMContentLoaded", loadContent);

// Selectores
const numeroPrestamoTitle = document.getElementById("numeroPrestamoTitle");
const tablaDetallePrestamos = document.getElementById("tablaDetallePrestamos");
const formAddCuotas = document.getElementById("formAddCuotas");

async function loadContent() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const prestamoId = urlParams.get("id");
    const clientes = await getClientes();
    const prestamos = await getOnePrestamos(prestamoId);
    const cuotas = await getCuotas();

    // Encontrando cliente con el id
    const identificacionClientes = clientes.find(
      (cliente) => cliente._id === prestamos.idCliente
    );
    // Encontrando las cuotas con el mismo ID del prestamo
    const cuotasCopia = cuotas.map((cuota) => {
      if (cuota.idPrestamo === prestamos._id) {
        return cuota;
      }
      // Si no cumple la condición, no se incluirá en la copia
    });
    const filteredArray = cuotasCopia.filter(item => item !== undefined);
    console.log("filtrado");
    console.log(filteredArray);


    console.log("copia");
    console.log(cuotasCopia);
    let numeroMenor = Infinity;
    for (let i = 0; i < filteredArray.length; i++) {
      if (filteredArray[i] && filteredArray[i].restante < numeroMenor) {
        numeroMenor = filteredArray[i].restante;
      }
    }

    console.log(numeroMenor);
    const montoFormateado = prestamos.monto.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
    });
    numeroPrestamoTitle.innerHTML = `${identificacionClientes.nombre} - ${montoFormateado}`;
    if (filteredArray.length > 0 && numeroMenor <= 0) {
      console.log(prestamos.estado);
      await updatePrestamo({ estado: false }, prestamoId);
      prestamos.estado = false;
      console.log(prestamos.estado);
    }

    if (filteredArray.length > 0) {
      filteredArray.forEach((cuotas) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        const fechaPagoFormateada = new Date(
          cuotas.fechaPago
        ).toLocaleDateString("es-ES", options);
        const montoFormateado = cuotas.monto.toLocaleString("es-CO", {
          style: "currency",
          currency: "COP",
        });
        const restantaFormateado = cuotas.restante.toLocaleString("es-CO", {
          style: "currency",
          currency: "COP",
        });
        tablaDetallePrestamos.innerHTML += `
            <tr>
                <td>${cuotas.numeroCuota}</td>
                <td>${montoFormateado}</td>
                <td>${fechaPagoFormateada}</td>
                <td>${restantaFormateado}</td>
            </tr>
        `;
      });
    }else{
      
    }
  } catch (error) {
    console.log(error);
  } finally {
    // Ocultar el indicador de carga una vez que se complete la función
    loading.style.display = "none";
  }
}

formAddCuotas.addEventListener("submit", async (e) => {
  e.preventDefault();
  const urlParams = new URLSearchParams(window.location.search);
  const prestamoId = urlParams.get("id");
  const cuotas = await getCuotas();
  const prestamos = await getOnePrestamos(prestamoId);

  // Encontrando las cuotas con el mismo ID del prestamo
  const cuotasCopia = cuotas.map((cuota) => {
    if (cuota.idPrestamo === prestamos._id) {
      return cuota;
    }
    // Si no cumple la condición, no se incluirá en la copia
  });
  let numeroMenor = Infinity;
  for (let i = 0; i < cuotasCopia.length; i++) {
    if (cuotasCopia[i] && cuotasCopia[i].restante < numeroMenor) {
      numeroMenor = cuotasCopia[i].restante;
    }
  }
  numeroMenor - document.getElementById("montoCuotaFormulario").value;
  if (numeroMenor == Infinity) {
    let Menor =
      prestamos.total -
      parseFloat(document.getElementById("montoCuotaFormulario").value);

    const data = {
      idPrestamo: prestamoId,
      numeroCuota: parseInt(
        document.getElementById("numeroCuotaFormulario").value
      ),
      monto: parseFloat(document.getElementById("montoCuotaFormulario").value),
      fechaPago: document.getElementById("fechaPagoCuotaFormulario").value,
      restante: Menor,
    };
    console.log(data);
    if (await addCuotas(data)) {
      alert("Datos enviados satisfactoriamente");
      location.reload();
    } else {
      alert("No se pudo enviar los datos");
    }
  } else {
    let Menor =
      prestamos.total -
      parseFloat(document.getElementById("montoCuotaFormulario").value);

    const data = {
      idPrestamo: prestamoId,
      numeroCuota: parseInt(
        document.getElementById("numeroCuotaFormulario").value
      ),
      monto: parseFloat(document.getElementById("montoCuotaFormulario").value),
      fechaPago: document.getElementById("fechaPagoCuotaFormulario").value,
      restante: Menor,
    };
    console.log(data);
    if (await addCuotas(data)) {
      alert("Datos enviados satisfactoriamente");
      location.reload();
    } else {
      alert("No se pudo enviar los datos");
    }
  }
});
