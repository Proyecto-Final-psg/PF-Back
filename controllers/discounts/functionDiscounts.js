const {reviews} = require("../../db/db")
const Discounts = require("../../models/Discounts")
const User = require("../../models/Users")

const createDiscount = (randomCode) => {
    Discounts.create({
        code:randomCode,
        amount:12,
        used:false
    })
}

module.exports={createDiscount}