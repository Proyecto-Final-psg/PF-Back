const { Sequelize, DataTypes, Op } = require('sequelize');
const reviews = require('../models/Reviews')
const favorites = require('../models/Favorites')
const { DATABASE_URL } = process.env

const sequelize = new Sequelize(DATABASE_URL , {
  logging: false,   //Loging disabled
  dialectOptions: {
    ssl:{
      require:true,
      rejectUnauthorized: false
    } 
  }
})


/////////desarrollo////////
reviews(sequelize)
favorites(sequelize)
////////////////////////////////////// si ponemos el logging en false no me muestra todo el sql de sequelize

module.exports = { sequelize, DataTypes, Op, ...sequelize.models }
sequelize.authenticate()
  .then(() => console.log('conectados, postgress DB ok'))
  .catch(err => console.log('algo fallo postgress DB' + err))  //para ver si esta conetado sequelize con db
