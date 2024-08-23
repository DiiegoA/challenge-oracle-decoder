// Este código se ejecuta cuando la página se ha cargado completamente
window.onload = function () {
  // Obtener elementos del DOM
  const inputTexto = document.getElementById("texto-input"); // Textarea para entrada de texto
  const btnEncriptar = document.getElementById("btn-encriptar"); // Botón de encriptar
  const btnDesencriptar = document.getElementById("btn-desencriptar"); // Botón de desencriptar
  const btnCopiar = document.getElementById("btn-copiar"); // Botón de copiar
  const btnLimpiar = document.getElementById("btn-limpiar"); // Botón de limpiar
  const resultado = document.getElementById("resultado"); // Div para mostrar el resultado

  // Definir llaves de encriptación
  const llaves = { e: "enter", i: "imes", a: "ai", o: "ober", u: "ufat" };

  // Función para encriptar el texto
  const encriptar = (texto) =>
    texto.replace(/[eiaou]/g, (letra) => llaves[letra]);

  // Función para verificar si el texto está encriptado
  const estaEncriptado = (texto) => {
    return /enter|imes|ai|ober|ufat/.test(texto);
  };

  // Función para desencriptar el texto
  const desencriptar = (texto) => {
    if (!estaEncriptado(texto)) {
      return texto;
    }
    return texto.replace(/enter|imes|ai|ober|ufat/g, (palabra) => {
      return (
        Object.keys(llaves).find((key) => llaves[key] === palabra) || palabra
      );
    });
  };

  // Función para mostrar el resultado
  const mostrarResultado = (texto) => {
    resultado.innerHTML = `<p>${texto}</p>`; // Insertar el texto en el div de resultado
    btnCopiar.classList.remove("oculto"); // Mostrar el botón de copiar
  };

  // Función para validar el texto de entrada
  const validarTexto = (texto) => {
    // Verificar si hay mayúsculas
    if (texto.toLowerCase() !== texto) {
      alert("Solo se permiten letras minúsculas. Por favor, revise su texto.");
      return false;
    }
    // Verificar si hay caracteres no permitidos
    if (!/^[a-z\s]*$/.test(texto)) {
      alert("No se permiten acentos ni caracteres especiales.");
      return false;
    }
    return true;
  };

  // Función para mostrar un mensaje temporal
  const mostrarMensajeTemporal = (mensaje, duracion) => {
    const mensajeElement = document.createElement("div"); // Crear un nuevo elemento div
    Object.assign(mensajeElement.style, {
      // Asignar estilos al elemento
      position: "fixed",
      bottom: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      color: "white",
      padding: "10px 20px",
      borderRadius: "5px",
      zIndex: "1000",
    });
    mensajeElement.textContent = mensaje; // Establecer el texto del mensaje
    document.body.appendChild(mensajeElement); // Añadir el mensaje al body
    setTimeout(() => document.body.removeChild(mensajeElement), duracion); // Eliminar el mensaje después de la duración especificada
  };

  // Evento de clic en el botón de encriptar
  btnEncriptar.onclick = () => {
    const texto = inputTexto.value; // Obtener el texto sin convertirlo a minúsculas
    if (validarTexto(texto)) {
      // Validar el texto
      mostrarResultado(encriptar(texto)); // Encriptar y mostrar el resultado
    }
  };

  // Evento de clic en el botón de desencriptar
  btnDesencriptar.onclick = () => {
    const texto = inputTexto.value; // Obtener el texto
    if (estaEncriptado(texto)) {
      mostrarResultado(desencriptar(texto)); // Desencriptar y mostrar el resultado
    } else {
      alert(
        "El texto no parece estar encriptado. Por favor, ingrese un texto encriptado."
      );
    }
  };

  // Evento de clic en el botón de copiar
  btnCopiar.onclick = () => {
    const texto = resultado.querySelector("p").textContent; // Obtener el texto del resultado
    navigator.clipboard
      .writeText(texto) // Copiar el texto al portapapeles
      .then(() =>
        mostrarMensajeTemporal("Texto copiado al portapapeles!", 2000)
      ) // Mostrar mensaje de éxito
      .catch((err) => {
        console.error("Error al copiar texto: ", err); // Registrar error en la consola
        mostrarMensajeTemporal("No se pudo copiar el texto", 2000); // Mostrar mensaje de error
      });
  };

  // Evento de clic en el botón de limpiar
  btnLimpiar.onclick = () => {
    inputTexto.value = ""; // Limpiar el texto de entrada
    resultado.innerHTML = ""; // Limpiar el resultado
    btnCopiar.classList.add("oculto"); // Ocultar el botón de copiar
    mostrarMensajeTemporal("Texto limpiado", 2000); // Mostrar mensaje de confirmación
  };
};
