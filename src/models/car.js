const mongoose = require("mongoose")
const carSchema = new mongoose.Schema({
    name: String,
    model: String
})

const Car = mongoose.model('Car', carSchema)
module.exports.Car = Car