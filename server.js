// initialize the application packages
const express = require("express");
const app = express();
const https = require("https");
const cheerio = require("cheerio");
const axios = require("axios");

// allow static url requests to the public folder and subfolders (for images, etc.)
app.use(express.static("public"));
// listen for requests - the main job of this code
// when a request comes in, process it using one of the app.get functions below
const listener = app.listen(process.env.PORT, function() {
  console.log("Express app is listening on port " + listener.address().port);
});

/* 
 * INDEX PAGE REQUEST
 * This is the basic default request for "/" 
 * This function sends back the index.html file
 */
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/public/index.html");
});

/*
 * API GET REQUEST
 * This is a request for some simple API data. 
 * This function makes an API GET request and wait for an apiResponse
 * If successful, it sends back a response with the data to client.js
 * Any errors are logged to the _server_ console and a response 500 with error message is sent to client.js
 */

app.get("/weatherData", async function(req, res) {
  let url = "https://api.open-meteo.com/v1/forecast?latitude=" + req.query.lat + "&longitude=" + req.query.long + "&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,precipitation,rain,weather_code&current=weather_code,temperature_2m&timezone=America%2FChicago&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch";
  try {
    const apiResponse = await axios.get(url);
    res.send(apiResponse.data);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
})

app.get("/pokemonData", async function(req, res) {
  let url = "https://pokeapi.co/api/v2/pokemon/" + req.query.id;
  try {
    const apiResponse = await axios.get(url);
    res.send(apiResponse.data);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
})

app.get("/pokemonSpeciesData", async function(req, res) {
  let url = "https://pokeapi.co/api/v2/pokemon-species/" + req.query.id;
  try {
    const apiResponse = await axios.get(url);
    res.send(apiResponse.data);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
})

app.get("/oldWeatherData", async function(request, response) {
  const url = "https://api.open-meteo.com/v1/forecast?latitude=40.5142&longitude=-88.9906&hourly=temperature_2m,apparent_temperature,weather_code,wind_speed_10m,uv_index&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&forecast_days=1";
  try{
    const apiResponse = await axios.get(url);
    response.send(apiResponse.data);
  } catch (error){
    console.log(error.message);
    response.status(500).send(error.message);
  }
});

app.get("/yankeesData", async function(request, response) {
  const url = "https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/teams/10";
  try{
    const apiResponse = await axios.get(url);
    response.send(apiResponse.data);
  } catch (error){
    console.log(error.message);
    response.status(500).send(error.message);
  }
});

/*
 * API POST REQUEST
 * This is a request for some more complex API data
 * that uses an API key stored in .env
 * This function makes an API POST request with (optional) data, headers, and parameters.
 * If successful, it sends back a response with the data to client.js
 * Any errors are logged to the _server_ console and a response 500 with error message is sent to client.js
 */
app.get("/apiPost", async function(request, response) { 
  const url = "https://reqbin.com/echo/post/json";
  const data = {
    "Id": 101,
    "Name": "Some Person",
  };
  const options = {
    headers: {
      "Accept": 'application/json',
      "Content-Type": 'application/json'
    }  }
  try{
    const apiResponse = await axios.post(url, data, options);
    response.send(apiResponse.data);
  } catch (error){
    console.log(error.message);
    response.status(500).send(error.message);
  }
});



