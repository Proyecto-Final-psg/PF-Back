const express = require('express');
const category = require('./routes/route/category');
const product = require('./routes/route/product');
// const Category = require('../models/Category');
const Category = require('./models/Category')
// const {getCategories, createCategory, deleteCategory} = require('./routes/controller/functionCategory')
const app = express()
const cors = require("cors")
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())
const oilsApi = require('./oilsApi')
// const { getProducts, createProduct, getProductById, deleteProduct } = require('./routes/controller/functionsProduct')
const { createUser, findAllUsers, findOrCreate } = require('./routes/controller/functionsUser')

//////////DB///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const { sequelize } = require('./db/db')

////////SERVIDOR////////
let port = process.env.PORT || 8081
app.listen(port, () => {
    console.log('Server run on Port =>  ' + port)
    sequelize.sync({ force: true })
})
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/prueba', async (req, res) => {

    res.json("main")

})
// //////USER////////////
app.get('/getAllUsers', async (req, res) => {
    try {
        res.json(await findAllUsers())
    } catch (error) {
        res.status(401).json(error.message)
    }
})
app.post('/createUser', async (req, res) => {
    try {
        let { name, lastName, username, password, email, phone } = req.body
        res.json(await createUser(name, lastName, username, password, email, phone))
    } catch (error) {
        res.status(401).json(error.message)
    }
})


app.use('/', category)
app.use('/', product)






////////////Api-Oils//////////////////
app.get('/oils', async (req, res) => {
    res.json(oilsApi)
})

app.get('/productos', async (req, res) => {
    res.json(oilsApi)
})
//////Crear User/////////
app.post('/ath0log', async (req, res) => {
    try {
        let { email, name } = req.body
        let user_email = email
        let user_name = name
        let creado = await findOrCreate(user_email, user_name)
        res.json(creado)
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            name: error.name,
            msg: error.message
        })
    }

})