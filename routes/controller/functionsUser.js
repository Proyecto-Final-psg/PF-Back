const User = require("../../models/Users")
const { sequelize } = require('../../db/db')
const { QueryTypes } = require('sequelize');
module.exports = {
    createUser: async (name, lastname, username, email, phone) => {
        const user = await User.create({
            name: name,
            lastname: lastname,
            username: username,
            email: email,
            phone: phone,
        })
        return user
    },
    findAllUsers: async () => {
        return await User.findAll()
    },
    findOneUser : async(name) =>{
        const user = User.findOne({where : {name : name}})
        return user
    }
   
}



