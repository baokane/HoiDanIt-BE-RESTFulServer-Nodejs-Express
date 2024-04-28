const User = require('../models/user')

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

module.exports = { getUsersAPI, postCreateUserAPI, putUpdateUserAPI, deleteUserAPI }