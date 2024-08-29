import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TextInput, Button } from 'react-native';
import axios from 'axios';

const App = () => {
  const [city, setCity] = useState('London');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = 'caaa5784c4b25e983f10c28f4a4d082b';  // Substitua com sua chave de API
  const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric', // Para obter a temperatura em Celsius
        },
      });
      setWeatherData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Ocorreu um erro: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={city}
        onChangeText={setCity}
        placeholder="Digite o nome da cidade"
      />
      <Button title="Buscar Clima" onPress={fetchWeatherData} />
      {weatherData && (
        <View style={styles.weatherContainer}>
          <Text style={styles.cityName}>{weatherData.name}</Text>
          <Text>Temperatura: {weatherData.main.temp} °C</Text>
          <Text>Descrição: {weatherData.weather[0].description}</Text>
          <Text>Umidade: {weatherData.main.humidity}%</Text>
          <Text>Vento: {weatherData.wind.speed} m/s</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
    width: '100%',
    paddingHorizontal: 8,
  },
  weatherContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  cityName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default App;
