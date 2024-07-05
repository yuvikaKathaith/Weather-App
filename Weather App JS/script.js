const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const wind_speed = document.getElementById('wind-speed');
const humidity = document.getElementById('humidity');

const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

async function checkWeather(city){
    const api_key = "4a26a084095852b9c526460ebf0e8d5b";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    if(data.cod === '404'){
        location_not_found.style.display = 'flex';
        weather_body.style.display = 'none';
        console.log('error');
        return;
    }
    location_not_found.style.display = 'none';
    weather_body.style.display = 'flex';
    temperature.innerHTML = `${Math.round(data.main.temp - 273.15)}°C`;
    description.innerHTML = `${data.weather[0].description}`;
    humidity.innerHTML = `${data.main.humidity}%`;
    wind_speed.innerHTML = `${data.wind.speed}Km/H`;

    switch (data.weather[0].main){
        case 'Clouds':
            weather_img.src = "/assets/cloud.png";
            break;
        case 'Snow':
            weather_img.src = "/assets/snow.png";
            break;
        case 'Mist':
            weather_img.src = "/assets/mist.png";
            break;       
        case 'Rain':
            weather_img.src = "/assets/rain.png";
            break;
        case 'Clear':
            weather_img.src = "/assets/clear.png";
            break;
    }
}

searchBtn.addEventListener('click', function(){
    checkWeather(inputBox.value);
})
