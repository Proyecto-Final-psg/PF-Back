const transports = require('../mailer/mailer')
const User = require('./../../models/Users')
const Product= require('./../../models/Product')

module.exports = {
    message1 : async (userid, order, status, address, arrayItems) =>{
        const user = await User.findByPk(userid, {attributes : ['user_name', 'user_email']})
        let pro = await arrayItems.map(async item => {
            let producto = await Product.findByPk(item.product_id, {attributes : ['name']})
            producto = producto.dataValues.name
            let p = {
                product : producto,
                quantity : item.quantity,
                price : item.price
            }
            return p
        })
        const product = await Promise.all(pro)
        
        await transports.sendMail({
            from : `"Orden # ${order}" <weedical@weedical.com>`,
            to : user.dataValues.user_email,
            subject : `hola ${user.dataValues.user_name} la orden # ${order} se encuentra en estado ${status}`,
            html : `<h3> Hola ${user.dataValues.user_name}</h3>
            
            <p>El pedido numero ${order} se encuentra en proceso, y sera enviando a la siduiente direccion: ${address} </p>

            <h4> Items comprados</h4>

            ${product.map(e => `<span>${e.product}  qty: ${e.quantity}  price : ${e.price}<br></span>`)}
            
            <p>Este es un pedido automatica de Weedical</p>

            <p>Por favor no responda este correo</p>

            <p>para comunicarse con un asesor favor escribenos a nuestro chatbot</p>`
        })
    },
    message2 : async (userid, order, status) =>{
        const user = await User.findByPk(userid, {attributes : ['user_name', 'user_email']})
        await transports.sendMail({
            from : `"Orden # ${order}" <weedical@weedical.com>`,
            to : user.dataValues.user_email,
            subject : `hola ${user.dataValues.user_name} la orden # ${order} se encuentra en estado ${status}`,
            html : `<h3> Hola ${user.dataValues.user_name}</h3> 
            
            <p>El pedido numero ${order} se encuentra en proceso </p>
            
            <p>Este es un pedido automatica de Weedical</p>

            <p>Por favor no responda este correo</p>

            <p>para comunicarse con un asesor favor escribenos a nuestro chatbot</p>`
        })
    },
    message3 : async (userid, order, status) =>{
        const user = await User.findByPk(userid, {attributes : ['user_name', 'user_email']})
        await transports.sendMail({
            from : `"Orden # ${order}" <weedical@weedical.com>`,
            to : user.dataValues.user_email,
            subject : `hola ${user.dataValues.user_name} la orden # ${order} se encuentra en estado ${status}`,
            html : `<h3> Hola ${user.dataValues.user_name}</h3>
            
            <p>El pedido numero ${order} se encuentra en proceso </p>
            
            <p>Este es un pedido automatica de Weedical</p>

            <p>Por favor no responda este correo</p>

            <p>para comunicarse con un asesor favor escribenos a nuestro chatbot</p>`
        })
    },
    message4 : async (user, email, link) =>{
        await transports.sendMail({
            from : `<weedical@weedical.com>`,
            to : email,
            subject : `Reset Password`,
            html : `<h3> Hola ${user}</h3>
            
            <p>Favor ingresa a este link para resetar tu contraseña ${link} </p>
            
            <p>Este es un pedido automatica de Weedical</p>

            <p>Por favor no responda este correo</p>

            <p>para comunicarse con un asesor favor escribenos a nuestro chatbot</p>`
        })
    },
    message5 : async(user, email, name) => {
        await transports.sendMail({
            from : `<weedical@weedical.com>`,
            to : email,
            subject : `Restock Notificacion`,
            html : `<h3> Dear ${user} </h3>
            <p>We notice that you have the product ${name} in your wishlist
            and we want to inform you there is stock again, we invite to you to purchase it</p>
            
            <h3>Weedical Team</h3>
            `
        })
    }
}
