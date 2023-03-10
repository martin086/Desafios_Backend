const socket = io();

const chatForm = document.getElementById("chatForm")
const msgAuthor = document.getElementById("author")
const email = document.getElementById("email")
const msgText = document.getElementById("message")

socket.on("allMessages", (data)=>{
    renderData(data)
})

renderData = async (data) => {
    document.getElementById("messages").innerHTML = "";
    await data.map(message=>{
        document.getElementById("messages").innerHTML += 
        `
        <div>
            ${message.author} <${message.email}>: ${message.message}
        </div>
        `
    }) 
}

messageForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const newMessage = {
        author: msgAuthor.value,
        email: email.value,
        message: msgText.value
    }
    msgAuthor.value = ""
    email.value = ""
    msgText.value = ""
    socket.emit("message", newMessage)
});