var toChart = [];

const param = {
  urlCoords: "http://api.openweathermap.org/geo/1.0/",
  appIdCoords: "aeff156295d17189668bfa9062f439c1",
};

const geoApify = {
  urlIP: "https://api.geoapify.com/v1/ipinfo",
  apiKey: "ef34c3955b494a31b332e812ac92bfb4",

  urlWthr: "https://api.open-meteo.com/v1/forecast",
  requestWthr:
    "hourly=temperature_2m,relativehumidity_2m,weathercode,pressure_msl&daily=shortwave_radiation_sum,weathercode,temperature_2m_max,sunrise,sunset,uv_index_max&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York",

  urlBgVideo: "",
  appIdBgVideo: "",
};

const place = {
  city: "",
  lat: "",
  lon: "",
};

const currWthr = {
  isDay: "",
  temperature: "",
  weathercode: "",
  pressure: "",
  winddirection: "",
  windspeed: "",
  sunrise: "",
  sunset: "",
  uv: "",
  humidity: "",
  pressure: "",
};

const daylyWthr = {
  fullDate: [],
  temperature: [],
  weathercode: [],
};

const hourlyWthr = {
  fullDateTime: [],
  temperature: [],
  weathercode: [],
};

//redone
wthrCodesarr = [
  0, 1, 2, 3, 45, 48, 51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 71, 73, 75, 77,
  80, 81, 82, 85, 86, 95, 96, 99,
];

// Weather Icons Class Names from Fonteawesome
// Change size by adding fa-xs, fa-xl
wthrIcons = [
  ["fa-solid fa-moon", "fa-solid fa-sun fa-xl", "Clear sky"],
  ["fa-solid fa-moon", "fa-solid fa-sun fa-xl", "Mainly clear"],
  ["fa-solid fa-cloud-moon", "fa-solid fa-cloud-sun fa-xl", "Partly cloudy"],
  ["fa-solid fa-cloud fa-xl", "fa-solid fa-cloud fa-xl", "Overcast"],
  ["fa-solid fa-smog fa-xl", "fa-solid fa-smog fa-xl", "Fog"],
  ["fa-solid fa-smog fa-xl", "fa-solid fa-smog fa-xl", "Fog"],
  [
    "fa-solid fa-cloud-rain fa-xl",
    "fa-solid fa-cloud-rain fa-xl",
    "Light drizzle",
  ],
  ["fa-solid fa-cloud-rain fa-xl", "fa-solid fa-cloud-rain fa-xl", "Drizzle"],
  ["fa-solid fa-cloud-rain fa-xl", "fa-solid fa-cloud-rain fa-xl", "Drizzle"],
  [
    "fa-solid fa-cloud-rain fa-xl",
    "fa-solid fa-cloud-rain fa-xl",
    "Freezing drizzle",
  ],
  [
    "fa-solid fa-cloud-rain fa-xl",
    "fa-solid fa-cloud-rain fa-xl",
    "Freezing drizzle",
  ],
  ["fa-solid fa-cloud-moon-rain", "fa-solid fa-cloud-sun-rain", "Slight rain"],
  ["fa-solid fa-cloud-rain fa-xl", "fa-solid fa-cloud-rain fa-xl", "Rain"],
  [
    "fa-solid fa-cloud-showers-heavy",
    "fa-solid fa-cloud-showers-heavy",
    "Heavy rain",
  ],
  [
    "fa-solid fa-cloud-meatball fa-xl",
    "fa-solid fa-cloud-meatball fa-xl",
    "Freezing Rain",
  ],
  [
    "fa-solid fa-cloud-meatball fa-xl",
    "fa-solid fa-cloud-meatball fa-xl",
    "Freezing Rain",
  ],
  [
    "fa-regular fa-snowflake fa-xl",
    "fa-regular fa-snowflake fa-xl",
    "Snow fall",
  ],
  [
    "fa-regular fa-snowflake fa-xl",
    "fa-regular fa-snowflake fa-xl",
    "Snow fall",
  ],
  [
    "fa-regular fa-snowflake fa-xl",
    "fa-regular fa-snowflake fa-xl",
    "Snow fall",
  ],
  [
    "fa-regular fa-snowflake fa-xl",
    "fa-regular fa-snowflake fa-xl",
    "Snow fall",
  ],
  [
    "fa-solid fa-cloud-showers-water fa-xl",
    "fa-solid fa-cloud-showers-water fa-xl",
    "Rain shower",
  ],
  [
    "fa-solid fa-cloud-showers-water fa-xl",
    "fa-solid fa-cloud-showers-water fa-xl",
    "Rain shower",
  ],
  [
    "fa-solid fa-cloud-showers-water fa-xl",
    "fa-solid fa-cloud-showers-water fa-xl",
    "Rain shower",
  ],
  ["fa-solid fa-snowflake fa-xl", "fa-solid fa-snowflake fa-xl", "Snow shower"],
  ["fa-solid fa-snowflake fa-xl", "fa-solid fa-snowflake fa-xl", "Snow shower"],
  [
    "fa-solid fa-cloud-bolt fa-xl",
    "fa-solid fa-cloud-bolt fa-xl",
    "Thunderstorm",
  ],
  [
    "fa-solid fa-cloud-bolt fa-xl",
    "fa-solid fa-cloud-bolt fa-xl",
    "Thunderstorm",
  ],
  [
    "fa-solid fa-cloud-bolt fa-xl",
    "fa-solid fa-cloud-bolt fa-xl",
    "Thunderstorm",
  ],
];

locationByIp();
async function locationByIp() {
  let responseObj = await fetch(`${geoApify.urlIP}?&apiKey=${geoApify.apiKey}`);
  let locationData = await responseObj.json();
  place.city = locationData.city.name + ", " + locationData.country.name;
  place.lat = locationData.location.latitude;
  place.lon = locationData.location.longitude;
  //console.log(locationData);
  getWeather(place.lon, place.lat);
}

function dayOfWeek(newDate) {
  newDate = newDate.replaceAll("-", "/");
  const date = new Date(newDate);

  return date.toLocaleDateString("en-US", {
    weekday: "short",
  });
}

async function getWeather(lon, lat) {
  const response = await fetch(
    `${geoApify.urlWthr}?latitude=${lat}1&longitude=${lon}&${geoApify.requestWthr}`
  );
  const weatherData = await response.json();
  //console.log(weatherData); //

  currWthr.isDay = weatherData.current_weather.is_day;
  currWthr.temperature = weatherData.current_weather.temperature;
  currWthr.weathercode = weatherData.current_weather.weathercode;
  currWthr.winddirection = weatherData.current_weather.winddirection;
  currWthr.windspeed = weatherData.current_weather.windspeed;
  currWthr.sunrise = weatherData.daily.sunrise[0];
  currWthr.sunset = weatherData.daily.sunset[0];
  currWthr.uv = weatherData.daily.uv_index_max[0];
  currWthr.humidity = weatherData.hourly.relativehumidity_2m[20];
  currWthr.pressure = weatherData.hourly.pressure_msl[20];
  currWthr.swRad = weatherData.daily.shortwave_radiation_sum[0];

  daylyWthr.fullDate = weatherData.daily.time;
  daylyWthr.temperature = weatherData.daily.temperature_2m_max;
  daylyWthr.weathercode = weatherData.daily.weathercode;

  hourlyWthr.fullDateTime = weatherData.hourly.time;
  hourlyWthr.temperature = weatherData.hourly.temperature_2m;
  hourlyWthr.weathercode = weatherData.hourly.weathercode;

  toChart = hourlyWthr.temperature.slice(0, 25);

  // main div info
  let currtime = new Date();
  document.querySelector(
    ".time"
  ).textContent = `Now  ${currtime.getHours()}:${currtime.getMinutes()}`; // rdisplays current date time
  document.querySelector(".city").textContent = place.city; // current city
  document.querySelector(".temp").textContent = `${currWthr.temperature} °F`; //Temperature

  let ind = wthrCodesarr.indexOf(currWthr.weathercode);
  const ticElement = document.getElementById("icon-main"); // display weather icon
  ticElement.innerHTML = `<i class="${
    wthrIcons[ind][currWthr.isDay]
  } icon"></i>`; // display weather icon

  document.getElementById("temp descr").textContent = wthrIcons[ind][2]; //description: cloudy, rain etc.

  document.querySelector(
    ".pressure"
  ).textContent = `Atm.pressure: ${currWthr.pressure} in`; //diplay Pressure value
  document.querySelector(
    ".humidity"
  ).textContent = `Humidity ${currWthr.humidity}%`; //display humidity vakue
  // //-------------------------------------------------------------------------------------

  //small blocks
  let sunRise = currWthr.sunrise.slice(11);
  let sunSet = currWthr.sunset.slice(11);
  document.querySelector(
    ".sunsun"
  ).textContent = `${sunRise} -------> ${sunSet}`; //display sunrise&sunset

  document.getElementById("UVIvalue").textContent = `${currWthr.uv}`; //display UV index value
  document.getElementById("vis").textContent = `SW radiation ${currWthr.swRad}`; //display UV index value

  document.getElementById(
    "wind-speed"
  ).textContent = `Wind speed: ${currWthr.windspeed} mph`; //display wind speed value
  document.getElementById(
    "wind-dir"
  ).textContent = `Direction: ${currWthr.winddirection}°`; //display  winddirection}

  //Daily block
  ind = wthrCodesarr.indexOf(daylyWthr.weathercode[1]);
  document.getElementById("day1").textContent = dayOfWeek(
    daylyWthr.fullDate[1]
  );
  document.getElementById("day1T").textContent = `${daylyWthr.temperature[1]}°`;
  document.getElementById(
    "day1Icon"
  ).innerHTML = `<i class="${wthrIcons[ind][1]} icon"></i>`; //indexes are static
  document.getElementById("day1descr").textContent = wthrIcons[ind][2];

  ind = wthrCodesarr.indexOf(daylyWthr.weathercode[2]);
  document.getElementById("day2").textContent = dayOfWeek(
    daylyWthr.fullDate[2]
  );
  document.getElementById("day2T").textContent = `${daylyWthr.temperature[2]}°`;
  document.getElementById(
    "day2Icon"
  ).innerHTML = `<i class="${wthrIcons[ind][1]} icon"></i>`; //indexes are static
  document.getElementById("day2descr").textContent = wthrIcons[ind][2];

  ind = wthrCodesarr.indexOf(daylyWthr.weathercode[3]);
  document.getElementById("day3").textContent = dayOfWeek(
    daylyWthr.fullDate[3]
  );
  document.getElementById("day3T").textContent = `${daylyWthr.temperature[3]}°`;
  document.getElementById(
    "day3Icon"
  ).innerHTML = `<i class="${wthrIcons[ind][1]} icon"></i>`; //indexes are static
  document.getElementById("day3descr").textContent = wthrIcons[ind][2];

  ind = wthrCodesarr.indexOf(daylyWthr.weathercode[4]);
  document.getElementById("day4").textContent = dayOfWeek(
    daylyWthr.fullDate[4]
  );
  document.getElementById("day4T").textContent = `${daylyWthr.temperature[4]}°`;
  document.getElementById(
    "day4Icon"
  ).innerHTML = `<i class="${wthrIcons[ind][1]} icon"></i>`; //indexes are static
  document.getElementById("day4descr").textContent = wthrIcons[ind][2];

  ind = wthrCodesarr.indexOf(daylyWthr.weathercode[5]);
  document.getElementById("day5").textContent = dayOfWeek(
    daylyWthr.fullDate[5]
  );
  document.getElementById("day5T").textContent = `${daylyWthr.temperature[5]}°`;
  document.getElementById(
    "day5Icon"
  ).innerHTML = `<i class="${wthrIcons[ind][1]} icon"></i>`; //indexes are static
  document.getElementById("day5descr").textContent = wthrIcons[ind][2];

  ind = wthrCodesarr.indexOf(daylyWthr.weathercode[6]);
  document.getElementById("day6").textContent = dayOfWeek(
    daylyWthr.fullDate[6]
  );
  document.getElementById("day6T").textContent = `${daylyWthr.temperature[6]}°`;
  document.getElementById(
    "day6Icon"
  ).innerHTML = `<i class="${wthrIcons[ind][1]} icon"></i>`; //indexes are static
  document.getElementById("day6descr").textContent = wthrIcons[ind][2];

  //Hourly block

  ind = wthrCodesarr.indexOf(hourlyWthr.weathercode[3]);
  document.getElementById(
    "nightT"
  ).textContent = `${hourlyWthr.temperature[3]}°`;
  document.getElementById(
    "nightIcon"
  ).innerHTML = `<i class="${wthrIcons[ind][0]} icon"></i>`; //indexes are static
  document.getElementById("nightdescr").textContent = wthrIcons[ind][2];

  ind = wthrCodesarr.indexOf(hourlyWthr.weathercode[8]);
  document.getElementById(
    "morningT"
  ).textContent = `${hourlyWthr.temperature[8]}°`;
  document.getElementById(
    "morningIcon"
  ).innerHTML = `<i class="${wthrIcons[ind][0]} icon"></i>`; //indexes are static
  document.getElementById("morningdescr").textContent = wthrIcons[ind][2];

  ind = wthrCodesarr.indexOf(hourlyWthr.weathercode[14]);
  document.getElementById(
    "dayT"
  ).textContent = `${hourlyWthr.temperature[14]}°`;
  document.getElementById(
    "dayIcon"
  ).innerHTML = `<i class="${wthrIcons[ind][0]} icon"></i>`; //indexes are static
  document.getElementById("daydescr").textContent = wthrIcons[ind][2];

  ind = wthrCodesarr.indexOf(hourlyWthr.weathercode[20]);
  document.getElementById(
    "evengT"
  ).textContent = `${hourlyWthr.temperature[20]}°`;
  document.getElementById(
    "evengIcon"
  ).innerHTML = `<i class="${wthrIcons[ind][0]} icon"></i>`; //indexes are static
  document.getElementById("evengdescr").textContent = wthrIcons[ind][2];
}

async function getCoords() {
  let responseObj = await fetch(
    `${param.urlCoords}direct?q=${place.city}&limit=3&appid=${param.appIdCoords}`
  );
  let coordsData = await responseObj.json();
  if (coordsData[0].state == undefined) {
    state = coordsData[0].country;
  } else state = coordsData[0].state;
  place.city = coordsData[0].name + ", " + state;
  place.lat = coordsData[0].lat;
  place.lon = coordsData[0].lon;
  console.log(coordsData);
  getWeather(place.lon, place.lat);
}

const input = document.getElementById("search-bar");
const searchButton = document.getElementById("search-btn");

function search() {
  place.city = input.value;
  document.getElementById("search-bar").value = "";
  getCoords();
}

searchButton.addEventListener("click", search);
// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    search();
  }
});

// const searchBtn = document.getElementById("searchBtn");
// searchBtn.addEventListener(
//   "click",
//   () => (place.city = document.getElementById("searchQuery").value)
// );

//
