const images = [
    "img-0",
    "img-1",
    "img-2"
]

const chosenImage = images[Math.floor(Math.random() * images.length)];
const bgImage = document.getElementById("bgImage")
bgImage.className = chosenImage
