const express = require('express');
const app = express()
const cors = require("cors")
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())
const User = require('./models/Users')
const { getAllProducts, createProduct } = require('./functions/products')
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
        const user = await User.findAll()
       res.json({ "no muestro nada ": user})
})

app.post('/createUser', async(req, res) => {
    const user = await User.create({
        user_name:"test",
        user_lastname:"test",
        user_username:"test",
        user_password:"test",
        user_email:"test@jaja.com",
        user_phone:"test",
    })

    res.json({created: user})
})




/// PRODUCTS /////

app.get('/products', async (req, res) => {
    try {
        res.json(await getAllProducts()) 
    } catch (error) {
        res.status(401).json(error.message)
    }
})

app.post('/products', async (req, res) => {
    try {
        let {name, stock, price, img, type, description, thc, cbd, cannabis, hashOil} = req.body
        res.json(await createProduct(name, stock, price, img, type, description, thc, cbd, cannabis, hashOil)) 
    } catch (error) {
        res.status(401).json(error.message)
    }
})
