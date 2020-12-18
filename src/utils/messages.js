const generateMessage = (car, text, type) => {
    return {
        car,
        text,
        type,
        createdAt: new Date().getTime()
    }
}

module.exports = {
    generateMessage
}