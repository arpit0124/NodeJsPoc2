const dotenv = require('dotenv');
dotenv.config();
const {Sequelize, DataTypes} = require('sequelize');

const config = process.env
const sequelize = new Sequelize(config.DB_NAME,
    config.DB_USER,
    config.DB_PASS, {
  host: config.DB_HOST,
  dialect: 'mysql',
  logging:false,
  pool:{
    max: 20,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
sequelize.authenticate()
.then(() => {
    console.log('database successfully connected..')
})
.catch(err => {
    console.log('Error'+ err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('./users.js')(sequelize, DataTypes)
db.accessToken = require('./accessToken.js')(sequelize, DataTypes)

db.sequelize.sync({ force: false })
.then(() => {
    console.log('yes re-sync done!')
})
module.exports = db;