const { sequelize, DataTypes, Op } = require("../db/db") //siempre importo el mismo sequelize ya creado en db .

const User = sequelize.define('user', {
    user_id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_name: {
        type: DataTypes.STRING,        
        allowNull: false
    },
    user_lastname:{
        type: DataTypes.STRING,
        allowNull:false
    },
    user_username:{
        type: DataTypes.STRING,
        allowNull:false
    },
    user_password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_email: {
        type: DataTypes.STRING,
        // set(value) {
        //     this.setDataValue('email', value.toLowerCase())
        // },
        allowNull: false,
        unique: true,
        isEmail: true,
    },
    user_phone: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: true
});



module.exports = User
