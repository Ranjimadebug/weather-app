"use strict";

const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?&appid=616181448a3f781062d2d188c45a73bc&units=metric";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const imageChange = document.querySelector(".weather-icon");

async function checkWeather(city) {
  var res = await fetch(apiUrl + `&q=${city}`);
  if (res.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    var data = await res.json();
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML =
      Math.round(data.main.humidity) + "%";
    document.querySelector(".wind").innerHTML =
      Math.ceil(data.wind.speed) + " km/h";
    if (data.weather[0].main == "Haze") {
      imageChange.src = "assets/clear.png";
    } else if (data.weather[0].main == "Clouds") {
      imageChange.src = "assets/clouds.png";
    } else if (data.weather[0].main == "Rain") {
      imageChange.src = "assets/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      imageChange.src = "assets/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      imageChange.src = "assets/mist.png";
    }
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
