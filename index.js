const express = require('express');
const category = require('./routes/category');
const product = require('./routes/product');
const user = require('./routes/user')
const order = require('./routes/order')
const mercadoPago = require('./routes/mercadoPago')
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
    sequelize.sync({alter: true })
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
}).unless({ path: ['/prueba'] })
// app.use(jwtCheck);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.use('/', user)
app.use('/', order)
app.use('/', category)
app.use('/', mercadoPago)
app.use('/products', product)
//////////////---------MERCADO  PAGO-----------///////////////////


