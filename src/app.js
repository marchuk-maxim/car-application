const path = require('path')
const http = require('http')
const express = require('express')
const hbs = require('hbs')

const {connectDB} = require("./helpers/db.js")
const {port} = require("./configuration")

const {Car} = require("./models/car")
const carRouter = require('./routers/car')
const socketio = require('socket.io')
const { generateMessage } = require('./utils/messages')
const { addCar, removeCar, getCar, getCars } = require('./utils/cars')

const app = express()

const server = http.createServer(app)
const io = socketio(server)

app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, '../public')))
app.use(express.json())
app.use(carRouter)

io.on('connection', (socket) => {
    console.log('New WebSocket connection')

    socket.on('join', async (id, callback) => {
        const car = await Car.findById(id)
        addCar(car)
        io.emit('message', generateMessage(car, `${car.name} has joined!`, 'success'))
        io.emit('data', {
            cars: getCars()
        })
        callback()
    })

    socket.on('left', (id, callback) => {
        const car = removeCar(id)

        if (car) {
            io.emit('message', generateMessage(car, `${car.name} has left!`, 'warning'))
            io.emit('data', {
                cars: getCars()
            })
        }
        callback()
    })

    socket.on('sendMessage', (id, callback) => {
        const car = getCar(id)
        io.emit('message', generateMessage(car, `${car.name} Something wrong with your car`, 'danger'))
        callback()
    })
})



function startServer() {
    server.listen(port, () => {
        console.log(`Server is listening on ${port}`)
    })
}

connectDB()
    .on('error', console.error.bind(console, 'connection error:'))
    .once("open", startServer)