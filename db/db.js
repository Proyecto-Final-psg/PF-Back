const { Sequelize, DataTypes, Op } = require('sequelize');
const reviews = require('../models/Reviews')
const favorites = require('../models/Favorites')

const sequelize = new Sequelize({
  database: "dc3rclgl588p1e",
  username: "hrilpzzgagtuni",
  password: "45bc37c29b25af6e970d1b8a490f8c93cec2cfa383f795a796ccb95add4947a6",
  host: "ec2-107-22-122-106.compute-1.amazonaws.com",
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
