const Order = require("../../models/Order")
const OrderItem = require("../../models/OrderItem")
const Product=require('../../models/Product')
const { sequelize } = require('../../db/db')
const { QueryTypes } = require('sequelize');
module.exports = {
    createOrder: async (user_id, addres, status) => {

        const newOrder = await Order.create({ user_id, addres, status })
        return newOrder
    },
    OrderItem: async (nuevaOrden,quantity) => {

       return await nuevaOrden.addProduct(2)
      
    }

    // getCategories: async () => {
    //     return await Category.findAll()
    // },
    // deleteCategory : async (id)=>{
    //     let categoryDeleted = await Category.destroy({where : {id : id}})
    //     return categoryDeleted
    // },
    // modifyCategory : async (newCategory, id)=>{
    //     const categories = await Category.findAll()
    //     const idFound = categories.filter(e => parseInt(e.id) === parseInt(id))
    //     if(idFound.length > 0){
    //         await Category.update({category : newCategory},
    //             {
    //                 where : {
    //                     id : id
    //                 }
    //             })
    //         return `the category has been modify to ${newCategory} `
    //     } else {
    //         return 'category not found'
    //     }
    // }
}
