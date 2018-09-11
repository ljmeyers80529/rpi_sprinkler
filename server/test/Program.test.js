require('../config/config');
const expect = require('expect');
const { AddNewProgram, GetProgramData } = require('../database/Program');

describe('Database program...', () => {
    const tv = 100;
    it('should be a number...', () => {
        expect(tv).toBe(100);
    });
});