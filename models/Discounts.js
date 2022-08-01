const { sequelize, DataTypes, Op } = require("../db/db") //siempre importo el mismo sequelize ya creado en db .

const Discounts = sequelize.define('discounts', {
    // Model attributes are defined here
    code: {
        type: DataTypes.STRING,
    },
    amount: {
        type: DataTypes.INTEGER,
    },
    used: {
        type: DataTypes.BOOLEAN,
        defaultValue:false
    },
},
{
    // freezeTableName: true
}
);
module.exports = Discounts 

