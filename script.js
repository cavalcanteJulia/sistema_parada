let segundos = 0;
let intervalo = null;
let ciclo = 0;

let logs = [];
let choques = 0;
let medicacoes = 0;

function salvar() {
  localStorage.setItem("rcp_logs", JSON.stringify(logs));
}

function carregar() {
  let dados = localStorage.getItem("rcp_logs");
  if (dados) {
    logs = JSON.parse(dados);
    logs.forEach(l => addTela(l));
  }
}

carregar();

function formatar(s) {
  let m = Math.floor(s / 60);
  let sec = s % 60;
  return `${m.toString().padStart(2,'0')}:${sec.toString().padStart(2,'0')}`;
}

function hora() {
  return new Date().toLocaleTimeString();
}

function addLog(txt) {
  let msg = `[${hora()}] ${txt}`;
  logs.push(msg);
  salvar();
  addTela(msg);
}

function addTela(msg) {
  let li = document.createElement("li");
  li.innerText = msg;
  document.getElementById("log").appendChild(li);
}

function iniciarParada() {
  segundos = 0;
  ciclo = 0;
  choques = 0;
  medicacoes = 0;

  document.getElementById("tempo").innerText = "00:00";
  document.getElementById("ciclo").innerText = "Ciclo: 0";

  document.getElementById("log").innerHTML = "";
  logs = [];

  addLog("🚨 Início da parada cardíaca");

  alert("Parada iniciada! Comece a RCP");
}

function iniciarRCP() {
  if (intervalo) return;

  addLog("▶ Início da RCP");

  intervalo = setInterval(() => {
    segundos++;
    document.getElementById("tempo").innerText = formatar(segundos);

    if (segundos % 120 === 0) {
      ciclo++;
      document.getElementById("ciclo").innerText = "Ciclo: " + ciclo;

      alert("🔁 Trocar compressor / checar ritmo");
      addLog("🔁 Novo ciclo");
    }
  }, 1000);
}

function pararRCP() {
  clearInterval(intervalo);
  intervalo = null;
  addLog("⏹ RCP parada");
}

function registrarMedicacao() {
  let nome = medNome.value;
  let dose = medDose.value;
  let user = medUser.value;

  if (!nome || !dose || !user) return alert("Preencha tudo");

  medicacoes++;
  addLog(`💉 ${nome} ${dose} - ${user}`);

  setTimeout(() => {
    alert(`⏰ Hora de repetir ${nome}`);
    addLog(`⏰ Repetir ${nome}`);
  }, 180000); // 3 min

  medNome.value = "";
  medDose.value = "";
  medUser.value = "";
}

function registrarChoque() {
  let j = joules.value;
  if (!j) return alert("Informe joules");

  choques++;
  addLog(`⚡ Choque ${j}J`);

  joules.value = "";
}

function registrarROSC() {
  if (!intervalo) {
    alert("RCP não está ativa!");
    return;
  }

  addLog("💓 Retorno da circulação (ROSC)");

  pararRCP();

  alert("Paciente voltou! Gerando relatório...");
  gerarRelatorio();
}

function gerarRelatorio() {
  let rel = `
Tempo total: ${formatar(segundos)}
Ciclos: ${ciclo}
Choques: ${choques}
Medicações: ${medicacoes}
`;

  alert(rel);
}