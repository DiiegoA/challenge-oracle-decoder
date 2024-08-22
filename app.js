// Este código se ejecuta cuando la página se ha cargado completamente
window.onload = function () {
  // Obtenemos el elemento del textarea donde el usuario ingresa el texto
  var inputTexto = document.getElementById("texto-input");

  // Obtenemos los botones de encriptar, desencriptar, copiar y limpiar
  var btnEncriptar = document.getElementById("btn-encriptar");
  var btnDesencriptar = document.getElementById("btn-desencriptar");
  var btnCopiar = document.getElementById("btn-copiar");
  var btnLimpiar = document.getElementById("btn-limpiar");

  // Obtenemos el div donde se mostrará el resultado
  var resultado = document.getElementById("resultado");

  // Definimos las llaves de encriptación en un objeto
  var llaves = {
    e: "enter",
    i: "imes",
    a: "ai",
    o: "ober",
    u: "ufat",
  };

  // Función para encriptar el texto
  function encriptar(texto) {
    return texto.replace(/[eiaou]/g, function (letra) {
      return llaves[letra];
    });
  }

  // Función para desencriptar el texto
  function desencriptar(texto) {
    return texto.replace(/enter|imes|ai|ober|ufat/g, function (palabra) {
      for (var key in llaves) {
        if (llaves[key] === palabra) {
          return key;
        }
      }
    });
  }

  // Función para mostrar el resultado en el div correspondiente
  function mostrarResultado(texto) {
    resultado.innerHTML = "<p>" + texto + "</p>";
    btnCopiar.classList.remove("oculto");
  }

  // Evento cuando se hace clic en el botón de encriptar
  btnEncriptar.onclick = function () {
    var textoOriginal = inputTexto.value;
    var texto = textoOriginal.toLowerCase();

    // Verificar si hay mayúsculas en el texto original
    if (textoOriginal !== texto) {
      alert("Solo se permiten letras minúsculas. Por favor, revise su texto.");
      return;
    }

    // Verificar si hay caracteres no permitidos
    if (!/^[a-z\s]*$/.test(texto)) {
      alert("No se permiten acentos ni caracteres especiales.");
      return;
    }

    var textoEncriptado = encriptar(texto);
    mostrarResultado(textoEncriptado);
  };

  // Evento cuando se hace clic en el botón de desencriptar
  btnDesencriptar.onclick = function () {
    var texto = inputTexto.value;
    var textoDesencriptado = desencriptar(texto);
    mostrarResultado(textoDesencriptado);
  };

  // Función para mostrar un mensaje temporal
  function mostrarMensajeTemporal(mensaje, duracion) {
    var mensajeElement = document.createElement("div");
    mensajeElement.textContent = mensaje;
    mensajeElement.style.position = "fixed";
    mensajeElement.style.bottom = "20px";
    mensajeElement.style.left = "50%";
    mensajeElement.style.transform = "translateX(-50%)";
    mensajeElement.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    mensajeElement.style.color = "white";
    mensajeElement.style.padding = "10px 20px";
    mensajeElement.style.borderRadius = "5px";
    mensajeElement.style.zIndex = "1000";

    document.body.appendChild(mensajeElement);

    setTimeout(function () {
      document.body.removeChild(mensajeElement);
    }, duracion);
  }

  // Evento cuando se hace clic en el botón de copiar
  btnCopiar.onclick = function () {
    var texto = resultado.querySelector("p").textContent;
    navigator.clipboard
      .writeText(texto)
      .then(function () {
        mostrarMensajeTemporal("Texto copiado al portapapeles!", 2000);
      })
      .catch(function (err) {
        console.error("Error al copiar texto: ", err);
        mostrarMensajeTemporal("No se pudo copiar el texto", 2000);
      });
  };

  // Evento cuando se hace clic en el botón de limpiar
  btnLimpiar.onclick = function () {
    inputTexto.value = "";
    resultado.innerHTML = "";
    btnCopiar.classList.add("oculto");
    mostrarMensajeTemporal("Texto limpiado", 2000);
  };
};
