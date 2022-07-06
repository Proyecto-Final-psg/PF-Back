const express = require('express');
const app = express()
const cors = require("cors")
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())
const User = require('./models/user')
const { getAllProducts, createProduct } = require ('./functions/products')

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
app.get('/show', async (req, res) => {
    res.json({ "done": "este cambio lo hizo Ramiro " })
})



/////create user/////

app.post('/createUser', async (req, res) => {

    let { name } = req.body

    res.json({ "done": name })
})

/// PRODUCTS //////

app.get('/products', async (req, res) => {
    try {
        res.json(getAllProducts()) 
    } catch (error) {
        res.status(401).json(error.message)
    }
})

app.post('/products', async (req, res) => {
    try {
        let {name, stock, price, img, type, description, thc, cbd, cannabis, hashOil} = req.body
        res.json(createProduct(name, stock, price, img, type, description, thc, cbd, cannabis, hashOil)) 
    } catch (error) {
        res.status(401).json(error.message)
    }
})