const { sequelize, DataTypes, Op } = require("../db/db") //siempre importo el mismo sequelize ya creado en db .

const User = sequelize.define('categories', {
    // Model attributes are defined here
    category: {
        type: DataTypes.STRING,
        set(value) {
            this.setDataValue('category', value.toUpperCase())
        },
        allowNull : false
    },
  
},
{
    // freezeTableName: true
}
);


module.exports = User