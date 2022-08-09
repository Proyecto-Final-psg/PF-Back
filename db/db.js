const { Sequelize, DataTypes, Op } = require('sequelize');
const reviews = require('../models/Reviews')
const favorites = require('../models/Favorites')

const sequelize = new Sequelize({
  database: "ddvs42a8hfj855",
  username: "deolccnxkjopmn",
  password: "bd4417ab050c32a8da88953f0a4ac2491e85869be7afb9132ee9c99d481a9e17",
  host: "ec2-3-225-110-188.compute-1.amazonaws.com",
  port: 5432,
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true, // This will help you. But you will see nwe error
      rejectUnauthorized: false // This line will fix new error
    },
    logging: false,
    native: false,
  },
});

/////////desarrollo////////
reviews(sequelize)
favorites(sequelize)
////////////////////////////////////// si ponemos el logging en false no me muestra todo el sql de sequelize

module.exports = { sequelize, DataTypes, Op, ...sequelize.models }
sequelize.authenticate()
  .then(() => console.log('conectados, postgress DB ok'))
  .catch(err => console.log('algo fallo postgress DB' + err))  //para ver si esta conetado sequelize con db
