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
// CATEGORY
//get categories routes
// app.get('/category', async (req, res) => {
//     try {
//         res.status(200).json(await getCategories())
//     } catch (error) {
//         console.log(error)
//     }
// })

app.use('/', category)
app.use('/', product)

//post create category routes
// app.post('/category', async (req, res) => {
//     let { category } = req.body
//     try {
//         res.status(200).json(await createCategory(category))
//     } catch (error) {
//         console.log(error)
//     }})

// delete category routes
// app.delete('/category/:id', async (req, res) =>{
//     let { id } = req.params
//     try {
//         res.status(201).json(await deleteCategory(id))
//     } catch (error) {
//         console.log(error)
//     }
// })
// // update category routes
// app.put('/category/:id', async (req, res) =>{
//     let { id } = req.params
//     try {
//         res.status(201).json(await deleteCategory(id))
//     } catch (error) {
//         console.log(error)
//     }
// })

/// PRODUCTS ////
// app.get('/products', async (req, res) => {
//     let { name } = req.query
//     try {
//         res.json(await getProducts(name))
//     } catch (error) {
//         res.status(401).json(error.message)
//     }
// })
// app.post('/products', async (req, res) => {
//     try {
//         let { name, stock, price, img, type, description, thc, cbd, cannabis, hashOil } = req.body
//         res.json(await createProduct(name, stock, price, img, type, description, thc, cbd, cannabis, hashOil))
//     } catch (error) {
//         res.status(401).json(error.message)
//     }
// })
// app.get('/products/:id', async (req, res) => {
//     try {
//         let { id } = req.params
//         res.json(await getProductById(id))
//     } catch (error) {
//         res.status(401).json(error.message)
//     }
// })
// app.delete('/products/:id', async (req, res) => {
//     try {
//         let { id } = req.params
//         res.json(await deleteProduct(id))
//     } catch (error) {
//         res.status(401).json(error.message)
//     }
// })





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