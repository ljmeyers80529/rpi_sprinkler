const { ExecuteNonQuery, ExecuteQuery, ExecuteScalar } = require('./Database');
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

const GetProgramEntry = (id) => {
    const getData = `SELECT name, startDateTime, endDateTime
                     FROM Program
                     WHERE id = ${id}`;
    return ExecuteScalar(getData);
}

const UpdateProgram = async (id, name, startDate, endDate) => {
    const updateProgram = `UPDATE Program SET
                           name='${name}',
                           startDateTime=${startDate},
                           endDateTime=${endDate}
                           WHERE id=${id}`;
    return ExecuteNonQuery(updateProgram);
}

module.exports = { AddNewProgram, GetProgramData, GetProgramEntry, UpdateProgram };