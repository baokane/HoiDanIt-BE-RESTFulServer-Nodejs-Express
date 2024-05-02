const Task = require('../models/task')
const aqp = require('api-query-params');

module.exports = {
    createTask: async (data) => {
        if (data.type === 'EMPTY-TASK') {
            let results = await Task.create(data)
            return results
        }
        if (data.type === 'ADD-TASK') {
            let myProject = await Task.findById(data.projectId).exec()

            //  thiếu check user đã có trong db chưa, nếu chưa có thì mới thêm vào
            for (let i = 0; i < data.usersArr.length; i++) {
                myProject.usersInfor.push(data.usersArr[i])
            }
            let newResult = await myProject.save()
            return newResult
        }
        // if (data.type === 'REMOVE-USERS') {
        //     let myProject = await Project.findById(data.projectId).exec()
        //     for (let i = 0; i < data.usersArr.length; i++) {
        //         myProject.usersInfor.pull(data.usersArr[i])
        //     }
        //     let newResult = await myProject.save()
        //     return newResult
        // }
        return null
    },
    getTask: async (queryString) => {
        const page = queryString.page
        const { filter, limit, population } = aqp(queryString);
        console.log(queryString)
        delete filter.page
        let offset = (page - 1) * limit
        result = await Task.find(filter)
            .populate(population)
            .skip(offset)
            .limit(limit)
            .exec()
        return result
    },
    uTask: async (uData) => {
        // console.log('>>> customerData update:', uData)

        try {
            let result = await Task.updateOne({
                ...uData
            })
            return result
        } catch (error) {
            console.log('>>> error:', error)
            return null
        }
    },
    dTask: async (dData) => {
        try {
            let result = await Task.deleteById(dData.id)
            return result
        } catch (error) {
            console.log('>>> error:', error)
            return null
        }
    }
}