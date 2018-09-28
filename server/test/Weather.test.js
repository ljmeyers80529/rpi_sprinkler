const Weather = require('../Weather/Weather');
const expect = require('expect');

describe('Weather...', () => {

    it('should retrieve weather information...', async () => {
        const w = await Weather.WeatherInformation(36.7377981,-119.7871247);
        expect(w).toBeDefined();
    });
});
