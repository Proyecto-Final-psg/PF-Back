const e = require("express")
const Order = require("../../models/Order")
const OrderItem = require("../../models/OrderItem")
const Product = require('../../models/Product')
const User = require('../../models/Users')
const { payOrder } = require('../mercadoPago/mercadoPago')

module.exports = {
    createOrder: async (user_id, address, status, email, arrayItems) => {
        if (user_id) {
            var user = await User.findOne({ where: { user_id: user_id } })
        }
        let urlPago = await payOrder(arrayItems)
        var nuevaOrder = await Order.create({
            "address": address,
            "status": status,
            "urlPago": urlPago,
            "user_email": email
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
            return urlPago
        }
    },
    getOrders: async (user_id) => {
        let listaDordenes = []
        let user = await User.findOne({ where: { user_id: user_id } })
        if (user) {
            let ordenes = await user.getOrders({ include: OrderItem })
            console.log(user.user_name)
            for (let i = 0; i < ordenes.length; i++) {
                let orden = ordenes[i].dataValues
                let ordenUser = {
                    user_name: user.user_name,
                    user_email: user.user_email,
                    order_id: orden.id,
                    user_id: orden.userUserId,
                    address: orden.address,
                    status: orden.status,
                    urlPago: orden.urlPago,
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
        }
        else {
            return { res: "USER DONT EXIST" }
        }
    },
    getOrderById: async (order_id) => {
        const result = await Order.findOne({
            where: { id: order_id },
            include: User,
        });
        console.log(result)
        if (result) {
            let productos = []
            let orden = await Order.findOne({ where: { id: order_id }, include: OrderItem })
            let items = orden.order_items

            for (let i = 0; i < items.length; i++) {
                let productId = items[i].dataValues.productId
                let productoBuscado = await Product.findOne({ where: { id: productId } })
                console.log(productoBuscado.dataValues)
                let product = {
                    name: productoBuscado.dataValues.name,
                    img: productoBuscado.dataValues.img,
                    priceOfSale: items[i].dataValues.price,
                    description: productoBuscado.dataValues.description,
                    type: productoBuscado.dataValues.type,
                    quantity: items[i].dataValues.quantity
                }
                productos.push(product)
            }
            let ordenRespuesta = {
                orden: result,
                productos: productos
            }
            return ordenRespuesta
        } else {
            return { res: "ORDER DONT EXIST" }
        }
    },
    getAllOrders: async () => {
        let ordenes = await Order.findAll({ 
            include: User,
            order: [['id', 'desc']] })
        return ordenes
    },
    getOrderItem: async () => {
        const items = await OrderItem.findAll()
        const products = []
        for (let i = 0; i < items.length; i++) {
            let arrayItems = items[i].dataValues
            let p = await Product.findByPk(arrayItems.productId, { attributes: ['name'] })
            let product = {
                order_items_id: arrayItems.id,
                product: p.name,
                quantity: arrayItems.quantity,
                price: arrayItems.price,
                order: arrayItems.orderId
            }
            products.push(product)
        }
        return products
    },
    getItemsByOrder: async (order_id) => {
        const order = await Order.findByPk(order_id, { include: OrderItem })
        return order
    },
    getTotalByUserByOrder: async () => {
        const order = await Order.findAll({ include: OrderItem })
        const product = []
        for (let i = 0; i < order.length; i++) {
            let p = {
                order_id: order[i].dataValues.id,
                username: order[i].dataValues.userUserId,
                total: 0
            }
            let order_items = order[i].dataValues.order_items
            let total = 0
            for (let j = 0; j < order_items.length; j++) {
                let price = order_items[j].dataValues.price
                let quantity = order_items[j].dataValues.quantity
                let totalByItem = price * quantity
                total = totalByItem + total
                p.total = total
            }
            product.push(p)
        }
        return product
    },
    changeOrderStatus: async (order_id, status) => {
        await Order.update(
            {
                status: status
            }, {
            where: {
                id: order_id
            }
        })
        return 'Orden actualizada'
    }
}
