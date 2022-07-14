const User = require("../../models/Users")
const Product = require('../../models/Product')
const Order = require('../../models/Order')
module.exports = {
    findAllUsers: async () => {
        return await User.findAll({
            include: [{
                model: Product,
                through: { attributes: [] },
                attributes: ["id", 'name', 'price', 'stock', 'img'],
            }]
        })
    },
    findOrCreate: async (user_email, user_name, user_img) => {
        return await User.findOrCreate({
            where: { user_email },
            defaults: {
                user_email: user_email,
                user_name: user_name,
                user_img: user_img
            }
        });
    },
    changeRole: async (user_id, roll) => {
        return await User.update({ roll: roll }, {
            where: {
                user_id: user_id
            }
        })
    },
    userById: async (id) => {
        return await User.findByPk(id, {
            include: {
                model: Product,
                through: { attributes: [] },
                attributes: ["id", 'name', 'price', 'stock', 'img'],
            }
        })
    },
    addToCart: async (user_id, product_id) => {
        const user = await User.findByPk(user_id)
        const product = await Product.findByPk(product_id)
        return await user.addProduct(product)
    },
    removeFromCart: async (user_id, product_id) => {
        const user = await User.findByPk(user_id)
        const product = await Product.findByPk(product_id)
        return await user.removeProduct(product)
    },
    removeUser: async (id) => {
        await User.destroy({
            where: {user_id: id}
        })
        return `the user was successfully deleted`
    }

}



