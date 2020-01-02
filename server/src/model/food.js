const Sequelize = require("sequelize");
const db = require("../database/db");

const food = db.sequelize.define(
  "food",
  {
    Id: {
      type: Sequelize.INTEGER
    },
    Name: {
      type: Sequelize.STRING
    },
    Calories: {
      type: Sequelize.DECIMAL
    },
    Protein: {
      type: Sequelize.DOUBLE
    },
    Fat: {
      type: Sequelize.DOUBLE
    },
    Carbohydrates: {
      type: Sequelize.DOUBLE
    }
  },
  { timestamps: false }
);

module.exports = food;
