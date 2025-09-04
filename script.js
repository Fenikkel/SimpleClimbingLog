// Inicializa si no existe
if (localStorage.getItem("Contador") === null) {
  localStorage.setItem("Contador", 0);
}

// Muestra
document.getElementById("contador").innerText = localStorage.getItem("Contador");

// Incrementa
function incrementar() {
  let valor = parseInt(localStorage.getItem("Contador"), 10);
  valor++;
  localStorage.setItem("Contador", valor);
  document.getElementById("contador").innerText = valor;
}

// Reinicia
function reiniciar() {
  localStorage.setItem("Contador", 0);
  document.getElementById("contador").innerText = 0;
}
