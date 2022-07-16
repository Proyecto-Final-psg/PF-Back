const { sequelize, DataTypes, Op } = require("../db/db") //siempre importo el mismo sequelize ya creado en db .
const Product = require('./Product')

const OrderItem = sequelize.define('order_item', {
    quantity: {
        type: DataTypes.INTEGER
    },
    price: {
        type: DataTypes.FLOAT,

    },
}, {
    // timestamps: true
}
);
/// RELACION PRODUCT-CATEGORY
const { product, order_item } = sequelize.models;

OrderItem.belongsTo(Product)
Product.hasMany(OrderItem)

module.exports = OrderItem 
