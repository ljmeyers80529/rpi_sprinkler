const { ExecuteScalar } = require('./Database');

const LastRowID = async () => {
    const rowID = await ExecuteScalar('SELECT last_insert_rowid() as ROWID');
    return rowID.ROWID;
}

module.exports = { LastRowID };