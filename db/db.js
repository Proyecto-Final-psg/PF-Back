const { Sequelize, DataTypes, Op } = require('sequelize');
const reviews = require('../models/Reviews')
const favorites = require('../models/Favorites')

const sequelize = new Sequelize({
    database: "d1olon79irc05k",
    username: "xhnhxkqzilphew",
    password: "cfa5bb8911032d2c4f4061fe5f806edb9d315112f34cb40fc472b859bdc102ad",
    host: "ec2-52-86-115-245.compute-1.amazonaws.com",
    port: 5432,
    dialect: "postgres",
    logging: false ,
    dialectOptions: {
      ssl: {
        require: true, // This will help you. But you will see nwe error
        rejectUnauthorized: false // This line will fix new error
      },
      logging: false,
      native: false,
    },
  },);



/////////desarrollo////////
reviews(sequelize)
favorites(sequelize)
////////////////////////////////////// si ponemos el logging en false no me muestra todo el sql de sequelize

module.exports = { sequelize, DataTypes, Op,  ...sequelize.models  }
sequelize.authenticate()
.then(() => console.log('conectados, postgress DB ok'))
.catch(err => console.log('algo fallo postgress DB' + err))  //para ver si esta conetado sequelize con db
