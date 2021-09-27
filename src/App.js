import "./App.css";
import React, { useState } from "react";
import keys from "./keys";

const api = {
  key: keys.API_KEY,
  base: keys.BASE_URL,
};

function App() {
  const dataBuild = (d) => {
    let date = String(new window.Date());
    date = date.slice(3, 15);
    return date;
  };

  const [query, setQuery] = useState("");
  const [weather, setweather] = useState({});

  const search = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
        .then((res) => res.json())
        .then((results) => {
          setQuery("");
          setweather(results);
          console.log(results);
        })
    }
  }

  return (
    <div className={
      typeof weather.main != "undefined"
        ? weather.main.temp > 35
          ? "App hot"
          : "App cold"
        : "App"
    }>
      <main>
        <div className="search-container">
          <input type="type" placeholder="Search" className="search-bar" onChange={(e) => setQuery(e.target.value)} value={query}
            onKeyPress={search}></input>
        </div>
        {typeof weather.main != "undefined" ? (
          <div className="location-container">
            <div className="location"> {weather.name}, {weather.sys.country}  </div>
            <div className="date"> {dataBuild(new Date())} </div>
            <div className="weather-container">
              <div className="temp">
                {Math.round(weather.main.temp)}°C
              </div>
              <div className="weather">
                {weather.weather[0].main}
                {weather.weather[0].description}
              </div>
              <div className="date">
                Feels like {Math.round(weather.main.feels_like)}°C <br />
                Temp Min : {Math.round(weather.main.temp_min)}°C
                Temp Max : {Math.round(weather.main.temp_max)}°C <br />
                Pressure : {Math.round(weather.main.pressure)} <br />
                Humidity : {Math.round(weather.main.humidity)}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div >
  );
}

export default App;