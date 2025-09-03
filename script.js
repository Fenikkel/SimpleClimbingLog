// Al cargar la página, inicializamos el contador si no existe
if (localStorage.getItem("Contador") === null) {
  localStorage.setItem("Contador", 0);
}

// Mostrar el valor actual
document.getElementById("contador").innerText = localStorage.getItem("Contador");

// Función para incrementar
function incrementar() {
  let valor = parseInt(localStorage.getItem("Contador"));
  valor++;
  localStorage.setItem("Contador", valor);
  document.getElementById("contador").innerText = valor;
}

// Función para reiniciar
function reiniciar() {
  localStorage.setItem("Contador", 0);
  document.getElementById("contador").innerText = 0;
}
