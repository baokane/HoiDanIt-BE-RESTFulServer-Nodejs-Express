const mongoose = require('mongoose')
const mongoose_delete = require('mongoose-delete');

const customerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        address: String,
        phone: String,
        email: String,
        image: String,
        description: String,
    },
    {
        timestamps: true,

        // static method
        // statics: {
        //     findByHoiDanIT(name) {
        //         return this.find({ name: new RegExp(name, 'i') });
        //     }
        // }
    } // tự động thêm updatedAt, createdAt
);

// over right lib -> nhưng test lại thì lỗi nếu ghi đè, còn không ghi đè thì ko lỗi nữa(update customer ko lỗi)
// customerSchema.plugin(mongoose_delete, { overrideMethods: 'all' });
customerSchema.plugin(mongoose_delete,);

const Customer = mongoose.model('customer', customerSchema);

module.exports = Customer

