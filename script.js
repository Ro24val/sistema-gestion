
function mostrarFormulario(nombre) {
  document.querySelectorAll("form").forEach(f => f.classList.remove("active"));
  document.getElementById("form-" + nombre).classList.add("active");
}

const url = "https://script.google.com/macros/s/AKfycbzBU8RPJwZnWpO2AaV3EEg0yzaPevY2vHZAl3pbKJzDbYo8szpVh-b1lY3sLkuWqful/exec";

// Mostrar mensaje visual
function mostrarMensaje(texto, tipo = "success") {
  const resumen = document.getElementById("resumen");
  resumen.innerHTML = `<p style="color:${tipo === 'success' ? 'green' : 'red'};">${texto}</p>`;
}

// Servicio
const formServicio = document.getElementById("form-servicio");
formServicio.addEventListener("submit", function (e) {
  e.preventDefault();
  const datos = {
    tipo: "servicio",
    cliente: this.elements[0].value,
    maquina: this.elements[1].value,
    trabajo: this.elements[2].value,
    gastoExtra: this.elements[3].value,
    total: this.elements[4].value,
    fecha: this.elements[5].value,
    cancelado: this.elements[6].value
  };

  fetch(url, {
    method: "POST",
    body: JSON.stringify(datos),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.text())
    .then((data) => {
      mostrarMensaje("✅ Servicio enviado correctamente");
      this.reset();
    })
    .catch(() => mostrarMensaje("❌ Error al enviar. Revisa conexión.", "error"));
});

// Compra
const formCompra = document.getElementById("form-compra");
formCompra.addEventListener("submit", function (e) {
  e.preventDefault();
  const datos = {
    tipo: "compra",
    fecha: this.elements[0].value,
    proveedor: this.elements[1].value,
    repuesto: this.elements[2].value,
    cantidad: this.elements[3].value,
    costoUnitario: this.elements[4].value,
    totalCompra: this.elements[5].value
  };

  fetch(url, {
    method: "POST",
    body: JSON.stringify(datos),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.text())
    .then((data) => {
      mostrarMensaje("✅ Compra registrada correctamente");
      this.reset();
    })
    .catch(() => mostrarMensaje("❌ Error al enviar. Revisa conexión.", "error"));
});
