const { sequelize, DataTypes, Op } = require("../db/db") //siempre importo el mismo sequelize ya creado en db .

const Product = sequelize.define('product', {
    // Model attributes are defined here
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true
      },
      name: {
        type: DataTypes.STRING,
      
      },
      // name, stock, price, img, type, description, thc, cbd, cannabis, hashOil
      stock: {
        type: DataTypes.INTEGER,
        defaultValue: 100
      },
      price: {
        type: DataTypes.INTEGER,
        // precio random default
      },
      img: {
        type: DataTypes.STRING,
        // URL for the main photo of the product.
      },
      type: {
        type: DataTypes.STRING,
      },
      // Type of product.
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
    }
    
);



module.exports = Product
