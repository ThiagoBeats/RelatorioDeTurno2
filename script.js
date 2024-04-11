document.addEventListener("DOMContentLoaded", function () {
  // Esta função será executada quando o DOM estiver completamente carregado
  document.getElementById("solucao").value = localStorage.getItem("relatorioSalvo")
  document.getElementById("Turno").value = localStorage.getItem("turnoSalvo")
  document.getElementById("Nome").value = localStorage.getItem("nomeSalvo")
  document.getElementById("Matricula").value = localStorage.getItem("matriculaSalva")
  atualizaParams()
  var elemento = document.getElementById("imgRelatorio");
  elemento.disabled = true;
});

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

var Apontamento;

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
          "*Processo:* " +
          Processo +
          "\n" +
          "*Incidente:* " +
          Incidente +
          "\n" +
          "*Equipamento:* " +
          Equipamento +
          "\n\n" +
          "*Acionamento:* " +
          Acionamento +
          "\n\n" +
          "*Problema:* " +
          problemas[index] +
          "\n\n" +
          "*Solução:* " +
          solucoes[index] +
          "\n\n" +
          Apontamento +
          "\n\n*Encerramento:* " +
          Encerramento +
          "\n_\n";
        document.getElementById("Incidente").value = "";
        document.getElementById("probl").value = "";
        document.getElementById("solu").value = "";
        salvaDados()
        break;
      }
    }
  }
}

function salvaDados() {
  var relat = document.getElementById("solucao").value
  localStorage.setItem("relatorioSalvo", relat)
  localStorage.setItem("nomeSalvo", nome)
  localStorage.setItem("matriculaSalva", matricula)
  localStorage.setItem("turnoSalvo", turno)
}
var DadosDoUsuario;
function atualizaParams() {

  imgPerfil();
  turno = document.getElementById("Turno").value;
  nome = document.getElementById("Nome").value;
  data = document.getElementById("Data").value;
  matricula = document.getElementById("Matricula").value;

  

  var ano = data.substring(0, 4);
  var mes = data.substring(5, 7);
  var dia = data.substring(8, 10);

  data = dia + "/" + mes + "/" + ano;

  DadosDoUsuario =
    "<strong>*Turno:* " +
    turno +
    "</strong> - " +
    nome +
    "<br>" +
    "*Matricula:* " +
    matricula +
    "<br> *Data:* " +
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
  Apontamento = document.getElementById("apontamento").value;
  if (Apontamento == "" || Apontamento == 0) {
    Apontamento = "*Não houve apontamento de parada*";
  } else {
    Apontamento = "*Houve apontamento de aproximadamente " + Apontamento + "*";
  }

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

var TextToCopy = "";
function copiar() {
  TextToCopy =
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
    document.getElementById("solucao").value = "";
  }
}

function encaminhar() {
  var textToCopy =
    document.getElementById("formatedText").innerText +
    "\n" +
    document.getElementById("solucao").value;

  // Substituir quebras de linha por %0A
  var encodedText = encodeURIComponent(textToCopy).replace(/%0A/g, "%0A");

  var fullMessage = "https://wa.me/?text=" + encodedText;
  window.open(fullMessage, "_blank");
}

function imgPerfil(params) {
  var img = document.getElementById("imgPerfil");
  nome = document.getElementById("Nome");
  if (nome.value.toUpperCase().includes("PEDRO")) {
    img.src = "./Imagens/pedro.jpg";
  } else {
    if (nome.value.toUpperCase().includes("LORENA")) {
      img.src = "./Imagens/lorena.jpg";
    } else {
      if (
        nome.value.toUpperCase().includes("OTAVIO") ||
        nome.value.toUpperCase().includes("OTÁVIO")
      ) {
        img.src = "./Imagens/otavio.jpg";
      } else {
        if (nome.value.toUpperCase().includes("LUIS")) {
          img.src = "./Imagens/luis.jpg";
        } else {
          img.src = "./Imagens/imgteste.jpg";
        }
      }
    }
  }
}

