const User = require('../models/user.js')
const { uploadSingleFile, uploadMultipleFiles } = require('../services/fileService')

const getUsersAPI = async (req, res) => {
    let results = await User.find({})
    return res.status(200).json({
        EC: 0,
        data: results,
    })
}

const postCreateUserAPI = async (req, res) => {
    console.log('>>> :', req.body)

    // C2: let {email, name,city} = req.body
    let email = req.body.email
    let name = req.body.myname
    let city = req.body.city

    let user = await User.create({
        email,
        name,
        city
    })
    return res.status(200).json({
        EC: 0,
        data: user,
    })
}

const putUpdateUserAPI = async (req, res) => {
    let email = req.body.email
    let name = req.body.myname
    let city = req.body.city
    let userId = req.body.userId
    // await updateUserById(email, name, city, userId)
    let user = await User.updateOne({ _id: userId }, { email: email, name: name, city: city });
    return res.status(200).json({
        EC: 0,
        data: user,
    })
}

const deleteUserAPI = async (req, res) => {
    const id = req.body.userId

    let results = await User.deleteOne({ _id: id }); // returns {deletedCount: 1} : success , = 0 : fail
    return res.status(200).json({
        EC: 0,
        data: results,
    })
}

const postUploadSingleFileAPI = async (req, res) => {
    console.log('req.files: ', req.files)
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    let result = await uploadSingleFile(req.files.image)
    console.log('>>> result: ', result)

    // return res.send('uploaded')
    return res.status(200).json({
        status: 'success',
        path: result.path,
        error: null
    })
}

const postUploadMultipleFilesAPI = async (req, res) => {
    console.log('req.files: ', req.files)

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    if (Array.isArray(req.files.image)) {
        let result = await uploadMultipleFiles(req.files.image)
        return res.status(200).json({
            status: 'success',
            data: result
        })
    } else {
        await postUploadSingleFileAPI(req, res)
    }
}

module.exports = {
    getUsersAPI, postCreateUserAPI, putUpdateUserAPI,
    deleteUserAPI, postUploadSingleFileAPI, postUploadMultipleFilesAPI
}