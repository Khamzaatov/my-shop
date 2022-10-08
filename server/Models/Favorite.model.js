const mongoose = require('mongoose')
const favoriteSchema = mongoose.Schema({
    userId : {
        ref : 'User',
        type : mongoose.SchemaTypes.ObjectId
    },
    products : [
        {
            ref : 'Product',
            type : mongoose.SchemaTypes.ObjectId
        }
    ]
})

const Favorite = mongoose.model('Favorite', favoriteSchema)


module.exports = Favorite