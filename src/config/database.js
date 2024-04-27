require('dotenv').config()
const mysql = require('mysql2/promise');

// Create the connection to database
// const connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,  //default 3306
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,  // defalt: empty
//     database: process.env.DB_NAME, // name database
// });

// connection pool
const connection = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,  //default 3306
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,  // defalt: empty
    database: process.env.DB_NAME, // name database
    queueLimit: 0,
    waitForConnections: true,
    connectionLimit: 10

    // doc mới :
    // enableKeepAlive: true,
    // keepAliveInitialDelay: 0,
});


module.exports = connection