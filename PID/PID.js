function atualizar() {
  controle.innerText = funcao(15); //Preenche o campo Controle
  var campo = document.getElementsByTagName("td");
  for (let index = 0; index < campo.length; index++) {
    if (index % 2 == 0 && array2[index / 2] != 0) {
      campo[index].innerText = funcao(array2[index / 2]);
    } else {
      campo[index].innerText = funcao3(array2[parseInt(index / 2)]);
      if ((index >= 11) & (index <= 17)) {
        campo[index].innerText = funcao4((index - 11) / 2);
      }
    }
    
  }
  campo[16].innerText = "---"
  campo[24].innerText += ".0";
  campo[26].innerText += ".1";
  campo[28].innerText += ".2";
  campo[30].innerText += ".8";
  campo[32].innerText += ".9";
  campo[34].innerText += ".10";
  campo[25].innerText += ".0";
  campo[27].innerText += ".1";
  campo[29].innerText += ".2";
  campo[31].innerText += ".8";
  campo[33].innerText += ".9";
  campo[35].innerText += ".10";
}

function clp(clp, indice) {
  if (clp == "Planta" || clp == "Flotacao") {
    return indice <= 25;
  } else {
    return indice <= 50;
  }
}

function funcao(param) {
  var indice = document.getElementById("indice");
  var PLC = document.getElementById("PLC");

  if (clp(PLC.value, indice.value)) {
    if (PLC.value == "Flotacao") {
      return "N66[" + parseInt((indice.value - 1) * 40 + param) + "]";
    } else {
      return "N71[" + parseInt((indice.value - 1) * 40 + param) + "]";
    }
  } else {
    if (PLC.value == "Flotacao") {
      if (PLC.value == "Planta" || PLC.value == "Flotacao") {
        return "N67[" + parseInt((indice.value - 26) * 40 + param) + "]";
      } else {
        return "N67[" + parseInt((indice.value - 51) * 40 + param) + "]";
      }
    } else {
      if (PLC.value == "Planta" || PLC.value == "Flotacao") {
        return "N72[" + parseInt((indice.value - 26) * 40 + param) + "]";
      } else {
        return "N72[" + parseInt((indice.value - 51) * 40 + param) + "]";
      }
    }
  }
}

var array2 = [8, 7, 18, 19, 20, 11, 17, 13, 0, 3, 5, 14, 9, 9, 9, 10, 10, 10];

function funcao3(param) {
  var retorno = "";
  if (clp(PLC.value, indice.value)) {
    if (PLC.value == "SBR") {
      retorno += "SBR_5000.";
    } else {
      retorno += "ITM-D_5000.";
    }

    retorno += PLC.value;
    if (PLC.value == "Flotacao") {
      retorno += ".N66[";
    } else {
      retorno += ".N71[";
    }
    retorno += parseInt((indice.value - 1) * 40 + param) + "]";
  } else {
    if (PLC.value == "SBR") {
      retorno += "SBR_5000.";
    } else {
      retorno += "ITM-D_5000.";
    }
    retorno += PLC.value;
    if (PLC.value == "Flotacao") {
      retorno += ".N67[";
    } else {
      retorno += ".N72[";
    }
    if (PLC.value == "Planta" || PLC.value == "Flotacao") {
      retorno += (indice.value - 26) * 40 + param + "]";
    } else {
      retorno += (indice.value - 51) * 40 + param + "]";
    }
  }
  return retorno;
}

function funcao4(param) {
  retorno = "";
  if (PLC.value == "SBR") {
    retorno += "SBR_5000.";
  } else {
    retorno += "ITM-D_5000.";
  }
  retorno +=
    PLC.value + ".F211[" + parseInt((indice.value - 1) * 4 + param) + "]";

  return retorno
}
