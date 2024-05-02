const {
    createTask, getTask, uTask,
    dTask
} = require('../services/taskService')

module.exports = {
    postCreateTask: async (req, res) => {
        // req.send('project')
        console.log('>>> req.body task:', req.body)
        let results = await createTask(req.body)
        return res.status(200).json({
            EC: 0,
            data: results,
        })
    },
    getAllTask: async (req, res) => {
        let results = await getTask(req.query)
        return res.status(200).json({
            EC: 0,
            data: results,
        })
    },
    updateTask: async (req, res) => {
        let results = await uTask(req.body)
        return res.status(200).json({
            EC: 0,
            data: results,
        })
    },
    deleteTask: async (req, res) => {
        console.log('>>> req.body:', req.body.id)

        let results = await dTask(req.body)
        return res.status(200).json({
            EC: 0,
            data: results,
        })
    }
}