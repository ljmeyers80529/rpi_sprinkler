const { ExecuteNonQuery, ExecuteQuery, ExecuteScalar } = require('./Database');
const { timeToInteger } = require('../utils/Utils');
const moment = require('moment');

const AddNewProgram = (name, startDate, endDate) => {
    const sTime = timeToInteger(startDate);
    const eTime = timeToInteger(endDate);

    const newProgram = `INSERT INTO Program (name, startDateTime, endDateTime)
                        VALUES ('${name}', ${sTime}, ${eTime})`;
    return ExecuteNonQuery(newProgram);
}

const GetProgramData = () => {
    const getData = `SELECT rowid, name, startDateTime, endDateTime
                     FROM Program`;
    return ExecuteQuery(getData);
}

const GetProgramEntry = (id) => {
    const getData = `SELECT name, startDateTime, endDateTime
                     FROM Program
                     WHERE rowid = ${id}`;
    return ExecuteScalar(getData);
}

const UpdateProgram = async (id, name, startDate, endDate) => {
    const updateProgram = `UPDATE Program SET
                           name='${name}',
                           startDateTime=${startDate},
                           endDateTime=${endDate}
                           WHERE rowid=${id}`;
    return ExecuteNonQuery(updateProgram);
}

const GetProgramIdUsingTodaysDate = async () => {
    const today = new Date(moment().local()).getTime();
    const getId = `SELECT rowid FROM Program
                   WHERE endDateTime >= ${today} AND startDateTime <= ${today}`;
    return ExecuteScalar(getId);
}

module.exports = { AddNewProgram, GetProgramData, GetProgramEntry, UpdateProgram, GetProgramIdUsingTodaysDate };