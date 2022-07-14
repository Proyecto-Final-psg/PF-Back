const express = require('express');
const category = require('./routes/category');
const product = require('./routes/product');
const user = require('./routes/user')
const app = express()
const cors = require("cors")
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())

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

app.use('/', user)
app.use('/', category)
app.use('/products', product)

//////////////////////////

app.post('/addOrder', async (req, res) => {
    try {
        let { user_id, address, status, arrayItems } = req.body

        let user = await User.findOne({ where: { user_id: user_id } })

        var nuevaOrder = await Order.create({
            "address": address,
            "status": status
        })

        nuevaOrder.setUser(user)
        // nuevaOrder.save()

        for (let i = 0; i < arrayItems.length; i++) {

            let orderItem = await OrderItem.create({
                quantity: arrayItems[i].quantity,
                price: arrayItems[i].price
            })
            let product = await Product.findOne({ where: { id: arrayItems[i].product_id } })

            orderItem.setProduct(product)

            orderItem.setOrder(nuevaOrder)
        }
        res.json("Order cargada correctamente")

    } catch (error) {
        console.log(error)
        return res.status(400).send({
            name: error.name,
            msg: error.message
        })
    }
})



app.get('/getOrders/:user_id', async (req, res) => {
    let { user_id } = req.params

    try {
        let listaDordenes = []
        let user = await User.findOne({ where: { user_id: user_id } })
        let ordenes = await user.getOrders({ include: OrderItem })

        for (let i = 0; i < ordenes.length; i++) {

            let orden = ordenes[i].dataValues

            let ordenUser = {
                order_id: orden.id,
                user_id: orden.userUserId,
                address: orden.address,
                status: orden.status,
                arrayItems: []
            }

            let items = ordenes[i].dataValues.order_items

            for (let j = 0; j < items.length; j++) {

                let product_id = items[j].dataValues.productId
                let producto = await Product.findOne({ where: { id: product_id } })

              

                producto.dataValues.quantity = items[j].dataValues.quantity


                ordenUser.arrayItems.push(producto.dataValues)
            }
            listaDordenes.push(ordenUser)

        }
        res.json(listaDordenes)
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            name: error.name,
            msg: error.message
        })
    }


})

