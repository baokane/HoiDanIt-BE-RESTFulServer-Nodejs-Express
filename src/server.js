const express = require('express') // common js
// import express from 'express' // es modules
const path = require('path')
const app = express()
const port = 8081

// config template engine
app.set('views', path.join(__dirname, 'views')); // nơi lưu trũ file engine ejs
app.set('view engine', 'ejs') // dùng template engine gì

// khai báo route
app.get('/', (req, res) => { // nodejs cho sẵn
    res.send('Hello World!')  // send :hàm express cho : gửi về string
})

app.get('/abc', (req, res) => {
    res.send('check abc')
})

app.get('/hoidanit', (req, res) => {
    res.render('sample')  // render :hàm express cho : gửi về file ejs
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})