function solicitarSenha() {
  Swal.fire({
    title: "Digite sua senha:",
    input: "password",
    inputAttributes: {
      autocapitalize: "off",
    },
    showCancelButton: true,
    confirmButtonText: "Enviar",
    showLoaderOnConfirm: true,
    preConfirm: (senha) => {
      // Faça a verificação da senha aqui
      if (senha === "valepico") {
        insert();
        visibilidade = true;
      } else {
        Swal.fire("Senha incorreta. Acesso negado!");
      }
    },
    allowOutsideClick: () => !Swal.isLoading(),
  });
}

document.addEventListener("DOMContentLoaded", handleFile, false);
var dadosDeAcesso = "";
function handleFile() {
  var urlPlanilha = "https://docs.google.com/spreadsheets/d/1SAhRFohoxuAP-BS5waSTHa7R2YWQ4OdGjQxoVBi4nNQ/edit?usp=sharing"
  var filePath = "../Acessos.xlsx";

  var xhr = new XMLHttpRequest();
  xhr.open("GET", filePath, true);
  xhr.responseType = "arraybuffer";

  xhr.onload = function (e) {
    var data = new Uint8Array(xhr.response);
    var workbook = XLSX.read(data, { type: "array" });

    workbook.SheetNames.forEach(function (sheetName) {
      var worksheet = workbook.Sheets[sheetName];
      var jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      dadosDeAcesso = jsonData;
    });
  };

  xhr.send();
  var texto = document.getElementById("texto")
  texto.innerText += " ."
  if (texto.innerText.length > 40) {
    texto.innerText = "Carregando planilha"
  }
}

function verificarDados(params) {
  console.log(dadosDeAcesso.length);
  if (dadosDeAcesso.length < 10) {
    var header = document.getElementById("invisibilizar")
    var header2 = document.getElementById("invisibilizar2")
    header.style.display = "none"
    header2.style.display = "none"
    var header = document.getElementById("texto")
    header.style.display = "block"
    handleFile()
    setTimeout(verificarDados, 50);
  }else{
    var header = document.getElementById("invisibilizar")
    var header2 = document.getElementById("invisibilizar2")
    header.style.display = "block"
    header2.style.display = "block"
    var header = document.getElementById("texto")
    header.style.display = "none"
  }
}
setTimeout(verificarDados, 50);

var visibilidade = false;

function olhoClicado() {
  var olho = document.getElementById("eye");
  if (visibilidade) {
    excluirLinhas();
    visibilidade = false;
  } else {
    solicitarSenha();
  }
}

function excluirLinhas() {
  var Linhas = document.getElementsByClassName("novaLinha");
  // Verificar se há parágrafos antes de tentar removê-los
  if (Linhas.length > 0) {
    for (var i = Linhas.length - 1; i >= 0; i--) {
      var Linha = Linhas[i];
      Linha.remove();
    }
  }
}

function insert() {
  excluirLinhas();

  for (let index = 0; index < dadosDeAcesso.length; index++) {
    if(typeof(dadosDeAcesso[index][1]) != "undefined"){
    if (
      dadosDeAcesso[index][0].toUpperCase().trim() == "TFA".toUpperCase().trim()
    ) {
      var div = document.createElement("div");

      div.className = "head novaLinha";
      for (let i = 1; i < 6; i++) {
        var p = document.createElement("p");
        p.className = "novaLinha";
        p.textContent = dadosDeAcesso[index][i];
        div.appendChild(p);
      }
      document.getElementsByClassName("tfa")[0].appendChild(div);
    }

    if (
      dadosDeAcesso[index][0].toUpperCase().trim() ==
      "Pico".toUpperCase().trim()
    ) {
      var div = document.createElement("div");

      div.className = "head novaLinha";
      for (let i = 1; i < 6; i++) {
        var p = document.createElement("p");
        p.className = "novaLinha";
        p.textContent = dadosDeAcesso[index][i];
        div.appendChild(p);
      }
      document.getElementsByClassName("pico")[0].appendChild(div);
    }
  }}
}
