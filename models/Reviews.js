const { sequelize, DataTypes, Op } = require("../db/db") //siempre importo el mismo sequelize ya creado en db .
const Product = require('./Product')

const Reviews = sequelize.define('reviews', {
    name: {
        type: DataTypes.STRING
    },
    score: {
        type: DataTypes.INTEGER,
    },
    review: {
        type: DataTypes.TEXT
    },
}
);

// RELACION PRODUCT-CATEGORY

//const { product } = sequelize.models;

// Product.hasMany(Reviews)
// Reviews.belongsTo(Product)

module.exports = Reviews
