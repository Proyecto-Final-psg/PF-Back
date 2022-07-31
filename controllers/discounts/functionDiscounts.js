const {reviews} = require("../../db/db")
const Discounts = require("../../models/Discounts")
const User = require("../../models/Users")

const createDiscount = (percentage) => {

    function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
     charactersLength));
       }
       return result;
    }

    Discounts.create({
        code:makeid(7),
        amount:percentage,
        used:false
    })
}

const getAllDiscounts = async () =>{
    const discounts = await Discounts.findAll()
    return discounts;
}

const getDiscount = async (code) => {
    const discount = await getAllDiscounts()
    const found = discount.find(d => d.code === code)
    if(found)
    return found
    else
    return 'Discount not found'
}

const getDiscountByCodeAndUseIt = async(code) => {
    let discounts = await getAllDiscounts()

    const discountFound = discounts.filter(p => p.code.includes(code))
    // console.log('Encontré el descuento?', discountFound[0].dataValues.id)
    if(discountFound){
        Discounts.update({
            used: true,
        },{
            where:{
                id : discountFound[0].dataValues.id
            }
        })
        // console.log('updated',discountFound)
        return discountFound
    }
    
    return 'No se encontro el código buscado'
}

module.exports={createDiscount, getDiscountByCodeAndUseIt, getDiscount}