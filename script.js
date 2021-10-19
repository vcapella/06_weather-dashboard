let userInput = document.getElementById("city-input");
let searchBtn = document.querySelector("#city-btn");

let = cities = localStorage.getItem("cities");
if (cities == null) {
  localStorage.setItem("cities", JSON.stringify([]));
}

cities = JSON.parse(localStorage.getItem("cities"));

//TODO: MOVE API KEY TO ENV VAR
const apiKey = "6fcceb1de769c70cd54752eeebec2d57";
const baseURL = "https://api.openweathermap.org/data";

//event listener to get user input when pressing the btn and send it to searchcity function
searchBtn.addEventListener("click", function () {
  alert(userInput.value);
  let userSearch = userInput.value;
  searchCity(userSearch);
  cities.push(userInput.value);
  localStorage.setItem("cities", JSON.stringify(cities));
});

// function to to get the info based on the endpoint desired
function searchCity(cityName) {
  let endPoint = `/2.5/weather?q=${cityName}&appid=${apiKey}`;

  //fetch API info based on the builded URL
  fetch(baseURL + endPoint)
    //convert info into a JSON
    .then(function (res) {
      return res.json();
    })
    //display info "JSONed"
    .then(function (data) {
      console.log(data);
      let lati = data.coord.lat;
      let long = data.coord.lon;
      appendCityList(cityName);
      cityByLatLon(lati, long); //calling the second endpoint
    });
}

function appendCityList(cityName) {
  var ul = document.getElementById("city-list-ul");
  var li = document.createElement("li");
  li.classList.add("list-group-item");
  li.appendChild(document.createTextNode(cityName));
  ul.appendChild(li);
}

function cityByLatLon(lati, long) {
  let endPoint = `/2.5/onecall?lat=${lati}&lon=${long}&appid=${apiKey}`;

  //fetch API info based on the builded URL
  fetch(baseURL + endPoint)
    //convert info into a JSON
    .then(function (res) {
      return res.json();
    })
    //display info "JSONed"
    .then(function (data) {
      console.log(data);

      let temp = data.current.temp;
      let wind = data.current.wind_speed;
      let humidity = data.current.humidity;
      let uvIndex = data.current.uvi;
      const uvIndexElement = document.getElementById("uv-index");
      // populateUI(temp, wind, humidity, uvIndex);

      document.getElementById("temperature").innerHTML = temp + " °F";
      document.getElementById("humidity").innerHTML = humidity + " %";
      document.getElementById("wind-speed").innerHTML = wind + " Mph";
      uvIndexElement.innerHTML = uvIndex;

      if (uvIndex <= 2) {
        uvIndexElement.style.backgroundColor = "green";
      } else if (uvIndex <= 5) {
        uvIndexElement.style.backgroundColor = "yellow";
      } else if (uvIndex <= 7) {
        uvIndexElement.style.backgroundColor = "orange";
      } else if (uvIndex <= 10) {
        uvIndexElement.style.backgroundColor = "red";
      } else {
        uvIndexElement.style.backgroundColor = "violet";
      }

      let foreCastArray = data.daily;
      let cards = document.querySelectorAll(".forecast");

      for (let index = 0; index < foreCastArray.length; index++) {
        //take all the card elements loop through them  and manipulate the elements inside with the info from the forecastArray

        //take the data from there
        console.log(foreCastArray[index].weather);

        //append it here
        console.log(cards[index].children[0]);
      }
    });
}

// function populateUI(temp, wind, humidty, uvIndex) {}

// searchCity();

//1. pegar valor do text box e colocar num alert /done
//2. passar o valor do text box para a API (fetch). /done
//3. Popular UI

//fnction Fahrenheit to Celsius (50°F − 32) × 5/9 = 10°C
// function F2C(x) {
//   return (x - 32) * (5 / 9);
// }

// console.log("C: " + F2C(50));

//
