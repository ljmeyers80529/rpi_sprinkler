const { ExecuteNonQuery, ExecuteScalar } = require('./Database');

const GetState = () => {
    const getData = `SELECT rainDelay, useWeatherConditions, zeroRunTemperature, autoRun,
                       location, latitude, longitude
                     FROM State`;
    return ExecuteScalar(getData);
}

const UpdateStateWeather = (rainDelay, zeroRun, useWeather, autoRun) => {
    const upd = `UPDATE State SET
                 rainDelay = ${rainDelay},
                 zeroRunTemperature = ${zeroRun},
                 useWeatherConditions = ${useWeather},
                 autorun = ${autoRun}`;
    return ExecuteNonQuery(upd);
};

const UpdateStateLocation = (location, latitude, longitude) => {
    const upd = `UPDATE State SET
                 location = '${location}',
                 latitude = ${latitude},
                 longitude = ${longitude}`;
    return ExecuteNonQuery(upd);
};

module.exports = { UpdateStateWeather, GetState, UpdateStateLocation };