const S = require("sequelize");
const db = require("../db");

class Product extends S.Model {}
Product.init(
  {
    name: {
      type: S.STRING,
      allowNull: false,
    },
    description: {
      type: S.TEXT,
      allowNull: true,
    },
    price: {
      type: S.FLOAT,
      allowNull: false,
    },
    stock: {
      type: S.INTEGER,
      allowNull: false,
      validate:{
        min: 0,
      }
    },
    off: {
      type: S.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 100,
      }
    },
  },
  { sequelize: db, modelName: "product" }
);

module.exports = Product;
