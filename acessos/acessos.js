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
/*
document.addEventListener("DOMContentLoaded", handleFile, false);
var dadosDeAcesso = "";
function handleFile() {
  var input = document.getElementById("input");
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
}
*/
var dadosDeAcesso = "";
var filePath = "../Acessos.xlsx";
var urlPlanilha = "https://docs.google.com/spreadsheets/d/1SAhRFohoxuAP-BS5waSTHa7R2YWQ4OdGjQxoVBi4nNQ/edit?usp=sharing"
var xhr = new XMLHttpRequest();
xhr.open("GET", urlPlanilha, true);
xhr.responseType = "arraybuffer";

xhr.onload = function (e) {
  var arraybuffer = xhr.response;
  var data = new Uint8Array(arraybuffer);
  var workbook = XLSX.read(data, { type: "array" });
  console.log(workbook.SheetNames)
  var nomeDaPagina = "Sheet2";
  workbook.SheetNames.forEach(function (nomeDaPagina) {
    var worksheet = workbook.Sheets[nomeDaPagina];
    var jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    dadosDeAcesso = jsonData;

    // Faça o que desejar com os dados da planilha
  });
};
xhr.send();

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

  for (let index = 1; index < dadosDeAcesso.length; index++) {
    if (
      dadosDeAcesso[index][1].toUpperCase().trim() == "TFA".toUpperCase().trim()
    ) {
      var div = document.createElement("div");

      div.className = "head novaLinha";
      for (let i = 2; i < 7; i++) {
        var p = document.createElement("p");
        p.className = "novaLinha";
        p.textContent = dadosDeAcesso[index][i];
        div.appendChild(p);
      }
      document.getElementsByClassName("tfa")[0].appendChild(div);
    }

    if (
      dadosDeAcesso[index][1].toUpperCase().trim() ==
      "Pico".toUpperCase().trim()
    ) {
      var div = document.createElement("div");

      div.className = "head novaLinha";
      for (let i = 2; i < 7; i++) {
        var p = document.createElement("p");
        p.className = "novaLinha";
        p.textContent = dadosDeAcesso[index][i];
        div.appendChild(p);
      }
      document.getElementsByClassName("pico")[0].appendChild(div);
    }
  }
}
