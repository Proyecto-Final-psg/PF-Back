const express = require('express');
// const Category = require('../models/Category');
const Category = require('./models/Category')
const {getCategories, createCategory} = require('./functions/functionCategory')
const app = express()
const cors = require("cors")
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())
const { getProducts, createProduct, getProductById, deleteProduct } = require('./functions/functionsProduct')
const { createUser, findAllUsers } = require('./functions/functionsUser')

//////////DB///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const { sequelize } = require('./db/db')

////////SERVIDOR////////
let port = process.env.PORT || 8180
app.listen(port, () => {
    console.log('Server run on Port =>  ' + port)
    sequelize.sync({ alter: true })
})
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// //////USER////////////
app.get('/getAllUsers', async (req, res) => {
    try {
        res.json(await findAllUsers())
    } catch (error) {
        res.status(401).json(error.message)
    }
})



// categories routes

//get categories routes
app.get('/category', async (req, res) => {
    try {
        res.status(200).json(await getCategories())
    } catch (error) {
        console.log(error)
    }
})

//post create category routes
app.post('/category', async (req, res) => {
    let { category } = req.body
    try {
        res.status(200).json(await createCategory(category))
    } catch (error) {
        console.log(error)

app.get('/prueba', async (req, res) => {
  
        res.json("probando")
   
})
app.post('/createUser', async (req, res) => {
    try {
        let { name, lastName, username, password, email, phone } = req.body
        res.json(await createUser(name, lastName, username, password, email, phone))
    } catch (error) {
        res.status(401).json(error.message)
    }
})

/// PRODUCTS ////
app.get('/products', async (req, res) => {
    let { name } = req.query
    try {
        res.json(await getProducts(name))
    } catch (error) {
        res.status(401).json(error.message)
    }
})
app.post('/products', async (req, res) => {
    try {
        let { name, stock, price, img, type, description, thc, cbd, cannabis, hashOil } = req.body
        res.json(await createProduct(name, stock, price, img, type, description, thc, cbd, cannabis, hashOil))
    } catch (error) {
        res.status(401).json(error.message)
    }
})
app.get('/products/:id', async (req, res) => {
    try {
        let { id } = req.params
        res.json(await getProductById(id))
    } catch (error) {
        res.status(401).json(error.message)
    }
})
app.delete('/products/:id', async (req, res) => {
    try {
        let { id } = req.params
        res.json(await deleteProduct(id))
    } catch (error) {
        res.status(401).json(error.message)

    }
})
