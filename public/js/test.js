const socket = io()

// Templates
const carsTemplate = document.querySelector('#cars-template').innerHTML

socket.on('data', ({ cars }) => {
    const html = Mustache.render(carsTemplate, {
        cars
    })
    document.querySelector('#cars').innerHTML = html
})


$("body").on("click", ".pushCar", function() {
    let id = $(this).data("id");
    this.classList.add("animated", "swing");
    this.addEventListener("animationend", animationEndHandler);

    socket.emit('sendMessage', id, (error) => {

        if (error) {
            return console.log(error)
        }

        console.log('Message delivered!')
    })
});

function animationEndHandler() {
    this.classList.remove("animated", "swing");
}




