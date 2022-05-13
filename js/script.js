let weather = {
    apiKey: "5161147a054cd2b73242164609873b04",
    fetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" 
        + city 
        + "&units=metric&appid=" 
        + this.apiKey )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity, temp_max, temp_min } = data.main;
        const { speed } = data.wind;
        
        console.log(name, icon, description, temp, humidity, speed, temp_max, temp_min)
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/"+ icon +"@2x.png";
        document.querySelector(".description").innerText = description[0].toUpperCase() + description.slice(1);
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + "%";
        document.querySelector(".maxMin").innerText = "Temp. max-min: " + temp_max + " - " + temp_min + " °C";

//  esta linea es para que al buscar ciudad aparezca una foto relacionada a la descripcion del clima (nublado, soleaod, etc.)
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + description + "')"

//  esta linea es para que al buscar ciudad aparezca foto relacionada a la ciudad 
//         document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')"


    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search button")
        .addEventListener("click", function () {
        weather.search();
    });

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});


// ESTA LINEA ES PARA QUE APAREZCA EL CLIMA DE BUENOS AIRES AL CARGAR LA PAG
weather.fetchWeather("Buenos Aires");