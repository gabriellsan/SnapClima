//Interação
const citySearchInput = document.getElementById('city-search-input');
const citySearchButtom = document.getElementById('city-search-buttom');

//exibição
const currentDate = document.getElementById('current-date');
const cityName = document.getElementById('city-name');
const weatherIcon = document.getElementById('weather-icon');
const weatherDescription = document.getElementById('weather-description');
const currentTemperature = document.getElementById('current-temperature');
const windSpeed = document.getElementById('wind-speed');
const feelsLIkeTemperature = document.getElementById('feels-like-temperature');
const currentHumidity = document.getElementById('current-humidity');
const sunriseTime = document.getElementById('sunrise-time');
const sunsetTime = document.getElementById('sunset-time');

const api_key = "0f1f609cb8d4a0df013d968a4f510e1a";

citySearchButtom.addEventListener("click", () =>{
    let cityName = citySearchInput.value
    getCityWeather(cityName)
})

//https:api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${api_key}

navigator.geolocation.getCurrentPosition(
    (position) => {
        let lat = position.coords.latitude
        let lon = position.coords.longitude

        getCurrentLocationWeather(lat, lon )
    },
    (err) => {
        if (err.code === 1) {
            alert("Geolocalizçaõ negada pelo usuario")
        }else{
            console.log(err)
        }
    }
)

function getCurrentLocationWeather(lat , lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${api_key}`)
        .then((response) => response.json())
        .then((data) => displayWeather(data))
}

function getCityWeather(cityName) {

    weatherIcon.src = `./assets/loading-icon.svg `

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=pt_br&appid=${api_key}`)
        .then((response) => response.json())
        .then((data) => displayWeather(data))
}

function displayWeather(data) {
    let {
        dt,
        name,
        weather: [{ icon, description }],
        main: { temp , feels_like, humidity },
        wind: { speed },
        sys: { sunrise, sunset },
        } = data
        
        currentDate.textContent = formatDate(dt);
        cityName.textContent = name;
        weatherIcon.src = `./assets/${icon}.svg `
        weatherDescription.textContent = description;
        currentTemperature.textContent = `${Math.round(temp)}ºC`;
        windSpeed.textContent = `${Math.round(speed * 3.6)}Km/H`;
        feelsLIkeTemperature.textContent = `${Math.round(feels_like)}ºC`;
        currentHumidity.textContent = `${humidity}%`;
        sunriseTime.textContent = formatTime(sunrise);
        sunsetTime.textContent = formatTime(sunset);
}

function formatDate(epochTime) {
    let date = new Date(epochTime * 1000)
    let formattedDate = date.toLocaleDateString('pt-BR', {month: "long", day: 'numeric'})
    return `Hoje, ${formattedDate}`
    
}

function formatTime(epochTime) {
    let date = new Date(epochTime * 1000)
    let hours = date.getHours()
    let minutes = date.getMinutes()
    return `${hours}:${minutes}`
}