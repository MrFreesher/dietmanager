require("dotenv").config();

const config = {
  dbHost: process.env.DBHOST,
  dbName: process.env.DBNAME,
  dbUser: process.env.DBUSER,
  dbPassword: process.env.DBPASSWORD
};
module.exports = config;
