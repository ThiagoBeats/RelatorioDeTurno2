document.addEventListener("DOMContentLoaded", handleFile, false);
var dados = "";
function handleFile() {
  var input = document.getElementById("input");
  var filePath = "../recursos/DadosPico.xlsx";

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
}
function busca() {
    var contagem = 0;
  var tagToFind = document.getElementById("tagInput").value;
  var textOutput = "";
  for (let index = 0; index < dados.length; index++) {
    if (typeof dados[index][1] != "undefined") {
      if (dados[index][1].toUpperCase().includes(tagToFind.toUpperCase())) {
        contagem += 1
        textOutput +=
          "U.O: " +
          dados[index][0] +
          " | Tag: " +
          dados[index][1] +
          " | PLC: " +
          dados[index][2] +
          " | Localidade: " +
          dados[index][3] +
          " | Comentários: " +
          dados[index][4] + "\n\n"
      }
    }
  }
  document.getElementById("results").innerHTML = contagem + " Resultados encontrados"
  document.getElementById("return").value = textOutput;
}
