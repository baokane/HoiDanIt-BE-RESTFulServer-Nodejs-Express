const path = require('path')
const express = require('express')

const configViewEngine = (app) => {
    app.set('views', path.join('./src', 'views')); // nơi lưu trũ file engine ejs
    app.set('view engine', 'ejs') // dùng template engine gì

    // config static file
    app.use(express.static(path.join('./src', 'public')))
}

module.exports = configViewEngine