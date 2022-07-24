const { sequelize, DataTypes, Op } = require("../db/db") //siempre importo el mismo sequelize ya creado en db .

const User = sequelize.define('user', {
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    user_lastname: {
        type: DataTypes.STRING,
        allowNull: true
    },
    user_img: {
        type: DataTypes.STRING,
    },
    user_password: {
        type: DataTypes.STRING,
        // allowNull: true
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
    roll: {
        type: DataTypes.STRING,
        defaultValue: "user"
    },
    user_phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    block: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    //timestamps: true
});
//console.log(sequelize.models)
const { reviews, user, favorites } = sequelize.models;

 user.hasMany(reviews)
 reviews.belongsTo(user)

 user.hasMany(favorites)
 favorites.belongsTo(user)

module.exports = User
