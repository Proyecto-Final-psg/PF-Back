const transports = require('../mailer/mailer')

module.exports = {
    message1 : async (email, user, order, status) =>{
        await transports.sendMail({
            from : `"Orden # ${order}" <weedical@weedical.com>`,
            to : email,
            subject : `hola ${user } la orden # ${order} se encuentra en estado ${status}`,
            html : `<h3> Hola ${user}</h3>
            
            <p>El pedido numero ${order} se encuentra en proceso </p>
            
            
            <p>Este es un pedido automatica de Weedical</p>

            <p>Por favor no responda este correo</p>

            <p>para comunicarse con un asesor favor escribenos a nuestro chatbot</p>`
        })
    },
    message2 : async (email, user, order, status) =>{
        await transports.sendMail({
            from : `"Orden # ${order}" <weedical@weedical.com>`,
            to : email,
            subject : `hola ${user } la orden # ${order} se encuentra en estado ${status}`,
            html : `<h3> Hola ${user}</h3> 
            
            <p>El pedido numero ${order} se encuentra en proceso </p>
            
            <p>Este es un pedido automatica de Weedical</p>

            <p>Por favor no responda este correo</p>

            <p>para comunicarse con un asesor favor escribenos a nuestro chatbot</p>`
        })
    },
    message3 : async (email, user, order, status) =>{
        await transports.sendMail({
            from : `"Orden # ${order}" <weedical@weedical.com>`,
            to : email,
            subject : `hola ${user } la orden # ${order} se encuentra en estado ${status}`,
            html : `<h3> Hola ${user}</h3>
            
            <p>El pedido numero ${order} se encuentra en proceso </p>
            
            <p>Este es un pedido automatica de Weedical</p>

            <p>Por favor no responda este correo</p>

            <p>para comunicarse con un asesor favor escribenos a nuestro chatbot</p>`
        })
    },
    message4 : async (email, link) =>{
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

}
