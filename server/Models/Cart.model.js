const mongoose = require('mongoose')
const cartSchema = mongoose.Schema({
    userId : {
        ref : 'User',
        type : mongoose.SchemaTypes.ObjectId
    },
    products : [
            mongoose.Schema({
                    productId : {
                        ref : 'Product',
                        type : mongoose.SchemaTypes.ObjectId
                    },
                    amount : {
                        type : Number,
                        default : 1
                    }
            })
    ],
    totalPrice : Number
})

const Cart = mongoose.model('Cart', cartSchema)


module.exports = Cart