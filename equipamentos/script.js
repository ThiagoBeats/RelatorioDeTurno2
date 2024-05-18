var dados = "";

document.addEventListener("DOMContentLoaded", handleFile, false);

function handleFile() {
  var filePath = "../Equipamentos.xlsx";
  var urlPlanilha2 =
    "https://1drv.ms/x/s!AnZLoHsTfdi1gdptKBaz0IMoy-1tLg?e=SXAidX";
  var urlPlanilha =
    "https://docs.google.com/spreadsheets/d/1I2bW6DAkHR5oHLo-YvuDrwIxU7BYdJ0FLpaNUllZ2FA/edit?usp=sharing";
  var xhr = new XMLHttpRequest();
  xhr.open("GET", filePath, true);
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
  var texto = document.getElementById("texto");
  texto.innerText += " .";
  if (texto.innerText.length > 40) {
    texto.innerText = "Carregando planilha";
  }
}

//Verifica se a tabela de dados tem tamanho maior que 10, se não, é que ela não foi carregada completamente
//ai, a requisição é feita novamente
function verificarDados(params) {
  console.log(dados.length);
  if (dados.length < 10) {
    var header = document.getElementById("mainDiv");
    header.style.display = "none";
    var header = document.getElementById("texto");
    header.style.display = "block";
    handleFile();
    setTimeout(verificarDados, 50);
  } else {
    var header = document.getElementById("mainDiv");
    header.style.display = "flex";
    var header = document.getElementById("texto");
    header.style.display = "none";
  }
}

//Executa a função depois de 50ms
setTimeout(verificarDados, 50);

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
    if (typeof dados[index][1] != "undefined") {
      if (
        dados[index][1]
          .toUpperCase()
          .replace(/-/g, "")
          .includes(tagToFind.toUpperCase().replace(/-/g, "").trim())
      ) {
        contagem += 1;
        textOutput =
          dados[index][0] +
          "  -  Tag: " +
          dados[index][1] +
          "  -  PLC: " +
          dados[index][2] +
          "  -  Localidade: " +
          dados[index][3];
        if (typeof dados[index][4] != "undefined") {
          textOutput +=
            "  -  " + dados[index][4].toLowerCase() + "\n\n";
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
}

function busca2() {
  excluirParagrafos();
  var contagem = 0;
  var tagToFind = document.getElementById("tagInput").value;
  for (let index = 0; index < dados.length; index++) {
    if (typeof dados[index][2] != "undefined") {
      if (
        dados[index][2]
          .toUpperCase()
          .replace(/-/g, "")
          .includes(tagToFind.toUpperCase().replace(/-/g, "").trim())
      ) {
        contagem += 1;

        var head = document.createElement("div");
        head.className = 'head'
        for (let index2 = 0; index2 < 6; index2++) {
          var paragr = document.createElement("p");
          paragr.textContent = dados[index][index2];
          paragr.id = "paragr";
          paragr.className = "paragr";
          head.appendChild(paragr);
        }
        document.getElementById("informations").appendChild(head);
      }
    }
  }
  document.getElementById("results").innerHTML =
    contagem + " Resultados encontrados";
}
