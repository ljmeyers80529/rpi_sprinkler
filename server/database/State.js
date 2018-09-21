const { ExecuteNonQuery, ExecuteScalar } = require('./Database');

const GetState = () => {
    const getData = `SELECT rainDelay, useWeatherConditions, zeroRunTemperature, autoRun
                     FROM state`;
    return ExecuteScalar(getData);
}

const UpdateState = (rainDelay, zeroRun, useWeather, autoRun) => {
    const upd = `UPDATE State SET
                 rainDelay = ${rainDelay},
                 zeroRunTemperature = ${zeroRun},
                 useWeatherConditions = ${useWeather},
                 autorun = ${autoRun}`;
    return ExecuteNonQuery(upd);
};

module.exports = { UpdateState, GetState };