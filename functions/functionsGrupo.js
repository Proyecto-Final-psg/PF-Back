const Grupo = require("../models/grupo")
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../db/db')
module.exports = {
    showAllGroups: async () => {
        return await Grupo.findAll()
    },
    createGroup: async (name, participantes) => {
        let busqueda = await Grupo.findOne({ where: { name: name } });
        if (busqueda == null) {
            let nuevo = await Grupo.create({ name: name, })
            return nuevo
        } else {
            return busqueda
        }
    },
    updateGroup: async (id, newName) => {
        return await Grupo.update({ name: newName }, {
            where: {
                id: id
            }
        })
    },

    showUserGroups: async (array) => {
        if (array.length > 0) {
            return await sequelize.query(
                'SELECT * FROM groups WHERE id IN(:id)',
                {
                    replacements: { id: array },
                    type: QueryTypes.SELECT
                }
            );
        } else {
            return { "msg": "no groups" }
        }
    },
}
