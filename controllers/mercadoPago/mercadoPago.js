///////////////////////////-----Mercado Pago------//////////////////////////////////////////////////////////////////////////////////////////////////////////////
const mercadopago = require("mercadopago");
// Agrega credenciales  //
mercadopago.configure({
    access_token: "TEST-1335334086093673-071419-a275ed33eb74f65ce28d3a8055396def-129803944",
});

module.exports = {
    payOrder: async (title, unit_price, quantity) => {
        let preference = {
            items: [
                {
                    title: title,
                    unit_price: Number(unit_price),
                    quantity: Number(quantity),
                }
            ]
        }
        const respuesta = await mercadopago.preferences.create(preference)
            .then(data => console.log(data))
        return respuesta
    }

}



