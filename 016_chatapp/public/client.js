const socket = io();

var name;

do {
    name = prompt("enter username")
} while (!name);


const textarea = document.querySelector("#textarea")
const message_area = document.querySelector(".message_area")

textarea.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {

        
        message(e.target.value)

    }
})

function message(msg) {

    var data = {
        user: name,
        message: msg
    }
    socket.emit('message', data)
    appendmsg(data, 'outgoing')
    textarea.value = ""
}

function appendmsg(msg, type) {

    const maindiv = document.createElement("div")
    maindiv.classList.add(type, 'message')
    var content = "<h4>" + msg.user + "</h4><p>" + msg.message + "</p>"
    message_area.appendChild(maindiv).innerHTML = content
}

//socket
socket.on('message', (msg) => {
    appendmsg(msg, 'incoming')
})
