const express = require('express');
const category = require('./routes/category');
const product = require('./routes/product');
const user = require('./routes/user')
const order = require('./routes/order')
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
///////////////////-------Jason Token------///////////////////////////////
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
app.use('/', order)
app.use('/', category)
app.use('/products', product)


//////////////---------MERCADO  PAGO-----------///////////////////

app.post("/orderMercadoPago", async (req, res) => {
    let { title, unit_price, quantity } = req.body
    let preference = {
        items: [
            {
                title: title,
                unit_price: Number(unit_price),
                quantity: Number(quantity),
            }
        ] 
    }
    const respuesta = await mercadopago.preferences.create(preference)
    res.json(respuesta)
});
app.get('/feedback', function (req, res) {
    res.json({
        Payment: req.query.payment_id,
        Status: req.query.status,
        MerchantOrder: req.query.merchant_order_id
    });
});


