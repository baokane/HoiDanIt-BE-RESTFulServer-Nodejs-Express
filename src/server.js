require('dotenv').config()

const express = require('express') // common js
// import express from 'express' // es modules

const configViewEngine = require('./config/viewEngine')

const webRoute = require('./routes/web')
const connection = require('./config/database')

const app = express()
const port = process.env.PORT || 8888
const hostname = process.env.HOST_NAME

const path = require('path')
// config req.body
app.use(express.json()) // json (obj)
app.use(express.urlencoded({ extended: true })) // form data

// config template engine
configViewEngine(app)

// khai báo route
app.use('/', webRoute)

// A simple SELECT query
// connection.query(
//     // 'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45',
//     'select * from Users u',
//     function (err, results, fields) {
//         console.log('>>> ressult = ', results); // results contains rows returned by server
//         // console.log('>>> fields = ', fields); // fields contains extra meta data about results, if available
//     }
// );

app.listen(port, hostname, () => {
    console.log(`Example app listening on port ${port}`)
})