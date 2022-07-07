const { sequelize, DataTypes, Op } = require("../db/db") //siempre importo el mismo sequelize ya creado en db .

const User = sequelize.define('user', {
    // id no necesario, sequielize la genera automaticamente - comment by rami
   /*   user_id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }, */ 
    name: {
        type: DataTypes.STRING,        
        allowNull: false
    },
    lastname:{
        type: DataTypes.STRING,
        allowNull:false
    },
    username:{
        type: DataTypes.STRING,
        allowNull:false
    },
    // Atributo no necesario - comment by Rami
  /*   password: {
        type: DataTypes.STRING,
        allowNull: false
    }, */
    email: {
        type: DataTypes.STRING,
        // set(value) {
        //     this.setDataValue('email', value.toLowerCase())
        // },
        allowNull: false,
        unique: true,
        isEmail: true,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true
});



module.exports = User
