const axios = require('axios');

const WeatherInformation = async (lat, long) => {
    const locURL = process.env.WEATHERURL + process.env.WEATHERAPIKEY + `/${lat},${long}`;
    const response = await axios.get(locURL);
    const data = {
        temperature: response.data.currently.temperature,
        humidity: response.data.currently.humidity,
        rainProbability: response.data.currently.precipProbability
    };
    return data;
};

module.exports = { WeatherInformation };
