const Router = require('express')
const { productsController } = require('../controllers/products.contoller')
const router = Router() 

router.post('/products', productsController.createProducts)
router.get('/products/:category', productsController.getAllProducts) 


module.exports = router 