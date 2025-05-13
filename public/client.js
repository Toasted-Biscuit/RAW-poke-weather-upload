// Creating Date objects for the next 5 days including today
let day0Date = new Date();
let day1Date = new Date(day0Date);
day1Date.setDate(day0Date.getDate() + 1);
let day2Date = new Date(day0Date);
day2Date.setDate(day0Date.getDate() + 2);
let day3Date = new Date(day0Date);
day3Date.setDate(day0Date.getDate() + 3);
let day4Date = new Date(day0Date);
day4Date.setDate(day0Date.getDate() + 4);
let day5Date = new Date(day0Date);
day5Date.setDate(day0Date.getDate() + 5);

// Gets the current position and calls the getWeather function using that data
navigator.geolocation.getCurrentPosition((position) => {
  console.log("Position Data:")
  console.log(position)
  
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  
  getWeather(lat, long)
})

// Button functions to switch pages
function homePressed() {
  document.getElementById("home_page").style.display = "inline";
  document.getElementById("pokemon_page").style.display = "none";
  document.getElementById("weather_page").style.display = "none";
}

function pokemonPressed() {
  document.getElementById("home_page").style.display = "none";
  document.getElementById("pokemon_page").style.display = "inline";
  document.getElementById("weather_page").style.display = "none";
}

function weatherPressed() {
  document.getElementById("home_page").style.display = "none";
  document.getElementById("pokemon_page").style.display = "none";
  document.getElementById("weather_page").style.display = "inline";
}

let isShiny = false;
let gottenDailyPoke = false;

getRandPokemon();

/* 
  WEATHER STUFFFFF!!!! ------------------------------
*/

// Calls weather api and changes website elements
async function getWeather(lat, long) {
  let response = await fetch("/weatherData?lat=" + lat + "&long=" + long);
  let data = await response.json();
  console.log("Weather:");
  console.log(data);
  
  // Current temperature and the high and low for the day (for both home and weather pages)
  document.getElementById("tempHome").innerHTML = data.current.temperature_2m + "° F";
  document.getElementById("tempWeather").innerHTML = data.current.temperature_2m + "° F";
  document.getElementById("highLowHome").innerHTML = "H:" + data.daily.temperature_2m_max[0] + "° - L:" + data.daily.temperature_2m_min[0] + "°";
  document.getElementById("highLowWeather").innerHTML = "H:" + data.daily.temperature_2m_max[0] + "° - L:" + data.daily.temperature_2m_min[0] + "°";
  
  // Weather Codes change text and background
  let weatherCode = data.current.weather_code;
  let weatherText = "";
  let weatherBackground = "";
  
  if (weatherCode >= 1 && weatherCode <= 3) {
    weatherText = "Cloudy";
    weatherBackground = "https://cdn.glitch.global/1c5a9760-0baf-4dae-9ae3-eefc5cfcfd0a/cloudy_background.image.png?v=1746452009904";
  
  } else if (weatherCode == 45 || weatherCode == 48) {
    weatherText = "Foggy";
    weatherBackground = "https://cdn.glitch.global/1c5a9760-0baf-4dae-9ae3-eefc5cfcfd0a/foggy_weather.image.png?v=1746452367012";
    
  } else if (weatherCode == 51 || weatherCode == 53 || weatherCode == 55 || 
             weatherCode == 80 || weatherCode == 81 || weatherCode == 82 ||
             weatherCode == 61 || weatherCode == 63 || weatherCode == 65) {
    weatherText = "Rainy";
    weatherBackground = "https://cdn.glitch.global/1c5a9760-0baf-4dae-9ae3-eefc5cfcfd0a/rainy_weather.image.png?v=1746452296042";
    
  } else if (weatherCode == 56 || weatherCode == 57 || weatherCode == 66 || weatherCode == 67) {
    weatherText = "Freezing Rain";
    weatherBackground = "https://cdn.glitch.global/1c5a9760-0baf-4dae-9ae3-eefc5cfcfd0a/freezing_rain_background.image.png?v=1746452502397";
    
  } else if (weatherCode == 77 || weatherCode == 85 || weatherCode == 86 ||
             weatherCode == 71 || weatherCode == 73 || weatherCode == 75) {
    weatherText = "Snowy!";
    weatherBackground = "https://cdn.glitch.global/1c5a9760-0baf-4dae-9ae3-eefc5cfcfd0a/snowy_background.image.png?v=1746452677911";
    
  } else if (weatherCode == 95 || weatherCode == 96 || weatherCode == 99) {
    weatherText = "Stormy";
    weatherBackground = "https://cdn.glitch.global/1c5a9760-0baf-4dae-9ae3-eefc5cfcfd0a/thunderstorm_background.image.png?v=1746468099891";
    
  } else {
    weatherText = "Sunny";
    weatherBackground = "https://cdn.glitch.global/1c5a9760-0baf-4dae-9ae3-eefc5cfcfd0a/sunny_background2.image.png?v=1746742971129";
  }
  
  // Changes the background to the current weather and the text describing the weather (both home and weather pages)
  document.getElementById("homeBackgroundImg").src = weatherBackground;
  document.getElementById("weatherBackgroundImg").src = weatherBackground;
  document.getElementById("weatherHome").innerHTML = weatherText;
  document.getElementById("weatherWeather").innerHTML = weatherText;
  
  // Temperatures for the next 5 days (weather page)
  document.getElementById("forcastDayName0").innerHTML = "Today";
  document.getElementById("forcastEmoji0").innerHTML = getWeatherEmoji(data.daily.weather_code[0]);
  document.getElementById("forcastWeather0").innerHTML = getWeatherText(data.daily.weather_code[0]);
  document.getElementById("forcastHigh0").innerHTML = "H: " + data.daily.temperature_2m_max[0] + "°";
  document.getElementById("forcastLow0").innerHTML = "L: " + data.daily.temperature_2m_min[0] + "°";
  
  document.getElementById("forcastDayName1").innerHTML = day1Date.toString().substring(0,3);
  document.getElementById("forcastEmoji1").innerHTML = getWeatherEmoji(data.daily.weather_code[1]);
  document.getElementById("forcastWeather1").innerHTML = getWeatherText(data.daily.weather_code[1]);
  document.getElementById("forcastHigh1").innerHTML = "H: " + data.daily.temperature_2m_max[1] + "°";
  document.getElementById("forcastLow1").innerHTML = "L: " + data.daily.temperature_2m_min[1] + "°";
  
  document.getElementById("forcastDayName2").innerHTML = day2Date.toString().substring(0,3);
  document.getElementById("forcastEmoji2").innerHTML = getWeatherEmoji(data.daily.weather_code[2]);
  document.getElementById("forcastWeather2").innerHTML = getWeatherText(data.daily.weather_code[2]);
  document.getElementById("forcastHigh2").innerHTML = "H: " + data.daily.temperature_2m_max[2] + "°";
  document.getElementById("forcastLow2").innerHTML = "L: " + data.daily.temperature_2m_min[2] + "°";
  
  document.getElementById("forcastDayName3").innerHTML = day3Date.toString().substring(0,3);
  document.getElementById("forcastEmoji3").innerHTML = getWeatherEmoji(data.daily.weather_code[3]);
  document.getElementById("forcastWeather3").innerHTML = getWeatherText(data.daily.weather_code[3]);
  document.getElementById("forcastHigh3").innerHTML = "H: " + data.daily.temperature_2m_max[3] + "°";
  document.getElementById("forcastLow3").innerHTML = "L: " + data.daily.temperature_2m_min[3] + "°";
  
  document.getElementById("forcastDayName4").innerHTML = day4Date.toString().substring(0,3);
  document.getElementById("forcastEmoji4").innerHTML = getWeatherEmoji(data.daily.weather_code[4]);
  document.getElementById("forcastWeather4").innerHTML = getWeatherText(data.daily.weather_code[4]);
  document.getElementById("forcastHigh4").innerHTML = "H: " + data.daily.temperature_2m_max[4] + "°";
  document.getElementById("forcastLow4").innerHTML = "L: " + data.daily.temperature_2m_min[4] + "°";
  
  document.getElementById("forcastDayName5").innerHTML = day5Date.toString().substring(0,3);
  document.getElementById("forcastEmoji5").innerHTML = getWeatherEmoji(data.daily.weather_code[5]);
  document.getElementById("forcastWeather5").innerHTML = getWeatherText(data.daily.weather_code[5]);
  document.getElementById("forcastHigh5").innerHTML = "H: " + data.daily.temperature_2m_max[5] + "°";
  document.getElementById("forcastLow5").innerHTML = "L: " + data.daily.temperature_2m_min[5] + "°";
}

// Gets an emoji that matches the given weather code
function getWeatherEmoji(weatherCode) {
  let emoji = "";
  if (weatherCode >= 1 && weatherCode <= 3) {
    // Cloudy
    emoji = "☁️";
  
  } else if (weatherCode == 45 || weatherCode == 48) {
    // Foggy
    emoji = "💨";
    
  } else if (weatherCode == 51 || weatherCode == 53 || weatherCode == 55 || 
             weatherCode == 80 || weatherCode == 81 || weatherCode == 82 ||
             weatherCode == 61 || weatherCode == 63 || weatherCode == 65) {
    // Rainy
    emoji = "🌧️";
    
  } else if (weatherCode == 56 || weatherCode == 57 || weatherCode == 66 || weatherCode == 67) {
    // Freezing Rain
    emoji = "🧊";
    
  } else if (weatherCode == 77 || weatherCode == 85 || weatherCode == 86 ||
             weatherCode == 71 || weatherCode == 73 || weatherCode == 75) {
    // Snowy
    emoji = "☃️";
    
  } else if (weatherCode == 95 || weatherCode == 96 || weatherCode == 99) {
    // Stormy
    emoji = "⛈️";
    
  } else {
    // Sunny
    emoji = "☀️";
  }
  return emoji;
}

// Gets text that describes the current weather code
function getWeatherText(weatherCode) {
  let weatherText = "";
  if (weatherCode >= 1 && weatherCode <= 3) {
    // Cloudy
    weatherText = "Cloudy";
  
  } else if (weatherCode == 45 || weatherCode == 48) {
    // Foggy
    weatherText = "Foggy";
    
  } else if (weatherCode == 51 || weatherCode == 53 || weatherCode == 55 || 
             weatherCode == 80 || weatherCode == 81 || weatherCode == 82 ||
             weatherCode == 61 || weatherCode == 63 || weatherCode == 65) {
    // Rainy
    weatherText = "Rainy";
    
  } else if (weatherCode == 56 || weatherCode == 57 || weatherCode == 66 || weatherCode == 67) {
    // Frozen Rain
    weatherText = "Freezing Rain";
    
  } else if (weatherCode == 77 || weatherCode == 85 || weatherCode == 86 ||
             weatherCode == 71 || weatherCode == 73 || weatherCode == 75) {
    // Snowy
    weatherText = "Snowy";
    
  } else if (weatherCode == 95 || weatherCode == 96 || weatherCode == 99) {
    // Stormy
    weatherText = "Stormy";
    
  } else {
    // Sunny
    weatherText = "Sunny";
  }
  return weatherText;
}
  
/*
  POKEMON STUFFFF!!!! -------------------------
*/

// Switches the pokemon image from not shiny to shiny (and vice-versa) when checkbox is marked
function turnShiny() {
  isShiny = !isShiny;
  if (isShiny) {
    document.getElementById("pokeImg").style.display = "none";
    document.getElementById("pokeShinyImg").style.display = "block";
  } else {
    document.getElementById("pokeImg").style.display = "block";
    document.getElementById("pokeShinyImg").style.display = "none";
  }
}

// Calls PokeApi to get total num of pokemon, randomly chooses an Id, then calls getPokemon
async function getRandPokemon() {
  let speciesResponse = await fetch("https://pokeapi.co/api/v2/pokemon-species");
  let speciesData = await speciesResponse.json();
  
  let randNum = getRand(0, speciesData.count - 1);
  console.log("Rand Pokemon Id: " + randNum);
  getPokemon(randNum);
}

// Takes input from searchbox and calls getPokemon using the input
function searchPokemon() {
  let name = document.getElementById("searchbox").value.toLowerCase();
  getPokemon(name);
}

// Calls pokeApi and changes website elements
async function getPokemon(id) {
  // Pokemon info
  let response = await fetch("/pokemonData?id=" + id);
  let data = await response.json();
  console.log("Pokemon Data:")
  console.log(data);
  
  // Species Info
  let specResponse = await fetch("/pokemonSpeciesData?id=" + data.species.name);
  let specData = await specResponse.json();
  console.log("Species Data:")
  console.log(specData);
  
  // Name, flavor text, and pic
  let name = specData.name;
  name = name.charAt(0).toUpperCase() + name.substring(1);
  if (!gottenDailyPoke) { // Daily pokemon name on home page will not change after loading page
    document.getElementById("homePokeName").innerHTML = name;
  }
  document.getElementById("pokeName").innerHTML = name;
  document.getElementById("pokeId").innerHTML = "#" + data.id;
  
  // Finds and uses the latest english flavor text
  let flavor_text = specData.flavor_text_entries[0].flavor_text;
  let flavor_en = [];
  for (let i = 0; i < specData.flavor_text_entries.length; i++) {
    if (specData.flavor_text_entries[i].language.name == "en") {
      flavor_en.push(specData.flavor_text_entries[i].flavor_text);
    }
  }
  if (flavor_en.length == 1) {
    flavor_text = flavor_en[0];
  } else {
    flavor_text = flavor_en[getRand(0, flavor_en.length - 1)];
  }
  // This line removes the strange up arrow that sometimes appears in the api responses
  flavor_text = flavor_text.replace(String.fromCharCode(12)," ")
  
  document.getElementById("pokeDesc").innerHTML = flavor_text;
  
  // Checks how many types the pokemon has, then changes type pictures
  let typeArr = getTypeNames(data);
  if (typeArr.length == 1) {
    document.getElementById("pokeTypeSingle").src = getTypeImg(typeArr[0]);
    
    document.getElementById("pokeTypeSingle").style.display = "inline";
    document.getElementById("pokeType1").style.display = "none";
    document.getElementById("pokeType2").style.display = "none";
  } else if (typeArr.length == 2) {
    document.getElementById("pokeType1").src = getTypeImg(typeArr[0]);
    document.getElementById("pokeType2").src = getTypeImg(typeArr[1]);
    
    document.getElementById("pokeTypeSingle").style.display = "none";
    document.getElementById("pokeType1").style.display = "inline";
    document.getElementById("pokeType2").style.display = "inline";
  }
  
  // Changes pokemon images
  if (!gottenDailyPoke) { // Daily pokemon img on home page will not change after loading page
   document.getElementById("homePokeImg").src = data.sprites.other["official-artwork"].front_default; 
    gottenDailyPoke = true;
  }
  document.getElementById("pokeImg").src = data.sprites.other["official-artwork"].front_default;
  document.getElementById("pokeShinyImg").src = data.sprites.other["official-artwork"].front_shiny;
  if (isShiny) {
    document.getElementById("pokeImg").style.display = "none";
    document.getElementById("pokeShinyImg").style.display = "block";
  } else {
    document.getElementById("pokeImg").style.display = "block";
    document.getElementById("pokeShinyImg").style.display = "none";
  }
}

// Returns an array containing strings of the pokemon's type
function getTypeNames(data) {
  let typeArr = [];
  for (let i = 0; i < data.types.length; i++) {
    typeArr.push(data.types[i].type.name);
  }
  return typeArr;
}

// Returns the image url of the pokemon type icons when supplied with a string with a type
function getTypeImg(type) {
  if (type == "grass") {
      return "https://cdn.glitch.global/1c5a9760-0baf-4dae-9ae3-eefc5cfcfd0a/grass.svg?v=1746647188890";
    } else if (type == "ice") {
      return "https://cdn.glitch.global/1c5a9760-0baf-4dae-9ae3-eefc5cfcfd0a/ice.svg?v=1746647206151";
    } else if (type == "ground") {
      return "https://cdn.glitch.global/1c5a9760-0baf-4dae-9ae3-eefc5cfcfd0a/ground.svg?v=1746647210541";
    } else if (type == "poison") {
      return "https://cdn.glitch.global/1c5a9760-0baf-4dae-9ae3-eefc5cfcfd0a/poison.svg?v=1746647218521";
    } else if (type == "psychic") {
      return "https://cdn.glitch.global/1c5a9760-0baf-4dae-9ae3-eefc5cfcfd0a/psychic.svg?v=1746647221982";
    } else if (type == "rock") {
      return "https://cdn.glitch.global/1c5a9760-0baf-4dae-9ae3-eefc5cfcfd0a/rock.svg?v=1746647229573";
    } else if (type == "steel") {
      return "https://cdn.glitch.global/1c5a9760-0baf-4dae-9ae3-eefc5cfcfd0a/steel.svg?v=1746647235009";
    } else if (type == "water") {
      return "https://cdn.glitch.global/1c5a9760-0baf-4dae-9ae3-eefc5cfcfd0a/water.svg?v=1746647240441";
    } else if (type == "bug") {
      return "https://cdn.glitch.global/1c5a9760-0baf-4dae-9ae3-eefc5cfcfd0a/bug.svg?v=1746647247105";
    } else if (type == "dark") {
      return "https://cdn.glitch.global/1c5a9760-0baf-4dae-9ae3-eefc5cfcfd0a/dark.svg?v=1746647250719";
    } else if (type == "dragon") {
      return "https://cdn.glitch.global/1c5a9760-0baf-4dae-9ae3-eefc5cfcfd0a/dragon.svg?v=1746647254049";
    } else if (type == "electric") {
      return "https://cdn.glitch.global/1c5a9760-0baf-4dae-9ae3-eefc5cfcfd0a/electric.svg?v=1746647266842";
    } else if (type == "fairy") {
      return "https://cdn.glitch.global/1c5a9760-0baf-4dae-9ae3-eefc5cfcfd0a/fairy.svg?v=1746647273012";
    } else if (type == "fighting") {
      return "https://cdn.glitch.global/1c5a9760-0baf-4dae-9ae3-eefc5cfcfd0a/fighting.svg?v=1746647277114";
    } else if (type == "fire") {
      return "https://cdn.glitch.global/1c5a9760-0baf-4dae-9ae3-eefc5cfcfd0a/fire.svg?v=1746647281369";
    } else if (type == "flying") {
      return "https://cdn.glitch.global/1c5a9760-0baf-4dae-9ae3-eefc5cfcfd0a/flying.svg?v=1746647285360";
    } else if (type == "ghost") {
      return "https://cdn.glitch.global/1c5a9760-0baf-4dae-9ae3-eefc5cfcfd0a/ghost.svg?v=1746647289993";
    } else {
      // Normal Type is the default
      return "https://cdn.glitch.global/1c5a9760-0baf-4dae-9ae3-eefc5cfcfd0a/normal.svg?v=1746647198187";
    }
}

// Gets a random number in a given range
function getRand(min, max) {
  let range = max - min;
  return Math.floor(Math.random() * range) + 1;
}