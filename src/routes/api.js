const express = require('express')
const routerAPI = express.Router()
const {
    getUsersAPI, postCreateUserAPI, putUpdateUserAPI,
    deleteUserAPI, postUploadSingleFileAPI, postUploadMultipleFilesAPI,
} = require('../controllers/apiController')

const {
    postCreateCustomer, postArrayCustomer, getAllCustomers,
    putUpdateCustomers, deleteACustomers, deleteArrayCustomers,
} = require('../controllers/customerController')

const { postCreateProject, getAllProject } = require('../controllers/projectController')
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
routerAPI.post('/file', postUploadSingleFileAPI)
routerAPI.post('/files', postUploadMultipleFilesAPI)
routerAPI.post('/customers', postCreateCustomer)
routerAPI.post('/customers-many', postArrayCustomer)
routerAPI.get('/customers', getAllCustomers)
routerAPI.put('/customers', putUpdateCustomers)
routerAPI.delete('/customers', deleteACustomers)
routerAPI.delete('/customers-many', deleteArrayCustomers)
routerAPI.post('/projects', postCreateProject)
routerAPI.get('/projects', getAllProject)

routerAPI.get('/info', (req, res) => {
    console.log('>>> query:', req.query)
    return res.status(200).json({
        data: req.query
    })
})

routerAPI.get('/info/:nameeric/:address', (req, res) => {
    console.log('>>> query:', req.params)
    return res.status(200).json({
        data: req.params
    })
})

module.exports = routerAPI