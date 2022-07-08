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
      }
    }   
);


/// RELACION PRODUCT-CATEGORY

const { product, categories } = sequelize.models;

product.belongsToMany(categories, { through: 'productCategory'})
categories.belongsToMany(product, { through: 'productCategory'})

module.exports = Product
