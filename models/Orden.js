const { sequelize, DataTypes, Op } = require("../db/db") //siempre importo el mismo sequelize ya creado en db .

const Orden = sequelize.define('Orden', {
    user_id: {
        type: DataTypes.STRING,

    },
    description: {
        type: DataTypes.TEXT
    },
}, {
    // timestamps: true
}
);

/// RELACION PRODUCT-CATEGORY

// const { product, categories } = sequelize.models;


// module.exports = Product
