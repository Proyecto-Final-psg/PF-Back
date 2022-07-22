const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('favorites', {
    product: {
        type: DataTypes.STRING
    }
  })
}

