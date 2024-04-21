const express = require('express')
const router = express.Router()
const { getHomePage, getABC, getHoiDanIt } = require('../controllers/homeController')

// theo doc : ko cần thằng app của express, chỉ cần router
// xử lí data : router.METHOD('/route, handler/controller)
router.get('/', getHomePage)
router.get('/abc', getABC)
router.get('/hoidanit', getHoiDanIt)

module.exports = router