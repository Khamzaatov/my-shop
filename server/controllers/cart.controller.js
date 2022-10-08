const { findById } = require("../Models/Cart.model");
const Cart = require("../Models/Cart.model");
const Product = require("../Models/Product.model");
const User = require("../Models/User.model");

module.exports.cartController = {
    getProducts : async (req, res) => {
        const { userId } = req.params
        try {
            const setUser = await User.findById(userId)
            const setCart = await Cart.findOne({
                userId : setUser._id
            }).populate('products.productId')
            res.json(setCart)
        } catch (e) {
            res.json(e.message)
        }
    },
    addProductCart : async (req, res) => {
        const { product } = req.body
        const { userId } = req.params
        try {
            const setUser = await User.findById(userId)
            const setCart = await Cart.findOne({
                userId : setUser._id
            })
            const setProduct = await Product.findById(product)

            await Product.findByIdAndUpdate(product, {
                left : setProduct.left - 1
            })

            const cart = await Cart.findByIdAndUpdate(setCart._id, {
                $push : {
                    products : {
                        productId : product 
                    }
                } 
            }, { new: true }) 
            
            res.json(cart)
        } catch (e) {
            res.json(e.message)
        }
    },
    incProductCart : async (req, res) => {
        const { product } = req.body
        const { userId } = req.params
        try {
            const setUser = await User.findById(userId)
            const setCart = await Cart.findOne({
                userId : setUser._id
            })
            const setProduct = await Product.findById(product)
            const products = setCart.products.map((el) => {
                if (String(el.productId) === String(product)) {
                    el.amount += 1
                }
                return el
            })
            
            await Product.findByIdAndUpdate(product, {
                left : setProduct.left - 1
            })
            
            
            const setCart0 = await Cart.findByIdAndUpdate(setCart._id, {
                products
            }, {new : true})

            res.json(setCart0)

        } catch (e) {
            res.json(e.message)
        }
    },
    decProductCart : async (req, res) => {
        const { product } = req.body
        const { userId } = req.params
        try {
            const setUser = await User.findById(userId)
            const setCart = await Cart.findOne({
                userId : setUser._id
            })
            const setProduct = await Product.findById(product)
            const products = setCart.products.map((el) => {
                if (String(el.productId) === String(product)) {
                    el.amount -= 1
                }
                return el
            })

            await Product.findByIdAndUpdate(product, {
                left : setProduct.left + 1
            })

            const setCart0 = await Cart.findByIdAndUpdate(setCart._id, {
                products
            }, {new : true})

            res.json(setCart0)

        } catch (e) {
            res.json(e.message)
        }
    },
    deleteProductCart : async (req, res) => {
        const { product } = req.body
        const { userId } = req.params
        try {
            const setUser = await User.findById(userId)
            const setCart = await Cart.findOne({
                userId : setUser._id
            })
            const setProduct = await Product.findById(product)
            const products = setCart.products.filter((el) => {
                if (String(el.productId) !== String(product)) {
                   return el
                }
            })

            const removeProduct = setCart.products.filter((el) => {
                if (String(el.productId) === String(product)) {
                   return el
                }
            })

            await Product.findByIdAndUpdate(product, {
                left : setProduct.left + removeProduct[0].amount
            })
            
            const setCart0 = await Cart.findByIdAndUpdate(setCart._id, {
                products
            }, {new : true})
            res.json(setCart0)

        } catch (e) {
            res.json(e.message)
        }
    },
}