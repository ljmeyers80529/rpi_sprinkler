require('../config/config');
const database = require('../database/Database');
const expect = require('expect');
const state = require('../database/State');
const utils = require('../utils/Utils');

describe('Database state table...', () => {
    const rainTime = utils.dateTimeOffset(new Date().getTime(), 0, 11, 39);

    it('should update State data table - weather...', async () => {
        const preset = {rainDelay: 0, zeroRunTemperature: 50, useWeatherConditions: 1, autorun: 0 };
        const wUpd = {rainDelay: new Date(rainTime).getTime(), zeroRunTemperature: 43, useWeatherConditions: 0, autorun: 1};

        let cState = await state.GetState();
        expect(cState).toMatchObject(preset);
        await state.UpdateStateWeather(wUpd.rainDelay, wUpd.zeroRunTemperature, wUpd.useWeatherConditions, wUpd.autorun);
        cState = await state.GetState();
        expect(cState).toMatchObject(wUpd);
    });

    it('should update State data table - location...', async () => {
        const preset = {location: '', latitude: 0.0, longitude: 0.0 };
        const lUpd = {location: 'Fresno, CA', latitude: 36.7377981, longitude: -119.7871247 };

        let cState = await state.GetState();
        expect(cState).toMatchObject(preset);
        await state.UpdateStateLocation(lUpd.location, lUpd.latitude, lUpd.longitude);
        cState = await state.GetState();
        expect(cState).toMatchObject(lUpd);
    });

    after( async () => {
        await state.UpdateStateWeather(0, 50, true, false);
        await state.UpdateStateLocation('', 0.0, 0.0);
        });
});


