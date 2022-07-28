const { sequelize, DataTypes, Op } = require("../db/db") //siempre importo el mismo sequelize ya creado en db .

const Product = sequelize.define('product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 100
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  img: {
    type: DataTypes.TEXT,
  },
  type: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT
  },
  thc: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  cbd: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}
);
/// RELACION PRODUCT-CATEGORY

const { product, categories, reviews, favorites, user} = sequelize.models;

product.belongsToMany(categories, { through: 'product_category' })
categories.belongsToMany(product, { through: 'product_category' })

product.hasMany(reviews)
reviews.belongsTo(product)

user.belongsToMany(product, { through: 'user_product' })
product.belongsToMany(user, { through: 'user_product' })

module.exports = Product
