const socket = io();

const chatForm = document.getElementById("chatForm")
const msgAuthor = document.getElementById("author")
const msgEmail = document.getElementById("email")
const msgText = document.getElementById("message")
const chatBox = document.getElementById("chatBox")


window.addEventListener("load", () => {

    socket.emit("load messages")
})

socket.on("allMessages", async message => {
    chatBox.textContent = ''
    message.forEach(message => {
        let date = new Date(message.date)
        const dateOpts = {
            year: 'numeric', month: 'numeric', day: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric',
            hour12: false
        }
        chatBox.textContent += `[${new Intl.DateTimeFormat('es-AR', dateOpts).format(date)}] ${message.name} (${message.email}): ${message.message}\n`
    })
})

messageForm.addEventListener("submit", (e)=>{
    e.preventDefault();

    if (msgAuthor.value && msgEmail.value && msgText.value) {
        const newMessage = {
            author: msgAuthor.value,
            email: msgEmail.value,
            message: msgText.value
        }
        socket.emit("message", newMessage)
        msgText.value = ""
        scrollDown()
    } else {
        alert("Por favor completar todos los campos.")
    }
    
});

function scrollDown() {
    chatBox.scrollTop = chatBox.scrollHeight
}