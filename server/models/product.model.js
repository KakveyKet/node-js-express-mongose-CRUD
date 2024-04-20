const mongoose = require('mongoose');
const ProductSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please Entet the product name"]
        },
        quantity: {
            type: Number,
            required: [true, "Please Entet the product qty"],
            default: 0
        }
        ,
        price: {
            type: Number,
            required: [true, "Please Entet the product price"],
            default: 0
        },
        image: {
            type: String,
            required: false
        }
    },
    {
        timestamep: true
    }
)
const Product = mongoose.model('Product', ProductSchema);

module.exports = Product
