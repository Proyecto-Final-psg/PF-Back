const express = require('express');
const category = require('./routes/category');
const product = require('./routes/product');
const user = require('./routes/user')
const app = express()
const cors = require("cors")
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())
const { createOrder } = require('./controllers/orders/functionOrders')
const Product = require('./models/Product')
const Order = require('./models/Order')
const OrderItem = require('./models/OrderItem')
const User = require('./models/Users')


//////////DB///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const { sequelize } = require('./db/db')
////////SERVIDOR////////
let port = process.env.PORT || 8081
app.listen(port, () => {
    console.log('Server run on Port =>  ' + port)
    sequelize.sync({ alter: true })
})
///////////////////Jason Token///////////////////////////////
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
}).unless({ path: ['/prueba'] })
// app.use(jwtCheck);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/prueba', async (req, res) => {
    try {
        res.json("develop")
    } catch (error) {
        res.status(400).send(error.message)
    }
})
app.use('/', user)
app.use('/', category)
app.use('/products', product)


//////////////////////////


app.post('/addOrder', async (req, res) => {
    let { user_id, address, status, arrayItems } = req.body

    let user = await User.findOne({ where: { user_id: user_id } })

    var nuevaOrder = await Order.create({
        "address": address,
        "status": status
    })
    nuevaOrder.setUser(user)
    nuevaOrder.save()

    for (let i = 0; i < arrayItems.length; i++) {

        let orderItem = await OrderItem.create({
            quantity: arrayItems[i].quantity,
            price: arrayItems[i].price
        })
        let product = await Product.findOne({ where: { id: arrayItems[i].product_id } })

        orderItem.setProduct(product)
        orderItem.save()

        orderItem.setOrder(nuevaOrder)

    }


    res.json("don")

})

