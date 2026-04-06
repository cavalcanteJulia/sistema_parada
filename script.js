let inicio;
let intervalo;
let segundos = 0;
let ciclo = 0;

function formatarTempo(s) {
  let min = Math.floor(s / 60);
  let sec = s % 60;
  return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

function iniciarRCP() {
  if (intervalo) return;

  inicio = new Date();
  adicionarLog("🟢 Início da RCP");

  document.getElementById("btnRCP").style.display = "none";
  document.getElementById("btnStop").style.display = "inline-block";

  intervalo = setInterval(() => {
    segundos++;
    document.getElementById("tempo").innerText = formatarTempo(segundos);

    // ciclo a cada 2 min (120s)
    if (segundos % 120 === 0) {
      ciclo++;
      document.getElementById("ciclo").innerText = "Ciclo: " + ciclo;

      alert("⚠ Trocar compressor / checar ritmo!");
      adicionarLog("🔁 Novo ciclo de RCP");
    }
  }, 1000);
}

function pararRCP() {
  if (!intervalo) return;

  clearInterval(intervalo);
  intervalo = null;
  adicionarLog("🔴 RCP parada");

  document.getElementById("btnRCP").style.display = "inline-block";
  document.getElementById("btnStop").style.display = "none";
}

function horaAtual() {
  let agora = new Date();
  return agora.toLocaleTimeString();
}

function adicionarLog(texto) {
  let li = document.createElement("li");
  li.innerText = `[${horaAtual()}] ${texto}`;
  document.getElementById("log").appendChild(li);
}

function registrarMedicacao() {
  let nome = document.getElementById("medNome").value;
  let dose = document.getElementById("medDose").value;
  let user = document.getElementById("medUser").value;

  if (!nome || !dose || !user) {
    alert("Preencha tudo!");
    return;
  }

  adicionarLog(`💉 Medicação: ${nome} | Dose: ${dose} | Por: ${user}`);

  document.getElementById("medNome").value = "";
  document.getElementById("medDose").value = "";
  document.getElementById("medUser").value = "";
}

function registrarChoque() {
  let joules = document.getElementById("joules").value;

  if (!joules) {
    alert("Informe os joules!");
    return;
  }

  adicionarLog(`⚡ Choque aplicado: ${joules}J`);

  document.getElementById("joules").value = "";
}