const { ExecuteNonQuery, ExecuteQuery } = require('./Database');
const { timeToInteger } = require('../utils/Utils');

const AddNewProgram = (name, startDate, endDate) => {
    const sTime = timeToInteger(startDate);
    const eTime = timeToInteger(endDate);

    const newProgram = `INSERT INTO Program (name, startDateTime, endDateTime)
                        VALUES ('${name}', ${sTime}, ${eTime})`;
    return ExecuteNonQuery(newProgram);
}

const GetProgramData = () => {
    const getData = `SELECT id, name, startDateTime, endDateTime
                     FROM Program`;
    return ExecuteQuery(getData);
}

module.exports = { AddNewProgram, GetProgramData };