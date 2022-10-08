const dotenv = require('dotenv')
dotenv.config()

const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')

const app = express()


app.use(express.json())
app.use(cors())
app.use(require('./routes/cart.route'))
app.use(require('./routes/products.route'))
app.use(require('./routes/users.route'))
app.use(require('./routes/favorite.route'))


mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log('Успешно соединились с сервером MongoDB'))
  .catch(() => console.log('Ошибка при соединении с сервером MongoDB')) 


app.listen(process.env.PORT, () => {
    console.log('Сервер запущен!')
})
