//Front
const socket = io()

// const botonChat = document.getElementById("botonChat");
// const parrafosMensajes = document.getElementById("parrafosMensajes")
// const val = document.getElementById("chatBox")

// let user
// Swal.fire({
//     title: "Identificación de Usuario",
//     text: "Por favor ingrese su nombre de usuario",
//     input: "text",
//     inputValidator: (valor) => {
//         return !valor && 'Ingrese un valor válido'
//     },
//     allowOutsideClick: false
// }).then(resultado => {
//     user = resultado.value
// })

//Envíamos el mensaje al servidor
// botonChat.addEventListener("click", ()=>{
//     console.log(val)
//     if(val.value.trim().length > 0) {
//         socket.emit("mensaje", {usuario: user, mensaje: val.value})
//         val.value = "" //Limpiar el input

//     }
// })

const form = document.getElementById(idForm)
form.addEventListener('submit', (e) => {
    e.preventDefault()
    //CONSULTO DATOS DEL FORMULARIO
    socket.emit("newProduct", [{}]) //Enviar informacion a mi servidor
})

const realTimeProducts = document.getElementById("realTimeProducts")


//Retornamos el mensaje
socket.on("products", arrayProducts => {
    realTimeProducts.innerHTML = "" //Limpio mensajes
    arrayProducts.forEach(product => {
        realTimeProducts.innerHTML += `<div>
            <p>Id: ${this.id}</p>
            <p>Title: ${this.title}</p>
            <p>Description: ${this.description}</p>
            <p>Price: ${this.price}</p>
            <p>Code: ${this.code}</p>
            <p>Stock: ${this.stock}</p>
            <p>Category: ${this.category}</p>
            <p>Status: ${this.status}</p>
            <p>Thumbnail: ${this.thumbnail}</p>
        </div>`
    });
})