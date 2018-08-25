const { ExecuteNonQuery, ExecuteQuery } = require('./Init');

const AddNewProgram = (name, startDate, endDate) => {
    console.log(`${startDate} -- ${endDate}`);
    const newProgram = `INSERT INTO Program (name, startDate, endDate)
                        VALUES ('${name}', ${startDate.getTime()}, ${endDate.getTime()})`;
    return ExecuteNonQuery(newProgram);
}

const GetProgramData = () => {
    const getData = `SELECT name, startDate, endDate
                     FROM Program`;
    return ExecuteQuery(getData);
}

module.exports = { AddNewProgram, GetProgramData }