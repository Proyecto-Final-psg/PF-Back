const { Sequelize, DataTypes, Op } = require('sequelize');
// const sequelize = new Sequelize({
//     database: "d1olon79irc05k",
//     username: "xhnhxkqzilphew",
//     password: "cfa5bb8911032d2c4f4061fe5f806edb9d315112f34cb40fc472b859bdc102ad",
//     host: "ec2-52-86-115-245.compute-1.amazonaws.com",
//     port: 5432,
//     dialect: "postgres",
//     logging: false ,
//     dialectOptions: {
//       ssl: {
//         require: true, // This will help you. But you will see nwe error
//         rejectUnauthorized: false // This line will fix new error
//       },
//       logging: false,
//       native: false,
//     },
//   },);

///////////desarrollo////////

const sequelize = new Sequelize({
  database: "dpbsa0u9meu46",
  username: "macdjezdluzphj",
  password: "dde0dafe5e2d7c95daa72fd7b0ed4c8ca67e4ded754ff663d8672f0f5f94f0d4",
  host: "ec2-3-223-169-166.compute-1.amazonaws.com",
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

  
/////////////////////////////////////// si ponemos el logging en false no me muestra todo el sql de sequelize

module.exports = { sequelize, DataTypes, Op }
sequelize.authenticate()
    .then(() => console.log('conectados, postgress DB ok'))
    .catch(err => console.log('algo fallo postgress DB' + err))  //para ver si esta conetado sequelize con db
