const Category = require("../../models/Category")
const { sequelize } = require('../../db/db')
const { QueryTypes } = require('sequelize');
module.exports = {
    createCategory: async (category) => {
        let categories = await Category.create({category : category});
        return categories
    },
    getCategories: async () => {
        return await Category.findAll()
    },
    deleteCategory : async (id)=>{
        let categoryDeleted = await Category.destroy({where : {id : id}})
        return categoryDeleted
    },
    modifyCategory : async (newCategory, id)=>{
        const categories = await Category.findAll()
        const idFound = categories.filter(e => parseInt(e.id) === parseInt(id))
        if(idFound.length > 0){
            await Category.update({category : newCategory},
                {
                    where : {
                        id : id
                    }
                })
            return `the category has been modify to ${newCategory} `
        } else {
            return 'category not found'
        }
    }
}
