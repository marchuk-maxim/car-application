const express = require("express")
const {Car} = require("./../models/car")
const router = express.Router()

router.get("/car", async (req, res) => {
    res.render("cars.hbs")
})

router.get("/cars", async (req, res) => {
    try {
        const cars = await Car.find()
        res.status(200).send({cars});
    } catch(error) {
        res.status(401).send(error.message);
    }
})

router.get("/cars/:id", async (req, res) => {
    try{
        let car = await Car.findById(req.params.id);
        res.status(200).send(car);
    } catch(error) {
        res.send(error.message);
    }
})

router.post("/cars", async (req, res) => {
    try {
        const car = new Car(req.body.car)
        await car.save()
        res.status(201).send(car)
    } catch (error) {
        res.status(401).send(error.message)
    }
})

router.put('/cars', async (req, res) => {
    try {
        const car = await Car.findById(req.body.id);
        if (!car) {
            return res.status(404).send();
        }
        if (req.body.car.name) {
            car.name = req.body.car.name;
        }
        if (req.body.car.model) {
            car.model = req.body.car.model;
        }
        await car.save();
        res.status(200).send(car);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.delete('/cars/:id', async (req, res) => {
    try {
        const car = await Car.findByIdAndDelete(req.params.id);
        if (!car) {
            return res.status(404).send();
        }
        res.status(200).send(car);
    } catch (error) {
        res.status(400).send(error.message);
    }
});


module.exports = router;