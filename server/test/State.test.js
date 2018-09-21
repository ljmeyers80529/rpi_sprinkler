require('../config/config');
const { db, ExecuteNonQuery } = require('../database/Database');
const expect = require('expect');
const state = require('../database/State');
const utils = require('../utils/Utils');

describe('Database state table...', () => {
    const rainTime = utils.dateTimeOffset(new Date().getTime(), 0, 11, 39);

    it('should update State data table...', async () => {
        const preset = {rainDelay: 0, useWeatherConditions: 1, zeroRunTemperature: 50, autorun: 0 };
        const updated = {rainDelay: new Date(rainTime).getTime(), useWeatherConditions: 0, zeroRunTemperature: 43, autorun: 1}

        let cState = await state.GetState();
        expect(cState).toMatchObject(preset);
        await state.UpdateState(updated.rainDelay, updated.zeroRunTemperature, updated.useWeatherConditions, updated.autorun);
        cState = await state.GetState();
        expect(cState).toMatchObject(updated);
    });

    after(() => {
        db.serialize(() => {
            ExecuteNonQuery('DELETE FROM State');
        });
    });
});


