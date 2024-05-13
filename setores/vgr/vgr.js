document.addEventListener("DOMContentLoaded", function () {
  // Esta função será executada quando o DOM estiver completamente carregado
  document.getElementById("solucao").value =
    localStorage.getItem("VGRrelatorioSalvo");
  document.getElementById("Turno").value = localStorage.getItem("VGRturnoSalvo");
  document.getElementById("Nome").value = localStorage.getItem("VGRnomeSalvo");
  
  var elemento = document.getElementById("imgRelatorio");
  elemento.disabled = true;
  atualizaParams()
});

var turno = document.getElementById("Turno").value;
var nome = document.getElementById("Nome").value;
var data = document.getElementById("Data").value;

var Processo = document.getElementById("Processo").value;
var Incidente = document.getElementById("Incidente").value;
var Equipamento = document.getElementById("Equipamento").value;
var Acionamento = document.getElementById("Acionamento").value;

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
  } else if (turno == "" || nome == "" || data == "") {
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
        
        document.getElementById("solucao").value +=
          "*USINA:* " +
          Processo +
          "\n\n" +
          "*INCIDENTE:* " +
          Incidente +
          "\n\n" +
          "*EQUIPAMENTO:* " +
          Equipamento +
          "\n\n" +
          "*Qual horário da falha:* " +
          Acionamento +
          "\n\n" +
          "*Descreve o problema:* " +
          problemas[index] +
          "\n\n" +
          "*Solução:* " +
          solucoes[index] 
          + "\n_\n\n" 
        document.getElementById("Incidente").value = "";
        document.getElementById("probl").value = "";
        document.getElementById("solu").value = "";
        salvaDados();
        break;
      }
    }
  }
}

function ajustarLargura(input) {
  input.style.width = ((input.value.length + 10) * 6) + 'px';
}

function salvaDados() {
  var relat = document.getElementById("solucao").value;
  localStorage.setItem("VGRrelatorioSalvo", relat);
  localStorage.setItem("VGRnomeSalvo", nome);
  localStorage.setItem("VGRturnoSalvo", turno);
}
var DadosDoUsuario;
function atualizaParams() {
  imgPerfil();
  turno = document.getElementById("Turno").value;
  nome = document.getElementById("Nome").value;
  data = document.getElementById("Data").value;

  var ano = data.substring(0, 4);
  var mes = data.substring(5, 7);
  var dia = data.substring(8, 10);

  data = dia + "/" + mes + "/" + ano;

  
  DadosDoUsuario =
    "<strong>*TURMA " +
    turno + "*" + 
    "</strong> - " +
    nome +
    "<br><br> *DATA* <br><br>" +
    data;

    if (turno == "A" || turno == "B") {
      DadosDoUsuario += "<br><br>*HORÁRIO*\n\n<br><br>06:00H às 18:00H<br>"
    }
    if (turno == "C" || turno == "D") {
      DadosDoUsuario += "<br><br>*HORÁRIO*\n\n<br><br>18:00H às 06:00H<br>"
    }

  document.getElementById("formatedText").innerHTML = DadosDoUsuario;
}

function atualizaParams2() {
  Processo = document.getElementById("Processo").value;
  Incidente = document.getElementById("Incidente").value;
  Equipamento = document.getElementById("Equipamento").value;
  Acionamento = document.getElementById("Acionamento").value;
  if (Apontamento == "" || Apontamento == 0) {
    Apontamento = "*Não houve apontamento de parada*";
  } else {
    Apontamento = "*Houve apontamento de aproximadamente " + Apontamento + "*";
  }

  var Aano = Acionamento.substring(0, 4);
  var Ames = Acionamento.substring(5, 7);
  var Adia = Acionamento.substring(8, 10);
  var horaAcionamento = Acionamento.split("T")[1];


  Acionamento = Adia + "/" + Ames + "/" + Aano + " às " + horaAcionamento;
}

var TextToCopy = "";
function copiar() {
  TextToCopy = "*RELATÓRIO DE TURNO*\n\n" + 
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
    img.src = "../../Imagens/pedro.jpg";
  } else {
    if (nome.value.toUpperCase().includes("LORENA")) {
      img.src = "../../Imagens/lorena.jpg";
    } else {
      if (
        nome.value.toUpperCase().includes("OTAVIO") ||
        nome.value.toUpperCase().includes("OTÁVIO")
      ) {
        img.src = "../../Imagens/otavio.jpg";
      } else {
        if (nome.value.toUpperCase().includes("LUIS")) {
          img.src = "../../Imagens/luis.jpg";
        } else {
          img.src = "../../Imagens/imgteste.jpg";
        }
      }
    }
  }
}

//Verifica o setor para gerar o relatório
function verificaSetor() {
  setor = document.getElementById("setor");
  if (setor.value == "automacaopico") {
    window.location.href = "../../index.html";
  } else {
    if (setor.value == "eletricapico") {
      window.location.href = "../eletricaPico/eletPico.html";
    }
  }
}
