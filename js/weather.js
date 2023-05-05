const API_KEY = "f1e41a9bc37b0bba2e8354d30a033ea5"



function onGeoOk(position){
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    fetch(url).then(response => response.json()).then(data => {
        const weatherContainer = document.querySelector("#weather span:first-child")
        const cityContainer = document.querySelector("#weather span:last-child")
        const name = data.name;
        const weather = data.weather[0].main;
        weatherContainer.innerText = `${weather}/ ${data.main.temp}`
        cityContainer.innerText = name
})
}
function onGeoError() {
    alert("Can't find you. No weather for you.")
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError)