/*
document.addEventListener("DOMContentLoaded", handleFile, false);
var dados = "";
function handleFile() {
  var input = document.getElementById("input");
  var filePath = "../DadosPico.xlsx";

  var xhr = new XMLHttpRequest();
  xhr.open("GET", filePath, true);
  xhr.responseType = "arraybuffer";

  xhr.onload = function (e) {
    var data = new Uint8Array(xhr.response);
    var workbook = XLSX.read(data, { type: "array" });

    workbook.SheetNames.forEach(function (sheetName) {
      var worksheet = workbook.Sheets[sheetName];
      var jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      //console.log('Sheet Name:', sheetName);
      //console.log('Sheet Data:', jsonData);
      dados = jsonData;

      // Faça o que desejar com os dados da planilha
    });
  };

  xhr.send();
}*/

var dados = "";

document.addEventListener("DOMContentLoaded", handleFile, false);

function handleFile() {
  var filePath = "../DadosPico.xlsx";
  var urlPlanilha2 =
    "https://1drv.ms/x/s!AnZLoHsTfdi1gdptKBaz0IMoy-1tLg?e=SXAidX";
  var urlPlanilha =
    "https://docs.google.com/spreadsheets/d/1I2bW6DAkHR5oHLo-YvuDrwIxU7BYdJ0FLpaNUllZ2FA/edit?usp=sharing";
  var xhr = new XMLHttpRequest();
  xhr.open("GET", urlPlanilha, true);
  xhr.responseType = "arraybuffer";

  xhr.onload = function (e) {
    var arraybuffer = xhr.response;
    var data = new Uint8Array(arraybuffer);
    var workbook = XLSX.read(data, { type: "array" });
    var nomeDaPagina = "Sheet2";
    workbook.SheetNames.forEach(function (nomeDaPagina) {
      var worksheet = workbook.Sheets[nomeDaPagina];
      var jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      dados = jsonData;

      // Faça o que desejar com os dados da planilha
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
  console.log(dados.length);
  if (dados.length < 10) {
    var header = document.getElementById("mainDiv")
    header.style.display = "none"
    var header = document.getElementById("texto")
    header.style.display = "block"
    handleFile()
    setTimeout(verificarDados, 200);
  }else{
    var header = document.getElementById("mainDiv")
    header.style.display = "flex"
    var header = document.getElementById("texto")
    header.style.display = "none"
  }
}

setTimeout(verificarDados, 200);

function excluirParagrafos() {
  var paragrafos = document.getElementsByClassName("paragr");
  // Verificar se há parágrafos antes de tentar removê-los
  if (paragrafos.length > 0) {
    for (var i = paragrafos.length - 1; i >= 0; i--) {
      var paragrafo = paragrafos[i];
      paragrafo.remove();
    }
  }
}

function busca() {
  excluirParagrafos();
  var contagem = 0;
  var tagToFind = document.getElementById("tagInput").value;
  var textOutput = "";
  var color = "lightgray";
  for (let index = 0; index < dados.length; index++) {
    if (typeof dados[index][2] != "undefined") {
      if (
        dados[index][2]
          .toUpperCase()
          .replace(/-/g, "")
          .includes(tagToFind.toUpperCase().replace(/-/g, "").trim())
      ) {
        contagem += 1;
        textOutput =
          dados[index][0] +
          " - " +
          dados[index][1] +
          "  -  Tag: " +
          dados[index][2] +
          "  -  PLC: " +
          dados[index][3] +
          "  -  Localidade: " +
          dados[index][4];
        if (typeof dados[index][5] != "undefined") {
          textOutput +=
            "  -    Comentários: " + dados[index][5].toLowerCase() + "\n\n";
        }
        var paragr = document.createElement("p");
        paragr.textContent = textOutput;
        paragr.style.backgroundColor = color;
        if (color == "lightgray") {
          color = "white";
        } else {
          color = "lightgray";
        }
        paragr.id = "paragr";
        paragr.className = "paragr";
        document.getElementById("informations").appendChild(paragr);
      }
    }
  }
  document.getElementById("results").innerHTML =
    contagem + " Resultados encontrados";
  //document.getElementById("return").value = textOutput;
}
