const Router = require('express')
const { cartController } = require('../controllers/cart.controller')
const router = Router()

router.get('/cart/:userId', cartController.getProducts)
router.patch('/cart/add/:userId', cartController.addProductCart)
router.patch('/cart/inc/:userId', cartController.incProductCart)
router.patch('/cart/dec/:userId', cartController.decProductCart)
router.patch('/cart/delete/:userId', cartController.deleteProductCart)





module.exports = router