const apiKey = `11ad22516346b4e8d539fa83c8dd81e6`;
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric`;

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(cityName) {
    const response = await fetch(`${apiUrl}&q=${cityName}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        const data = await response.json();
        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "℃";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display="none";
        
        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "image/clouds.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "image/clear.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "image/rain.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "image/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "image/mist.png";
        }
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
