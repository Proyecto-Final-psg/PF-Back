require('dotenv').config()

const axios = require('axios');
const express = require('express');
const category = require('./routes/category');
const mailer = require('./routes/mailer');
const product = require('./routes/product');
const user = require('./routes/user')
const order = require('./routes/order')
const mercadoPago = require('./routes/mercadoPago')
const reviews = require('./routes/reviews')
const favorites = require('./routes/favorites')
const discounts = require('./routes/discounts')
const app = express()
const cors = require("cors")
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())

///////////////////////////-----DB------///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const { sequelize } = require('./db/db')
////////SERVIDOR////////
let port = process.env.PORT || 8081
app.listen(port, () => {
    console.log('Server run on Port =>  ' + port)
    sequelize.sync({ alter: true })
})
//////////////////////-------Jason Token------//////////////////////////////////////////////////////////////////////////////////
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
const jwtCheck = jwt.expressjwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-sdz9neh5.us.auth0.com/.well-known/jwks.json'
    }),
    audience: 'this is a unique identifier',
    issuer: 'https://dev-sdz9neh5.us.auth0.com/',
    algorithms: ['RS256']
}).unless({ path: ['/'] })
// app.use(jwtCheck);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.use('/', user)
app.use('/', mailer)
app.use('/', order)
app.use('/', category)
app.use('/', mercadoPago)
app.use('/products', product)
app.use('/', reviews)
app.use('/', favorites)
app.use('/', discounts)
//////////////---------MERCADO  PAGO-----------///////////////////

app.get('/pruebaPost', async (req, res) => {
    try {
        console.log(req.user)
        const accesToken = req.body.headers.authorization.split(' ')[1]
        const response = await axios.get('https://dev-sdz9neh5.us.auth0.com/userinfo', {
            headers: {
                authorization: `Bearer ${accesToken}`
            }
        })
        const userInfo = response.data
        res.status(200).send("done")
    } catch (error) {
        console.log(error)
        res.status(401).json(error.message)
    }
})
app.post('/pruebaGet', async (req, res) => {
    try {

        res.status(200).json({ "probando": "soy prueba" })
    } catch (error) {
        console.log(error)
        res.status(401).json(error.message)
    }
})
