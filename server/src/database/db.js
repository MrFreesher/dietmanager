const Sequelize = require("sequelize");

const configDB = require("../config/config");

const db = {};

const sequelize = new Sequelize(
  configDB.dbName,
  configDB.dbUser,
  configDB.dbPassword,
  {
    dialect: "mysql",
    host: configDB.host,
    freezeTableName: true
  }
);
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
