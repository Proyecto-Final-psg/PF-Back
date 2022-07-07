const User = require("../../models/Users")
const { sequelize } = require('../../db/db')
const { QueryTypes } = require('sequelize');
module.exports = {
    createUser: async (name, lastName, username, email, phone) => {
        const user = await User.create({
            user_name: name,
            user_lastname: lastName,
            user_username: username,
            user_email: email,
            user_phone: phone,
        })
        return user
    },
    findAllUsers: async () => {
        return await User.findAll()
    },
    findOneUser : async(name) =>{
        const user = User.findOne({where : {user_name : name}})
        return user
    }
   
}



