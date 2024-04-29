require('dotenv').config()

const express = require('express') // common js
// import express from 'express' // es modules

const configViewEngine = require('./config/viewEngine')

const webRoutes = require('./routes/web')
const apiRoutes = require('./routes/api')
const fileUpload = require('express-fileupload');

const connection = require('./config/database')

const app = express()
const port = process.env.PORT || 8888
const hostname = process.env.HOST_NAME

const path = require('path')
// config file upload
app.use(fileUpload());

// config req.body
app.use(express.json()) // json (obj)
app.use(express.urlencoded({ extended: true })) // form data

// config template engine
configViewEngine(app)

// create database with mongoose
// const cat = new Kitten({ name: 'Hoi Dan IT model' });
// cat.save()

// khai báo route
app.use('/', webRoutes)
app.use('/v1/api/', apiRoutes)
    // test connection
    // có dấu ; (chấm phẩy)
    ; (async () => {
        try {
            //error thì ko chạy nứa, tức là ra error và ko chạy code ở dưới nứa
            await connection();
            app.listen(port, hostname, () => {
                console.log(`Bachend zero app listening on port ${port}`)
            })
        } catch (error) {
            console.log('>>> error connect to db: ', error)
        }

    })();

// A simple SELECT query
// connection.query(
//     // 'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45',
//     'select * from Users u',
//     function (err, results, fields) {
//         console.log('>>> ressult = ', results); // results contains rows returned by server
//         // console.log('>>> fields = ', fields); // fields contains extra meta data about results, if available
//     }
// );

// app.listen(port, hostname, () => {
//     console.log(`Example app listening on port ${port}`)
// })