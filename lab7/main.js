let maxId = 0;
const api = "f04651528f76e3eed0d63e6ae4c2982f";
const weatherCacheKey = "weatherCache";
const refreshData = 5; //IN MINUTES

const getCachedWeatherData = () => {
  const cachedWeatherData = JSON.parse(localStorage.getItem(weatherCacheKey));
  return cachedWeatherData || {};
};

const saveWeatherDataToCache = (city, data) => {
  const timestamp = Date.now();
  const cachedWeatherData = getCachedWeatherData();
  cachedWeatherData[city] = { data, timestamp };
  localStorage.setItem(weatherCacheKey, JSON.stringify(cachedWeatherData));
};

const getWeatherDataFromCache = (city) => {
  const cachedWeatherData = getCachedWeatherData();
  const cachedCityData = cachedWeatherData[city];
  if (
    cachedCityData &&
    Date.now() - cachedCityData.timestamp < refreshData * 59 * 1000
  ) {
    return cachedCityData.data;
  }
  return null;
};

const weatherData = async (title, id) => {
  const cachedData = getWeatherDataFromCache(title);
  if (cachedData) {
    console.log("Using cached weather data for", title);
    return cachedData;
  }
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${title}&units=metric&appid=${api}`
    );
    if (!response.ok) {
      removeNote(id);
      alert("Nie ma takiego miasta");
      return null;
    }
    const data = await response.json();
    saveWeatherDataToCache(title, data);
    console.log("Fetched weather data for", title);
    return data;
  } catch (err) {
    console.log(err);

    return null;
  }
};

function getColorForTemperature(temp) {
  if (temp < 0) return "#3366FF";
  else if (temp < 5) return "#3399FF";
  else if (temp < 10) return "#33CCFF";
  else if (temp < 15) return "#33DDAA";
  else if (temp < 20) return "#33FFAA";
  else return "#FF0044";
}

function addNote() {
  const note = document.querySelector("#addNote");
  const titleInput = note.querySelector("#title");
  let existId = NaN;

  Object.values({ ...localStorage }).map((x) => {
    const { id, title } = JSON.parse(x);
    if (!isNaN(id)) maxId = id;
    if (title === titleInput.value.toUpperCase()) existId = id;
  });
  const id = maxId + 1;
  if (!isNaN(existId)) removeNote(existId);
  if (titleInput.value == "") {
    alert("Dodaj tytuł");
  } else {
    localStorage.setItem(
      id,
      JSON.stringify({
        id,
        title: titleInput.value.toUpperCase(),
        date: new Date().toLocaleString(),
      })
    );
    showNotes();
  }

  titleInput.value = "";
}

async function showNotes() {
  const notez = [];
  const localStorageValues = Object.values({ ...localStorage });

  for (const x of localStorageValues) {
    const { id, title, date } = JSON.parse(x);
    if (!isNaN(id) && id != null) {
      const weather = await weatherData(title, id);
      notez.push(`<div class="notes" style="background: ${getColorForTemperature(
        weather.main.temp
      )}">
        <button onClick="removeNote(${id})">Usuń</button>
        <h2>${title}</h2>
        <h1>${weather.main.temp} 	&#8451;</h1>
        <span>Od ${weather.main.temp_min}&#8451; do ${
        weather.main.temp_max
      }&#8451;</span>
        <h3>Wilgotność ${weather.main.humidity}%</h3>
        <img src="https://openweathermap.org/img/wn/${
          weather.weather[0].icon
        }@2x.png" alt="${weather.weather[0].description}">
        <p>${date}</p>
        </div>`);
    }
  }

  document.querySelector("#noteTab").innerHTML = notez.join(" ");
}

document.querySelector("#addButton").addEventListener("click", () => {
  if (document.getElementById("addNote").style.display == "none") {
    document.getElementById("addNote").style.display = "block";
  } else {
    addNote();
    document.getElementById("addNote").style.display = "none";
  }
});

document.querySelector("#clearAllNotes").addEventListener("click", () => {
  localStorage.clear();
  showNotes();
});

function removeNote(id) {
  localStorage.removeItem(id);
  showNotes();
}

showNotes();
setInterval(showNotes, refreshData * 60 * 1000);
