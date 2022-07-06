const express = require('express');
// const Category = require('../models/Category');
const Category = require('./models/Category')
const {getCategories, createCategory} = require('./functions/functionCategory')
const app = express()
const cors = require("cors")
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())
// const User = require('./models/user')
//////////DB///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const { sequelize } = require('./db/db')
////////SERVIDOR////////
let port = process.env.PORT || 8280
app.listen(port, () => {
    console.log('Server run on Port =>  ' + port)
    sequelize.sync({ alter: true })
})
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //////USER////////////
app.get('/show', async (req, res) => {
       res.json({ "done": "este cambio lo hizo Ramiro "})
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
    }
})
