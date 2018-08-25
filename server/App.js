require('./database/Init');
const { AddNewProgram, GetProgramData } = require('./database/Program');

// const sDate = new Date();
// const eDate = new Date(sDate.getTime() + 5 * 24 * 3600000);

// console.log(sDate, ' : ', eDate);

// AddNewProgram('Program', sDate, eDate)
//     .catch((err) => {
//         console.log(err);
//     });

GetProgramData()
    .then(rows => {
        console.log(rows);
        rows.forEach(element => {
            console.log(element.name, new Date(element.startDate), new Date(element.endDate));
        });
    })
    .catch(err => console.log(err));

// const clean = require('./cleanup/Cleanup').Cleanup(db.closeDatabase);

// console.log(db.tableCreate1);
// console.log(db.tableCreate2);
// console.log(new Date(db.sd));
// console.log(new Date(db.ed));

// db.read()
//     .then((rows) => {
//         console.log(rows);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

// const v = async() => {
//     console.log('Before');
//     const rows = await db.read();
//     console.log('After');
//     console.log(rows);
// };

// v();