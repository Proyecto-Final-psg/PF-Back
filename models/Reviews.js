const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('reviews', {
    name: {
        type: DataTypes.STRING
    },
    score: {
        type: DataTypes.INTEGER,
    },
    review: {
        type: DataTypes.TEXT
    },
  })
}

