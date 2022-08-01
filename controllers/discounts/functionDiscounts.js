const {reviews} = require("../../db/db")
const Discounts = require("../../models/Discounts")
const User = require("../../models/Users")


const createDiscount = (code,percentage) => {
    const disc = Discounts.create({
        code: code,
        amount:percentage
    })
    return disc;
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

    if(discountFound){
        Discounts.update({
            used: true,
        },{
            where:{
                id : discountFound[0].dataValues.id
            }
        })
     
        return discountFound
    }
    
    return 'No se encontro el código buscado'
}

module.exports={createDiscount, getDiscountByCodeAndUseIt, getDiscount}