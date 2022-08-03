const transports = require('../mailer/mailer')
const User = require('./../../models/Users')
const Product= require('./../../models/Product')

module.exports = {
    message1 : async (email, order, arrayItems) =>{
        // console.log(name, email, order, arrayItems);
        // const user = await User.findByPk(userid, {attributes : ['user_name', 'user_email']})
        // let pro = await arrayItems.map(async item => {
        //     let producto = await Product.findByPk(item.product_id, {attributes : ['name']})
        //     console.log(producto);
        //         producto = producto.dataValues.name
        //         let p = {
        //             product : producto,
        //             quantity : item.quantity,
        //             price : item.price
        //         }
            
        //     return p
        // })
        // const product = await Promise.all(pro)
      
        
        await transports.sendMail({
            from : `"Orden # ${order}" <weedical@weedical.com>`,
            to : email,
            subject : `Hi! Order #${order}`,
            html :`            
            <p>We want to inform you that the order n° ${order} is in progress and we will let you know when its completed, </p>
            <p>to start the shippment.</p>

            <p>You will receive another email with the final order state (completed or canceled), please be patient!</p>
            
            <p>This is an automatic email, please do not respond</p>

            <p>If you need more info, please contact our robot in www.weedical.com</p>

            <p>Best wishes 💫,</p>
            <p>Weedical team</p>`
        })
    },
    message2 : async (userid, order, status, email) =>{
        console.log('CANCELED',userid, order, status);
        // const user = await User.findByPk(userid, {attributes : ['user_name', 'user_email']})
        await transports.sendMail({
            from : `"Orden # ${order}" <weedical@weedical.com>`,
            to : email,
            subject : `Hi ${email}! Order #${order} ${status}`,
            html : `            
            <p>Something happened with the order n° ${order} and now it's canceled.</p>

            <p>Please check in your Profile the order or contact our chatbot to get more info.</p>
            
            <p>Best wishes 💫,</p>

            <p>Weedical team</p>`
        })
    },
    message3 : async (userid, order, status, address, product, email) =>{
        // const user = await User.findByPk(userid, {attributes : ['user_name', 'user_email']})
        await transports.sendMail({
            from : `"Orden # ${order}" <weedical@weedical.com>`,
            to : email,
            subject : `Hi ${email}! Order #${order} ${status}`,
            html : `            
            <p>The order n° ${order} is completed, and we will send the products to the next address :${address} </p>

            <h4>Order detail</h4>
            <ol>
            ${product.map(e => `<li>${e.name}  qty: ${e.quantity}  price : $${e.priceOfSale}<br></li>`)}
            </ol>
            <p>This is an automatic email, please do not respond</p>

            <p>If you need more info, please contact our robot in www.weedical.com</p>
            <p>Best wishes 💫,</p>

            <p>Weedical team</p>`
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
