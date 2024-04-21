const getHomePage = (req, res) => {
    //process data
    //call model
    res.send('Hello World! nodemon okk')  // send :hàm express cho : gửi về string
}

const getABC = (req, res) => {
    res.send('abc')  // send :hàm express cho : gửi về string
}

const getHoiDanIt = (req, res) => {
    res.render('sample.ejs')
}

module.exports = {
    getHomePage, getABC, getHoiDanIt
}