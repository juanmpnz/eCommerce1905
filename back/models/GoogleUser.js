const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/index");

class GoogleUser extends Model {}

GoogleUser.init(
  {
    googleId: {
        type: DataTypes.FLOAT,
        allowNull:false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull:false
    }, 
  },   
  {
    sequelize,
    modelName: "GoogleUser",
  }, 
);

module.exports = GoogleUser;
