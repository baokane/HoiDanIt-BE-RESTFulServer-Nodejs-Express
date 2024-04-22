const connection = require('../config/database')

const getHomePage = (req, res) => {
    //process data
    //call model
    connection.query(
        // 'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45',
        'select * from Users u',
        function (err, results, fields) {
            const user = results
            console.log('>>> ressult = ', results); // results contains rows returned by server
            // console.log('>>> fields = ', fields); // fields contains extra meta data about results, if available
            res.send(JSON.stringify(user))
        }
    );  // send :hàm express cho : gửi về string
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