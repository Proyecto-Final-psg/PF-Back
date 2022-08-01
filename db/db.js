const { Sequelize, DataTypes, Op } = require('sequelize');
const reviews = require('../models/Reviews')
const favorites = require('../models/Favorites')

const sequelize = new Sequelize({
  database: "dqt7vpos54at1",
  username: "sucscxzlvxvwvx",
  password: "de19c61726f60767487759917a82a68d07041e1ee3e6c35f4f5a48c94969c430",
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
