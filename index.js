const express = require('express');
const category = require('./routes/route/category');
const product = require('./routes/route/product');
const user = require('./routes/route/user')
// const Category = require('../models/Category');
const Category = require('./models/Category')
// const {getCategories, createCategory, deleteCategory} = require('./routes/controller/functionCategory')
const app = express()
const cors = require("cors")
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// const { getProducts, createProduct, getProductById, deleteProduct } = require('./routes/controller/functionsProduct')
const { findAllUsers, findOrCreate } = require('./routes/controller/functionsUser')

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
})
// app.use(jwtCheck);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/prueba', async (req, res) => {
    res.json("develop")
})

// //////USER////////////


app.use('/', user)
app.use('/', category)
app.use('/', product)

