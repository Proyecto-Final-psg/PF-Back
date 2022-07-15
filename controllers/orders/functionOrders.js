const Order = require("../../models/Order")
const OrderItem = require("../../models/OrderItem")
const Product=require('../../models/Product')
const User = require('../../models/Users')
// const { sequelize } = require('../../db/db')
// const { QueryTypes } = require('sequelize');
module.exports = {
    createOrder: async (user_id, address, status, arrayItems) => {

        let user = await User.findOne({ where: { user_id: user_id } })

        var nuevaOrder = await Order.create({
            "address": address,
            "status": status
        })

        nuevaOrder.setUser(user)
        // nuevaOrder.save()

        for (let i = 0; i < arrayItems.length; i++) {

            let orderItem = await OrderItem.create({
                quantity: arrayItems[i].quantity,
                price: arrayItems[i].price
            })
            let product = await Product.findOne({ where: { id: arrayItems[i].product_id } })

            orderItem.setProduct(product)

            orderItem.setOrder(nuevaOrder)
        }
        return nuevaOrder
    },
    getOrders: async (user_id) => {

        let listaDordenes = []
        let user = await User.findOne({ where: { user_id: user_id } })
        let ordenes = await user.getOrders({ include: OrderItem })

        for (let i = 0; i < ordenes.length; i++) {

            let orden = ordenes[i].dataValues

            let ordenUser = {
                order_id: orden.id,
                user_id: orden.userUserId,
                address: orden.address,
                status: orden.status,
                arrayItems: []
            }

            let items = ordenes[i].dataValues.order_items

            for (let j = 0; j < items.length; j++) {

                let product_id = items[j].dataValues.productId
                let producto = await Product.findOne({ where: { id: product_id } })

                producto.dataValues.quantity = items[j].dataValues.quantity

                ordenUser.arrayItems.push(producto.dataValues)
            }
            listaDordenes.push(ordenUser)

        }
        return listaDordenes
    },
    getAllOrders: async () => {
        return await Order.findAll()
     }
}
