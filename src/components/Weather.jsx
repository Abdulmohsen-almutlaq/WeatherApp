import { useState, useEffect } from "react";
import "./Weather.css";

const Weather = ({ city = "New York" }) => {
    const [cityName, setCityName] = useState(city);
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const fetchWeather = async (cityToFetch) => {
        setLoading(true);
        const apiKey = "f17689fe7fe3a69bd57650ec2b345037";
        try {
            const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityToFetch}&units=metric&appid=${apiKey}`);
            const weatherData = await weatherResponse.json();
            if (weatherData.cod === 200) {
                setWeatherData(weatherData.main);
            } else {
                alert("No weather data is available for " + cityToFetch);
            }
        } catch (error) {
            alert("Error fetching weather data: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Load weather data for default city when component mounts only, not on every cityName change
        fetchWeather(city);
    }, []); // Empty dependency array = only run once on mount

    const handleChange = (e) => {
        setCityName(e.target.value);
    };    

    const handleClick = () => {
        fetchWeather(cityName);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            fetchWeather(cityName);
        }
    };
    
    return (
        <div>
            <h1>Weather App</h1>
            <input 
                type="text" 
                placeholder="Enter city name" 
                value={cityName}
                onChange={handleChange} 
                onKeyDown={handleKeyDown}
            />
            <button onClick={handleClick}>Get Weather</button>
            {loading && <p>Loading...</p>}
            {weatherData && (
                <div>
                    <h2>Weather in {cityName}</h2>
                    <p>Temperature: {weatherData.temp}°C</p>
                    <p>Min Temperature: {weatherData.temp_min}°C</p>
                    <p>Max Temperature: {weatherData.temp_max}°C</p>
                </div>
            )}
        </div>
    );
};

export default Weather;