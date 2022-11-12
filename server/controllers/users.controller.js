const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const Cart = require('../Models/Cart.model');
const Favorite = require('../Models/Favorite.model');
const User = require("../Models/User.model");

module.exports.usersController = {
    registration : async (req, res) => {
        const { email, password } = req.body
        try {
            const candidate = await User.findOne({ email })
            if (candidate) {
                return res.status(401).json('Пользователь с таким e-mail уже существует!')
            } else if (email.length === 0 || password.length === 0) {
                return res.status(401).json('Поле ввода не может бьть пустым!')
            } else if (password.length < 4 || password.length > 10) {
                return res.status(401).json('Пароль должен быть не меньше 4 и не больше 10 символов') 
            }
            const hash = await bcrypt.hash(password, 8)
            const user = await User.create({
                email,
                password : hash
            })
            Cart.create({
                userId : user._id
            })
            Favorite.create({
                userId : user._id
            })
            res.json(user)
        } catch (e) {
            res.status(404).json(e.message)
        }
    },
    
    login : async (req, res) => {
        const { email, password } = req.body
        try {
            const candidate = await User.findOne({ email })
            if (!candidate) {
                return res.status(401).json('Неверный логин!')
            }
            const valid = await bcrypt.compare(password, candidate.password)

            if (!valid) {
                return res.status(401).json('Неверный пароль!')
            }

            const payload = {
                id : candidate._id,
                login : candidate.login
            }

            const token = await jwt.sign(payload, process.env.SECRET_JWT_KEY, {
                expiresIn : '12h'
            })

            res.json({token,
                    user : candidate._id
            })

        } catch (e) {
            res.status(401).json(e.message)
        }
    },
    userFindOne : async (req, res) => {
        const { userId } = req.params
        try {
            const user = await User.findById(userId)
            res.json(user)
        } catch (err) {
            res.json(err.message)
        }
    }
}