const Product = require("../Models/Product.model");

module.exports.productsController = {
    createProducts : async (req, res) => {
        const { name, price, category, img, left, photos } = req.body
        try {
            const product = await Product.create({
                name,
                price,
                category,
                img,
                left,
                photos
            })
            res.json(product)
        } catch (e) {
            res.json(e.message)
        }
    },
    getAllProducts : async (req, res) => {
        const { category } = req.params
        try {
            let data
            if (category === 'Все') {
                data = await Product.find({})
            } else {
                data = await Product.find({ category })
            }
            res.json(data)
        } catch (e) {
            res.json(e.message)
        }
    }
}