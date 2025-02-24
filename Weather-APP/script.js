document.addEventListener("DOMContentLoaded", () => {
    const cityInput = document.getElementById("input-city");
    const weatherButton = document.getElementById("get-weather");
    const weatherInfo = document.getElementById("weather-info");
    const weatherCity = document.getElementById("city-name");
    const cityTemp = document.getElementById("temp");
    const cityDesc = document.getElementById("desc");
    const errorContainer = document.getElementById("errorContainer");
    const errorMsg = document.getElementById("error-message");
    const API_KEY = "f89602099a58fb9e2750af1c36590e88";
    const enter = document.getElementById("input-city");
    let e = document.querySelector(".container");
    // let fontColorBlack = document.getElementById("city-name");
    weatherButton.addEventListener("click", async () => {
        const city = cityInput.value.trim();
        if (!city) return;

        try {
            const weatherCdata = await getWeatherData(city);
            showWeatherData(weatherCdata);
        } catch (error) {
            showErrorMessage();
        }
    });

    async function getWeatherData(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City Not Found");
        }
        const resData = await response.json();
        return resData;
    }

    function showWeatherData(weatherResponse) {
        console.log(weatherResponse);
        const { name, main, weather } = weatherResponse;
        weatherCity.textContent = name;
        const weatherDesc = weather[0].description;
        const kelvin = main.temp;
        const celsius = parseInt(kelvin - 273.15);
        cityTemp.textContent = ` Temperature: ${celsius}°C`;
        cityDesc.textContent = `Weather:  ${weatherDesc}`;

        weatherInfo.classList.remove("hidden");
        errorContainer.classList.add("hidden");
        changeBackgroundColor(weather[0].description);
    }

    function changeBackgroundColor(weatherType) {
        e.classList.remove("contain", "haze", "snow", "overcast", "rain", "thunder");
        if (weatherType.includes("clear")) {
            e.classList.add("contain");
        } else if (weatherType.includes("haze")) {
            e.classList.add("haze");
        } else if (weatherType.includes("snow")) {
            e.classList.add("snow");
        } else if (weatherType.includes("cloud")) {
            e.classList.add("overcast");
        } else if (weatherType.includes("rain")) {
            e.classList.add("rain");
        } else if (weatherType.includes("thunder")) {
            e.classList.add("thunder");
        }
        else if (weatherType.includes("drizzle")) {
            e.classList.add("Drizzle");
        }
        else if (weatherType.includes("mist")) {
            e.classList.add("mist");
        }
    }

    function showErrorMessage() {
        e.classList.remove("haze", "snow", "overcast", "rain", "thunder", "contain", "Drizzle", "mist");
        e.classList.add("container");
        errorContainer.classList.remove("hidden");
        weatherInfo.classList.add("hidden");
    }

    enter.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            weatherButton.click();
            cityInput.value = "";
        }
    });
});