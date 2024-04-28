require('dotenv').config()
const mysql = require('mysql2/promise');
const mongoose = require('mongoose')

// Create the connection to database
// const connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,  //default 3306
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,  // defalt: empty
//     database: process.env.DB_NAME, // name database
// });

// connection pool
// const connection = mysql.createPool({
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,  //default 3306
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,  // defalt: empty
//     database: process.env.DB_NAME, // name database
//     queueLimit: 0,
//     waitForConnections: true,
//     connectionLimit: 10

//     // doc mới :
//     // enableKeepAlive: true,
//     // keepAliveInitialDelay: 0,
// });

const dbState = [{
    value: 0,
    label: "Disconnected"
},
{
    value: 1,
    label: "Connected"
},
{
    value: 2,
    label: "Connecting"
},
{
    value: 3,
    label: "Disconnecting"
}];


const connection = async () => {
    try {

        const option = {
            user: process.env.DB_USER,
            pass: process.env.DB_PASSWORD,
            dbName: process.env.DB_NAME
        }

        // await mongoose.connect('mongodb://root:123456@localhost:27018',option);
        await mongoose.connect(process.env.DB_HOST, option);
        const state = Number(mongoose.connection.readyState);
        console.log(dbState.find(f => f.value === state).label, "to database"); // connected to db
    } catch (error) {
        console.log('error connection DB: ', error)
    }
}

module.exports = connection