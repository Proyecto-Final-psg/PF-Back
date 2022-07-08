const { sequelize, DataTypes, Op } = require("../db/db") //siempre importo el mismo sequelize ya creado en db .

const Product = sequelize.define('product', {
      name: {
        type: DataTypes.STRING,
      
      },
      stock: {
        type: DataTypes.INTEGER,
        defaultValue: 100
      },
      price: {
        type: DataTypes.INTEGER,
      },
      img: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT
      },
      thc: {
          type: DataTypes.FLOAT
      },
      cbd: {
          type: DataTypes.FLOAT
      },
      cannabis: {
          type: DataTypes.FLOAT
      },
      hashOil: {
          type: DataTypes.FLOAT
      },
    },{
        timestamps: true
    }   
);


/// RELACION PRODUCT-CATEGORY

const { product, categories } = sequelize.models;

product.belongsToMany(categories, { through: 'product-category'})
categories.belongsToMany(product, { through: 'product-category'})

module.exports = Product
