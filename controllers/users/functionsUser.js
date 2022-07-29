const User = require("../../models/Users")
const Product = require('../../models/Product')
const Order = require('../../models/Order')
module.exports = {
    findAllUsers: async () => {
        return await User.findAll()
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
        return await User.findByPk(id)
    },
    blockUser: async (id) => {
        const user = await User.findByPk(id);
        if(!user) return  'The user does not exist'
        if(user.block){
          await User.update({ block: false }, {
                where: {
                    user_id: id
                }
            })
        return "The user has been unblock"
        }else{
            await User.update({ block: true }, {
            where: {
                user_id: id
            }
            })
            return 'The user has been block'
        }
    },
    addToCart: async (user_id, product_id) => {
        const user = await User.findByPk(user_id)
        const product = await Product.findByPk(product_id)
        const productCreated = await user.addProduct(product)
        if(productCreated) return 'Product added successfully to cart!'
        return "Product is allready in the cart"
    },
    removeFromCart: async (user_id, product_id) => {
        const user = await User.findByPk(user_id)
        const product = await Product.findByPk(product_id)
        const productRemoved = await user.removeProduct(product)
        if(productRemoved) return 'Product removed successfully to cart!'
        return "Can't remove that product"
    },
    removeUser: async (id) => {
        await User.destroy({
            where: {user_id: id}
        })
        return `the user was successfully deleted`
    },
    getUserCart: async (id) => {
       const user = await User.findByPk(id)
       if(user) {
        const userCart = await user.getProducts({
            attributes: ['name', 'price', 'img', 'stock']  ,
            joinTableAttributes: [] 
        })
        return userCart
       }else{
        return 'The user does not exist'
       }
    },
    changeNotification: async (user_id, product_id) => {
        const user = await User.findByPk(user_id)
        const product = await Product.findByPk(product_id)
    
        await user.addProduct(product)

        if(!user.dataValues.notification){
           await User.update({ notification: true }, {
            where: {
                user_id
            }
            }) 
            
            return user.dataValues.notification
        }
    
        return await user.dataValues.notification
    }

}



