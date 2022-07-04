const { sequelize, DataTypes, Op } = require("../db/db") //siempre importo el mismo sequelize ya creado en db .

const User = sequelize.define('user', {
    // Model attributes are defined here
    user_name: {
        type: DataTypes.STRING,
        isAlphanumeric: true,
        set(value) {
            this.setDataValue('user_name', value.toLowerCase())
        },
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        set(value) {
            this.setDataValue('email', value.toLowerCase())
        },
        allowNull: false,
        unique: true,
        isEmail: true,
    },
}, {
    // freezeTableName: true
});



module.exports = User
