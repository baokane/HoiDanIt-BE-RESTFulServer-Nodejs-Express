const connection = require('../config/database')
const { getAllUser, getUserById, updateUserById, deleteUserById } = require('../services/CRUDService')

const getHomePage = async (req, res) => {
    //process data
    let results = await getAllUser()
    // console.log('>>> ressult = ', results); // results contains rows returned by server
    //call model
    return res.render('home', { listUsers: results })
}

const getABC = (req, res) => {
    res.send('abc')  // send :hàm express cho : gửi về string
}

const getHoiDanIt = (req, res) => {
    res.render('sample.ejs')
}

const getCreatePage = (req, res) => {
    res.render('create.ejs')
}

const getUpdatePage = async (req, res) => {
    const userId = req.params.id
    // console.log('>>> ressult = ', userId); 
    let user = await getUserById(userId)

    res.render('edit.ejs', { userEdit: user })
}

const postUpdateUser = async (req, res) => {
    let email = req.body.email
    let name = req.body.myname
    let city = req.body.mycity
    let userId = req.body.userId
    console.log('>>> :', userId, name)
    await updateUserById(email, name, city, userId)
    // res.send('update success')
    res.redirect('/')
}

const postDeleteUser = async (req, res) => {
    const userId = req.params.id
    // console.log('>>> ressult = ', userId); 
    let user = await getUserById(userId)
    res.render('delete.ejs', { userEdit: user })
}

const postHandleRemoveUser = async (req, res) => {
    const id = req.body.userId

    await deleteUserById(id)

    res.redirect('/')
}

const postCreateUser = async (req, res) => {
    console.log('>>> :', req.body)

    // C2: let {email, name,city} = req.body
    let email = req.body.email
    let name = req.body.myname
    let city = req.body.mycity
    console.log(email, name, city);

    let [results, fields] = await connection.query(
        `INSERT INTO Users  (email, name, city) VALUES (?, ?, ?)`,
        [email, name, city]
    );

    console.log('>>> ressult = ', results); // results contains rows returned by server
    res.send('create success')

    // Bình thường :
    // connection.query(
    //     `INSERT INTO Users  (email, name, city)
    //     VALUES (?, ?, ?)`,
    //     [email, name, city],
    //     function (err, results) {
    //         res.send('create success')
    //     }
    // );

    // Callback :
    // connection.query(
    //         // 'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45',
    //         'select * from Users u',
    //         function (err, results, fields) {
    //             console.log('>>> ressult = ', results); // results contains rows returned by server
    //         }
    //     );

    // const [results, fields] =await connection.query('select * from Users u')
    // console.log('>>> ressult = ', results); // results contains rows returned by server

}

module.exports = {
    getHomePage, getABC, getHoiDanIt, postCreateUser,
    getCreatePage, getUpdatePage, postUpdateUser, postDeleteUser,
    postHandleRemoveUser
}