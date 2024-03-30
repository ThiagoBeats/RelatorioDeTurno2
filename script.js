var turno = document.getElementById("Turno").value;
var nome = document.getElementById("Nome").value;
var data = document.getElementById("Data").value;
var matricula = document.getElementById("Matricula").value;

var Processo = document.getElementById("Processo").value;
var Incidente = document.getElementById("Incidente").value;
var Equipamento = document.getElementById("Equipamento").value;
var Acionamento = document.getElementById("Acionamento").value;
var Encerramento = document.getElementById("Encerramento").value;

var Problema = document.getElementById("probl").value;
var Solucao = document.getElementById("solu").value;

var problemas = [
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
];
var solucoes = [
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
];

function atualizaSolucoes() {
  atualizaParams2();
  var textoProblema = document.getElementById("probl").value;
  var textoSolucao = document.getElementById("solu").value;

  if (Processo == "") {
    window.alert("Preencha o processo");
  } else if (Incidente == "" || Incidente == "INC") {
    window.alert("Preencha o incidente");
  } else if (Equipamento == "") {
    window.alert("Preencha a tag do equipamento");
  } else if (Acionamento.includes("undefined")) {
    window.alert("Preencha o horário do atendimento");
  } else if (turno == "" || nome == "" || data == "" || matricula == "") {
    window.alert("Preencha seus dados pessoais e a data de hoje");
  } else if (textoProblema == "") {
    window.alert("Preencha o problema ocorrido");
  } else if (textoSolucao == "") {
    window.alert("Preencha a solução");
  } else {
    for (let index = 0; index < 16; index++) {
      if (problemas[index] === "" && problemas[index - 1] !== textoProblema) {
        problemas[index] = textoProblema;
        solucoes[index] = textoSolucao;
        if (Encerramento.includes("undefined")) {
          Encerramento = "Em aberto";
        }
        document.getElementById("solucao").value +=
          "Processo: " +
          Processo +
          "\n" +
          "Incidente: " +
          Incidente +
          "\n" +
          "Equipamento: " +
          Equipamento +
          "\n\n" +
          "Acionamento: " +
          Acionamento +
          "\n\n" +
          "Problema: " +
          problemas[index] +
          "\n\n" +
          "Solução: " +
          solucoes[index] +
          "\n\nEncerramento: " +
          Encerramento +
          "\n________________________________\n\n";
        document.getElementById("Incidente").value = "";
        document.getElementById("probl").value = "";
        document.getElementById("solu").value = "";
        break;
      }
    }
  }
}
var DadosDoUsuario;
function atualizaParams() {
  turno = document.getElementById("Turno").value;
  nome = document.getElementById("Nome").value;
  data = document.getElementById("Data").value;
  matricula = document.getElementById("Matricula").value;

  DadosDoUsuario =
    "<strong>Turno: " +
    turno +
    "</strong> - " +
    nome +
    "<br>" +
    "Matricula: " +
    matricula +
    "<br> Data: " +
    data +
    "<br><br>";

  document.getElementById("formatedText").innerHTML = DadosDoUsuario;
}

function atualizaParams2() {
  Processo = document.getElementById("Processo").value;
  Incidente = document.getElementById("Incidente").value;
  Equipamento = document.getElementById("Equipamento").value;
  Acionamento = document.getElementById("Acionamento").value;
  Encerramento = document.getElementById("Encerramento").value;

  var Aano = Acionamento.substring(0, 4);
  var Ames = Acionamento.substring(5, 7);
  var Adia = Acionamento.substring(8, 10);
  var horaAcionamento = Acionamento.split("T")[1];

  var Eano = Encerramento.substring(0, 4);
  var Emes = Encerramento.substring(5, 7);
  var Edia = Encerramento.substring(8, 10);
  var horaEncerramento = Encerramento.split("T")[1];

  Acionamento = Adia + "/" + Ames + "/" + Aano + " às " + horaAcionamento;
  Encerramento = Edia + "/" + Emes + "/" + Eano + " às " + horaEncerramento;
}

function copiar() {
  var TextToCopy =
    document.getElementById("formatedText").innerText +
    "\n" +
    document.getElementById("solucao").value;
  navigator.clipboard.writeText(TextToCopy).then(
    function () {
      window.alert("Texto copiado com sucesso!");
    },
    function (err) {
        window.alert("Erro ao copiar texto: ", err);
    }
  );
}

function apagar() {
    if (window.confirm("Deseja mesmo apagar o relatório criado? ")) {
        document.getElementById("solucao").innerHTML = ''
    }
}


