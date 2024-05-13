document.addEventListener("DOMContentLoaded", function () {
    // Esta função será executada quando o DOM estiver completamente carregado
    document.getElementById("solucao").value = localStorage.getItem("EletPicorelatorioSalvo")
    document.getElementById("Turno").value = localStorage.getItem("EletPicoturnoSalvo")
    document.getElementById("equipe").value = localStorage.getItem("EletPiconomeSalvo")
    document.getElementById("complexo").value = localStorage.getItem("EletPicocomplexo")
    document.getElementById("disciplina").value = localStorage.getItem("EletPicodisciplina")
    atualizaParams()
    var elemento = document.getElementById("imgRelatorio");
    elemento.disabled = true;
  });
  
  var turno = document.getElementById("Turno").value;
  var equipe = document.getElementById("equipe").value;
  var data = document.getElementById("Data").value;
  var disciplina = document.getElementById("disciplina").value;
  var complexo = document.getElementById("complexo").value;
  var Processo = document.getElementById("Processo").value;
  var Equipamento = document.getElementById("Equipamento").value;
  var motivo = document.getElementById("motivo").value;
  var status = document.getElementById("status").value;
  var obs = document.getElementById("obs").value;
  
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
      window.alert("Preencha a usina");
    } else if (Equipamento == "") {
      window.alert("Preencha a tag do equipamento");
    } else if (turno == "" || equipe == "" || disciplina == "" || complexo == "") {
      window.alert("Preencha seus dados pessoais e a data de hoje");
    } else if (textoProblema == "") {
      window.alert("Preencha o problema ocorrido");
    } else if (status == "") {
      window.alert("Preencha o status");
    } else if (textoSolucao == "") {
      window.alert("Preencha a solução");
    } else {
      for (let index = 0; index < 16; index++) {
        if (problemas[index] === "" && problemas[index - 1] !== textoProblema) {
          problemas[index] = textoProblema;
          solucoes[index] = textoSolucao;
          if (Apontamento == "") {
            Apontamento = "00:00"
          }
          document.getElementById("solucao").value +=
            "*USINA:* " + Processo +
            "\n" +
            "*EQUIPAMENTO:* " + Equipamento + 
            "\n" +
            "*MOTIVO:* " + motivo + 
            "\n" +
            "*CAUSA:* " +  problemas[index] +
            "\n" +
            "*SOLUÇÃO:* " + solucoes[index] +
            "\n" +
            "*TEMPO:* " + Apontamento +
            "\n " +
            "*STATUS:* " + status +
            "\n"
            if (obs == "") {
              document.getElementById("solucao").value += 
              "\n_\n";
            }else{
              document.getElementById("solucao").value += 
              "*OBS:* " + obs + 
              "\n_\n";
            }
          document.getElementById("probl").value = "";
          document.getElementById("solu").value = "";
          salvaDados()
          break;
        }
      }
    }
  }

  //Ajusta automaticamente a largura do input
  function ajustarLargura(input) {
    input.style.width = ((input.value.length + 10) * 6) + 'px';
  }
  
  function salvaDados() {
    var relat = document.getElementById("solucao").value
    localStorage.setItem("EletPicorelatorioSalvo", relat)
    localStorage.setItem("EletPiconomeSalvo", equipe)
    localStorage.setItem("EletPicocomplexo", complexo)
    localStorage.setItem("EletPicodisciplina", disciplina)
    localStorage.setItem("EletPicoturnoSalvo", turno)
  }
  var DadosDoUsuario;
  function atualizaParams() {
  
    //imgPerfil();
    turno = document.getElementById("Turno").value;
    equipe = document.getElementById("equipe").value;
    data = document.getElementById("Data").value;
    complexo = document.getElementById("complexo").value
    disciplina = document.getElementById("disciplina").value;
    motivo = document.getElementById("motivo").value;
    status = document.getElementById("status").value;
    var obs = document.getElementById("obs").value;
  
    var nomes = equipe.replace(/,/g, "<br>")
  
    var ano = data.substring(0, 4);
    var mes = data.substring(5, 7);
    var dia = data.substring(8, 10);
  
    data = dia + "/" + mes + "/" + ano;
  
    DadosDoUsuario = "*RELATÓRIO DE TURNO*<br><br>" + 
      "*TURMA: " + turno + "*" + 
      "<br>" + 
      disciplina +
      "<br><br>*"+ 
      complexo.toUpperCase() +
      "*<br>" +
      nomes + 
      "<br><br>"+
      "*DATA:* " + data 
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
    Equipamento = document.getElementById("Equipamento").value;
    Apontamento = document.getElementById("apontamento").value;
    
  
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

  //Verifica o setor para gerar o relatório
function verificaSetor() {
  setor = document.getElementById('setor')
  if (setor.value == "automacaovgr"){
    window.location.href = '../vgr/vgr.html'
  }else{
    if (setor.value == "automacaopico"){
      window.location.href = '../../index.html'
  }
}}