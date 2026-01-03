const inputText = document.getElementById("city_Name");
const searchBtn = document.getElementById("sreach_btn");
const weatherIcon = document.querySelector(".weather_icon");
const tempDegree = document.querySelector(".temp");
const cityName = document.querySelector(".city");
const humidity = document.querySelector(".p_humidity");
const wind = document.querySelector(".p_wind");
const errorMsg = document.querySelector(".error_msg");
const LoadingMsg = document.querySelector(".loading");

const apiKey = "7626beb9701ddf26d6f19f7b695216f8";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
//setDefaultWeather();
checkWeather("cairo");
async function checkWeather(city) {
  if (!city) {
    error("Please enter a city name");
    return;
  }
  hideError();
  LoadingMsg.style.display = "block";
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    const data = await response.json();
    if (!response.ok) {
      error("Please enter valid city!");
      // setDefaultWeather();
      return;
    }

    console.log(data);
    cityName.innerHTML = data.name;
    humidity.innerHTML = data.main.humidity + "%";
    wind.innerHTML = data.wind.speed + "km/h";
    tempDegree.innerHTML = data.main.temp + "°C";

    const weather = data.weather[0].main.toLowerCase();

    if (weather == "Clear") {
      weatherIcon.src = "css/images/clear.png";
    } else if (weather == "Clouds") {
      weatherIcon.src = "css/images/clouds.png";
    } else if (weather == "Rain") {
      weatherIcon.src = "css/images/rain.png";
    } else if (weather == "Snow") {
      weatherIcon.src = "css/images/snow.png";
    } else if (weather == "Drizzle") {
      weatherIcon.src = "css/images/drizzle.png";
    } else if (weather == "Mist") {
      weatherIcon.src = "css/images/mist.png";
    }

    document.body.className = "";
    document.body.classList.add(weather);
  } catch (err) {
    error("Network error. Please try again.");
  } finally {
    LoadingMsg.style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(inputText.value.trim());
  inputText.value = "";
});

inputText.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && LoadingMsg.style.display !== "block") {
    checkWeather(inputText.value.trim());
    inputText.value = "";
  }
});

function error(message) {
  errorMsg.innerText = message;
  errorMsg.style.display = "block";
}

function hideError() {
  errorMsg.style.display = "none";
}
// function setDefaultWeather() {
//   cityName.innerText = "--";
//   tempDegree.innerText = "--°C";
//   humidity.innerText = "--%";
//   wind.innerText = "-- km/h";
//   weatherIcon.src = "css/images/clouds.png";
// }
