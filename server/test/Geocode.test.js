const expect = require('expect');
const geocode = require('../Geocode/Geocode');

describe('Location...', () => {

    it('should retrieve geocode information...', async () => {
        const loc = await geocode.Location('Fresno, CA');
        const lat = parseFloat(loc.results[0].geometry.location.lat);
        const lng = parseFloat(loc.results[0].geometry.location.lng);

        expect(loc.results[0].formatted_address).toBe('Fresno, CA, USA');
        expect(lat === 36.7377981).toBeTruthy();
        expect(lng === -119.7871247).toBeTruthy();
    });
});
