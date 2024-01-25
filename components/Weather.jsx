import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';

const WeatherStatus = () => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = 'bbef72fb8d03c05330921e348bb1ca8f';
        const city = 'Huddinge';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.ok) {
          const weatherData = {
            temperature: `${Math.ceil(data.main.temp)}°C`,
            feelsLike: `${Math.ceil(data.main.feels_like)}°C`,
            wind: `${data.wind.speed} m/s`,
            pressure: `${data.main.pressure} hPa`,
            icon: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
          };
          setWeather(weatherData);
        } else {
          console.error(`Failed to fetch weather. Status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };

    fetchWeather();
  }, []);

  return (
    <View>
      {weather ? (
        <View style={styles.weatherContainer}>
          <Text>Temperature: {weather.temperature}</Text>
          <Image source={{ uri: weather.icon }} style={{ width: 50, height: 50 }} />

          <Text>Details</Text>
          <Text>Feels like: {weather.feelsLike}</Text>
          <Text>Wind: {weather.wind}</Text>
          <Text>Pressure: {weather.pressure}</Text>
        </View>
      ) : (
        <Text>Loading weather...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  weatherContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  }
});



export default WeatherStatus;