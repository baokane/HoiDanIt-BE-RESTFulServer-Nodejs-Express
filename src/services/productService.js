const Project = require('../models/project')
const aqp = require('api-query-params');

module.exports = {
    createProject: async (data) => {
        if (data.type === 'EMPTY-PROJECT') {
            let results = await Project.create(data)
            return results
        }
        if (data.type === 'ADD-USERS') {
            let myProject = await Project.findById(data.projectId).exec()

            //  thiếu check user đã có trong db chưa, nếu chưa có thì mới thêm vào
            for (let i = 0; i < data.usersArr.length; i++) {
                myProject.usersInfor.push(data.usersArr[i])
            }
            let newResult = await myProject.save()
            return newResult
        }
        if (data.type === 'ADD-TASKS') {
            let myProject = await Project.findById(data.projectId).exec()

            //  thiếu check user đã có trong db chưa, nếu chưa có thì mới thêm vào
            for (let i = 0; i < data.tasksArr.length; i++) {
                myProject.tasks.push(data.tasksArr[i])
            }
            let newResult = await myProject.save()
            return newResult
        }
        if (data.type === 'REMOVE-USERS') {
            let myProject = await Project.findById(data.projectId).exec()
            for (let i = 0; i < data.usersArr.length; i++) {
                myProject.usersInfor.pull(data.usersArr[i])
            }
            let newResult = await myProject.save()
            return newResult
        }
        return null
    },
    getProject: async (queryString) => {
        console.log("queryString:", queryString)
        const page = queryString.page
        const { filter, limit, population } = aqp(queryString);
        delete filter.page
        let offset = (page - 1) * limit
        result = await Project.find(filter)
            .populate(population)
            .skip(offset)
            .limit(limit)
            .exec()
        return result
    },
    uProject: async (uData) => {
        console.log('>>> req.body update:', uData)
        try {
            // let result = await Project.updateOne({
            //     id: uData.id,
            //     name: uData.name,
            //     startDate: uData.startDate,
            //     endDate: uData.endDate,
            //     description: uData.description
            // })

            let result = await Project.updateOne(
                {
                    id: uData.id,
                    name: uData.name,
                    startDate: uData.startDate,
                    endDate: uData.endDate,
                    description: uData.description
                },
            )
            return result
        } catch (error) {
            console.log('>>> error:', error)
            return null
        }
    },
    dProject: async (dData) => {
        console.log('>>> customerData delete:', dData)

        try {
            let result = await Project.delete({
                _id: dData.id
            })
            return result
        } catch (error) {
            console.log('>>> error:', error)
            return null
        }
    }
}