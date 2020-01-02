const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const foodModel = require("./src/model/food");
const app = express();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
app.use(bodyParser.json());
app.use(cors());
app.get("/:foodName", async (req, res, next) => {
  const { foodName } = req.params;
  if (typeof foodName != undefined) {
    const foods = await foodModel.findAll({
      where: {
        name: {
          [Op.startsWith]: foodName
        }
      }
    });
    res.send(foods);
  } else {
    res.send([]);
  }
});
app.listen(3000, () => console.log("Running..."));
