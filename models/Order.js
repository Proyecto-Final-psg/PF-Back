
const { sequelize, DataTypes, Op } = require("../db/db") //siempre importo el mismo sequelize ya creado en db .
const OrderItem = require('./OrderItem')
const User = require('./Users')

const Order = sequelize.define('order', {
    address: {
        type: DataTypes.TEXT
    },
    status: {
        type: DataTypes.TEXT
    },
    urlPago: {
        type: DataTypes.STRING
    },
}, {
    // timestamps: true
}
);
/// RELACION PRODUCT-CATEGORY

const { product } = sequelize.models;

User.hasMany(Order)
Order.belongsTo(User)

Order.hasMany(OrderItem)
OrderItem.belongsTo(Order)

module.exports = Order