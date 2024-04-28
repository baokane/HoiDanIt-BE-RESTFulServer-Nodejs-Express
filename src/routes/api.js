const express = require('express')
const routerAPI = express.Router()
const { getUsersAPI, postCreateUserAPI, putUpdateUserAPI, deleteUserAPI } = require('../controllers/apiController')

// routerAPI.get('/', (req, res) => {
//     res.send('hello world with api')
// })

// routerAPI.get('/abc', (req, res) => {
//     res.status(201).json({
//         data: 'hello world first API'
//     })
// })

routerAPI.get('/user', getUsersAPI)
routerAPI.post('/user', postCreateUserAPI)
routerAPI.put('/user', putUpdateUserAPI)
routerAPI.delete('/user', deleteUserAPI)

module.exports = routerAPI