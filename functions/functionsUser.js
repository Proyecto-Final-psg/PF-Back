const User = require("../models/Users")
const { sequelize } = require('../db/db')
const { QueryTypes } = require('sequelize');


module.exports = {
    createUser: async (name, lastName, username, password, email, phone) => {
        const user = await User.create({
            user_name: name,
            user_lastname: lastName,
            user_username: username,
            user_password: password,
            user_email: email,
            user_phone: phone,
        })
        return user
    },
    findAllUsers: async () => {
        return await User.findAll()
    },
    ///
    findOrCreate: async (name, password) => {
        return await User.findOrCreate({
            where: { name },
            defaults: {
                name: name,
                password: password
            }
        });

    },
    deleteUser: async (name) => {
        return await User.destroy({
            where: {
                name: name
            }
        })
    }
   
}

// User.bulkCreate(req.body)  =====> se usa bulkCreate cuando queremos mandar un elemento
// ///////////////////////////muy grande de una   seria un arreglo de objetos.
//  User.create(name,password)
//  User.destoy(name,password)
// metodo tojSON()  muestra solo el objeto q se creo para hacer consol.log de las respuestas.


