const Customer = require('../models/customer')

const createCustomerService = async (customerData) => {
    try {
        let result = await Customer.create({
            name: customerData.name,
            address: customerData.address,
            phone: customerData.phone,
            email: customerData.email,
            description: customerData.description,
            image: customerData.image,
        })
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

const createArrayCustomerService = async (arr) => {
    try {
        let result = await Customer.insertMany(arr)
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

const getAllCustomerService = async () => {
    try {
        let result = await Customer.find({})
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

const putUpdateCustomerService = async (customerData) => {
    try {
        let result = await Customer.updateOne({
            _id: customerData.id,
            name: customerData.name,
            email: customerData.email,
            address: customerData.address,
        })
        return result
    } catch (error) {
        console.log('>>> error:', error)
        return null
    }
}

const deleteACustomerService = async (id) => {
    try {
        let result = await Customer.deleteById(id)
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

const deleteArrayCustomersService = async (arrIds) => {
    console.log('arrIds:', arrIds)
    try {
        let result = await Customer.delete({ _id: { $in: arrIds } })
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

module.exports = {
    createCustomerService, createArrayCustomerService, getAllCustomerService,
    putUpdateCustomerService, deleteACustomerService, deleteArrayCustomersService
}

