const { createProject, getProject } = require('../services/productService')

module.exports = {
    postCreateProject: async (req, res) => {
        // req.send('project')
        console.log('>>> req.body controller:', req.body)
        let results = await createProject(req.body)
        return res.status(200).json({
            EC: 0,
            data: results,
        })
    },
    getAllProject: async (req, res) => {
        let results = await getProject(req.query)
        return res.status(200).json({
            EC: 0,
            data: results,
        })
    }
}