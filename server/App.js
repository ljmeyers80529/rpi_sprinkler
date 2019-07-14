require('./config/config');
require('./database/Database');

// const cron = require('cron').CronJob;
// const moment = require('moment');
const express = require('express');
const http = require('http');
const socket = require('socket.io');

// const { AddNewProgram, GetProgramData } = require('./database/Program');

const app = express();
const server = http.createServer(app);
const io = socket(server);
// //const port = process.env.PORT || 4011;

// app.get('/', (req, res) => {
//     res.send('Index').status(200);
// });

// io.on("connection", socket => {
//     console.log('Connected');
//     socket.emit('FromAPI', {val1: 300, val2: 111});
//     socket.on('disconnect', () => {
//         console.log('Disconnected');
//     });
// });

// // const sDate = new Date();
// // const eDate = new Date(sDate.getTime() + 5 * 24 * 3600000);

// // // console.log(sDate, ' : ', eDate);

// // AddNewProgram('Program', sDate, eDate)
// //     .catch((err) => {
// //         console.log(err);
// //     });

// // GetProgramData()
// //     .then(rows => {
// //         console.log(rows);
// //         rows.forEach(element => {
// //             console.log(element.name, new Date(element.startDateTime), new Date(element.endDateTime));
// //         });
// //     })
// //     .catch(err => console.log(err));

// // const clean = require('./cleanup/Cleanup').Cleanup(db.closeDatabase);

// // console.log(db.tableCreate1);
// // console.log(db.tableCreate2);
// // console.log(new Date(db.sd));
// // console.log(new Date(db.ed));

// // db.read()
// //     .then((rows) => {
// //         console.log(rows);
// //     })
// //     .catch((err) => {
// //         console.log(err);
// //     });

// // const v = async() => {
// //     console.log('Before');
// //     const rows = await db.read();
// //     console.log('After');
// //     console.log(rows);
// // };

// // v();

// // const sDate = new Date();
// // const eDate = new Date(sDate.getTime() + 5 * 24 * 3600000);



// // const offMinutes = 7;
// // const offHours = 0;
// // const offDays = 0;

// // const offset = (offDays * 86400 + offHours * 3600 + offMinutes * 60) * 1000;
// // const nw = moment();
// // const n = new Date(nw).getTime() + offset;
// // const target = moment(new Date(n));

// // const h = target.hour();
// // const m = target.minute();
// // const d = target.date();
// // const mon = target.month();
// // console.log(nw, target, m, h, d, mon);

// // const mid = new cron(`0 ${m} ${h} ${d} ${mon} *`, () => {
// //     const d = moment();
// //     // const v = new Date(d).getTime();
// //     // const vd = moment(new Date(v));
// //     // const ds = new Date(d) + ' UTC';
// //     // const day = ds.day;
// //     console.log(d);
// //     // console.log(new Date(d));
// // })

// // mid.start();

server.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));
