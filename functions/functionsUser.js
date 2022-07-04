const User = require("../models/user")
const { sequelize } = require('../db/db')
const { QueryTypes } = require('sequelize');
module.exports = {
    createUser: async (user_name, last_name, password, email) => {
        let jane = await User.create({ user_name: user_name, last_name: last_name, password: password, email: email });
        return jane
    },
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
    },
    updateUser: async (name, newPassword) => {
        return await User.update({ password: newPassword }, {
            where: {
                name: name
            }
        })
    },
    findOne: async (email) => {
        return await User.findOne({ where: { email: email } });

    },
    findLog: async (email, password) => {
        return await User.findOne({ where: { email: email, password: password } });
    },
    findByPrimariKey: async (id) => {
        return await User.findByPk(id);

    },
    findAll: async () => {

        return await User.findAll()
    },
    membersGroup: async (array) => {
        if (array.length > 0) {
            return await sequelize.query(
                'SELECT * FROM users WHERE id IN(:id)',
                {
                    replacements: { id: array },
                    type: QueryTypes.SELECT
                }
            );
        } else {
            return { "msg": "no members" }
        }
    },
}

// User.bulkCreate(req.body)  =====> se usa bulkCreate cuando queremos mandar un elemento
// ///////////////////////////muy grande de una   seria un arreglo de objetos.
//  User.create(name,password)
//  User.destoy(name,password)
// metodo tojSON()  muestra solo el objeto q se creo para hacer consol.log de las respuestas.


