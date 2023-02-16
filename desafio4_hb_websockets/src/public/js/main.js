//Front
const socket = io()
/*
socket.emit("mensaje", [{user:"Martin", mensaje: "Hola"}]) //Enviar informacion a mi servidor

socket.on("mensaje-general", info => {
    console.log(info)
})

socket.on("mensaje-socket-propio", info => {
    console.log(info)
})
*/

const botonChat = document.getElementById("botonChat");
const parrafosMensajes = document.getElementById("parrafosMensajes")
const val = document.getElementById("chatBox")

let = user
Swal.fire({
    title: "Identificación de Usuario",
    text: "Por favor ingrese su nombre de usuario",
    input: "text",
    inputValidator: (valor) => {
        return !valor && 'Ingrese un valor válido'
    },
    allowOutsideClick: false
}).then(resultado => {
    user = resultado.value
})

//Envíamos el mensaje al servidor
botonChat.addEventListener("click", ()=>{
    console.log(val)
    if(val.value.trim().length > 0) {
        socket.emit("mensaje", {usuario: user, mensaje: val.value})
        val.value = "" //Limpiar el input

    }
})

//Retornamos el mensaje
socket.on("mensajes", arrayMensajes => {
    parrafosMensajes.innerHTML = "" //Limpio mensajes
    arrayMensajes.forEach(mensaje => {
        parrafosMensajes.innerHTML += `<p>${mensaje.usuario} : ${mensaje.mensaje}</p>`
    });
})


