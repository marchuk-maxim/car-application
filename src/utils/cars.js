const cars = []

const addCar = ({ id, name, model }) => {
    var image = (cars.length != 0) ? (cars[cars.length - 1].image + 1) % 9 : 0
    if (cars.findIndex((car) => car.id === id) == -1) {
        cars.push({ id, name, model, image })
    }
}

const removeCar = (id) => {
    var car = null;
    while(cars.findIndex((car) => car.id === id) !== -1) {
        const index = cars.findIndex((car) => car.id === id)
        car = cars.splice(index, 1)[0];
    }
    return car
}

const getCar = (id) => {
    return cars.find((car) => car.id === id)
}

const getCars = () => {
    return cars
}

module.exports = {
    addCar,
    removeCar,
    getCar,
    getCars
}