const Favorite = require("../Models/Favorite.model");
const User = require("../Models/User.model");

module.exports.favoriteController = {
    getProducts : async (req, res) => {
        const { userId } = req.params
        try {
            const setUser = await User.findById(userId)
            const setFavorite = await Favorite.findOne({
                userId : setUser._id
            }).populate('products')
            res.json(setFavorite)
        } catch (e) {
            res.json(e.message)
        }
    },
    addProductFavorite : async (req, res) => {
        const { product } = req.body
        const { userId } = req.params
        try {
            const setUser = await User.findById(userId)
            const setFavorite = await Favorite.findOne({
                userId : setUser._id
            })

            const cart = await Favorite.findByIdAndUpdate(setFavorite._id, {
                $push : {
                    products : product 
                } 
            }, { new: true }) 
            
            res.json(cart)
        } catch (e) {
            res.json(e.message)
        }
    },
    deleteProductFavorite : async (req, res) => {
        const { product } = req.body
        const { userId } = req.params
        try {
            const setUser = await User.findById(userId)
            const setFavorite = await Favorite.findOne({
                userId : setUser._id
            })
            const products = setFavorite.products.filter((el) => {
                if (String(el) !== String(product)) {
                   return el
                }
            })
            
            const setFavorite0 = await Favorite.findByIdAndUpdate(setFavorite._id, {
                products
            }, {new : true})
            res.json(setFavorite0)

        } catch (e) {
            res.json(e.message)
        }
    },
}