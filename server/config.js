const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize("socialfeed", "socialmedia", "Pp_2322003", {
  host: "localhost",
  dialect: 'mysql',
  logging: false,
});

sequelize.authenticate()
  .then(() => console.log('✅ Database Connected'))
  .catch(err => console.error('❌ Error:', err));

module.exports = sequelize;
