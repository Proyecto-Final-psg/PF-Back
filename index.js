const express = require('express');
const {Category} = require('../models/Category');
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

app.get('/category', async (req, res) => {
    try {
        const categories = await Category.findAll()
        res.status(200).json(categories)
    } catch (error) {
        console.log(error)
    }
})

app.post('/category', async (req, res) => {
    let { category } = req.body
    try {
        const createdCategory = await Category.create(category)
        res.status(201).json(createdCategory)
    } catch (error) {
        console.log(error)
    }
})
