const nodemailer = require('nodemailer')
const password = 'prtayqejhudxccsl'

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure : true,
    auth : {
        user : 'weedical.shop@gmail.com',
        pass : password
    },
});

transporter.verify().then(() => {
    console.log('listo para enviar correos')
})

module.exports = transporter;
