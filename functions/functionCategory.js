const Category = require("../models/Category")
const { sequelize } = require('../db/db')
const { QueryTypes } = require('sequelize');
module.exports = {
    createCategory: async (category) => {
        let categories = await Category.create({category : category});
        return categories
    },
    getCategories: async () => {
        return await Category.findAll()
    },
}