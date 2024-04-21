require('dotenv').config()

const express = require('express') // common js
// import express from 'express' // es modules
const app = express()

const path = require('path')

// @ts-ignore
const configViewEngine = require('./config/viewEngine')

const webRoute = require('./routes/web')

const port = process.env.PORT || 8888
const hostname = process.env.HOST_NAME

// config template engine
configViewEngine(app)

// khai báo route
app.use('/a', webRoute)

app.listen(port, hostname, () => {
    console.log(`Example app listening on port ${port}`)
})