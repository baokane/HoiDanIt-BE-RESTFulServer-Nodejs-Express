const { uploadSingleFile } = require('../services/fileService')
const {
    createCustomerService, createArrayCustomerService, getAllCustomerService,
    putUpdateCustomerService, deleteACustomerService, deleteArrayCustomersService
} = require('../services/customerService')

const Joi = require('joi');

module.exports = {
    postCreateCustomer: async (req, res) => {
        const { name, address, phone, email, description } = req.body
        console.log(name, address)

        // Joi lib
        const schema = Joi.object({
            name: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required(),

            address: Joi.string(),
            phone: Joi.string().pattern(new RegExp('^[0-9]{8,11}$')),
            email: Joi.string().email(),
            description: Joi.string(),
        })
        const { error } = schema.validate(req.body, { abortEarly: false });
        // console.log('>>> Joi:', result)
        if (error) {
            return res.status(200).json({
                msg: error
            })
        } else {
            let imageUrl = ''
            if (!req.files || Object.keys(req.files).length === 0) {
                return res.status(400).send('No files were uploaded.');
            } else {
                let result = await uploadSingleFile(req.files.image)
                imageUrl = result.path
                console.log('result: ', result)
            }
            let customerData = { name, address, phone, email, description, image: imageUrl }
            let customer = await createCustomerService(customerData)

            return res.status(200).json({
                EC: 0,
                data: customer,
            })
        }
    },
    postArrayCustomer: async (req, res) => {
        let customers = await createArrayCustomerService(req.body.customers)
        if (customers) {
            return res.status(200).json({
                EC: 0,
                data: customers,
            })
        } else {
            return res.status(200).json({
                EC: -1,
                data: customers,
            })
        }
    },
    getAllCustomers: async (req, res) => {
        let limit = req.query.limit
        let page = req.query.page
        let name = req.query.name
        console.log(limit, page)
        let result = null

        if (limit && page) {
            // C1: kiểu thổ dân
            // result = await getAllCustomerService(limit, page, name)

            // C2: lib
            result = await getAllCustomerService(limit, page, name, req.query)
        } else {
            result = await getAllCustomerService()
        }

        if (result) {
            return res.status(200).json({
                EC: 0,
                data: result,
            })
        }
    },
    putUpdateCustomers: async (req, res) => {
        const { id, name, email, address } = req.body
        console.log('req.body: ', req.body)
        let customerData = { id, name, email, address }
        // let result = await putUpdateCustomerService(id, name, email, address)
        let result = await putUpdateCustomerService(customerData)

        // console.log('customers: ', result)

        if (result) {
            return res.status(200).json({
                EC: 0,
                data: result,
            })
        }
    },
    deleteACustomers: async (req, res) => {
        let id = req.body.id
        console.log(id)
        let result = await deleteACustomerService(id)
        // console.log('result:', result)

        return res.status(200).json({
            EC: 0,
            data: result,
        })

    },
    deleteArrayCustomers: async (req, res) => {
        let ids = req.body.customersId
        console.log('ids:', ids)
        let result = await deleteArrayCustomersService(ids)
        return res.status(200).json({
            EC: 0,
            data: result,
        })
    }
}