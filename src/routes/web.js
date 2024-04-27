const express = require('express')
const router = express.Router()
const { getHomePage, getABC, getHoiDanIt, postCreateUser,
    getCreatePage, getUpdatePage, postUpdateUser, postDeleteUser,
    postHandleRemoveUser
} = require('../controllers/homeController')

// theo doc : ko cần thằng app của express, chỉ cần router
// xử lí data : router.METHOD('/route, handler/controller)
router.get('/', getHomePage)
router.get('/abc', getABC)
router.get('/hoidanit', getHoiDanIt)
router.get('/create', getCreatePage)
router.get('/update/:id', getUpdatePage)
router.post('/create-user', postCreateUser)
router.post('/update-user', postUpdateUser)
router.post('/delete-user/:id', postDeleteUser)
router.post('/delete-user', postHandleRemoveUser)

module.exports = router