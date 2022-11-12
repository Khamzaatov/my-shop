const Router = require('express')
const { usersController } = require('../controllers/users.controller')
const router = Router()

router.get('/user/:userId', usersController.userFindOne)
router.post('/registration', usersController.registration)
router.post('/login', usersController.login)


module.exports = router