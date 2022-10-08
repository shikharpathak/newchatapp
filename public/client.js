const socket = io()

let name;

let textarea = document.querySelector('#textarea')

let messageArea = document.querySelector('.message__area')

do {
    name = prompt("Please enter your name: ")
}while(!name)

textarea.addEventListener('keyup', (e)=>{
if(e.key === 'Enter'){
    sendmessage(e.target.value)
    e.target.value=""
}
})

function sendmessage(message){
    let msg = {
        user: name,
        message: message.trim()
    }
    //append
    appendMessage(msg,'outgoing')
    textarea.value = ''
    scrollToBottom()

    //Send to Server

    socket.emit('message', msg)
}

function appendMessage(msg, type){
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv. classList.add(className, 'message')
    // if(type==='outgoing') msg.user= 'you'
    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>`
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

//Recieve message

socket.on('message', (msg)=>{
appendMessage(msg, 'incoming')
scrollToBottom()
})

function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}