const socket = io()

// Elements
const $messages = document.querySelector('#messages')

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML




socket.on('message', (message) => {
    console.log(message)
    const html = Mustache.render(messageTemplate, {
        car_name: message.car.name,
        car_model: message.car.model,
        message: message.text,
        type: message.type,
        createdAt: moment(message.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('afterbegin', html)
})


socket.on('data', ({ cars }) => {
    const html = Mustache.render(sidebarTemplate, {
        cars
    })
    document.querySelector('#sidebar').innerHTML = html
})




