const Router = require('express')
const { favoriteController } = require('../controllers/favorite.controller')
const router = Router()

router.get('/favorite/:userId', favoriteController.getProducts)
router.patch('/favorite/add/:userId', favoriteController.addProductFavorite)
router.patch('/favorite/delete/:userId', favoriteController.deleteProductFavorite)



module.exports = router