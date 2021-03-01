const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/index");

class FacebookUser extends Model {}

FacebookUser.init(
  {
    facebookId: {
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
    modelName: "FacebookUser",
  }, 
);

module.exports = FacebookUser;
