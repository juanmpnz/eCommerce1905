const S = require("sequelize");
const db = require("../db");
const bcrypt = require("bcrypt");

class User extends S.Model {}
User.init(
    {
        name: {
            type:S.STRING,
            allowNull: false
        },
        email: {
            type: S.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        phone: {
            type: S.STRING,
            allowNull: true
        },
        adress: {
            type: S.TEXT,
            allowNull: true
        },
        password: {
            type: S.STRING,
            allowNull: false
        },
        salt: {
            type: S.STRING
        },
        access: {
            type: S.ENUM({
                values: ['basic', 'admin', 'super']
              }),
            defaultValue: 'basic',
            allowNull: false
        },
    }, {sequelize: db, modelName: 'user'}
)

User.beforeCreate((user) =>
  bcrypt
    .genSalt(16)
    .then((salt) => (user.salt = salt))
    .then(() => user.hashPassword(user.password, user.salt))
    .then((hash) => (user.password = hash))
);

User.prototype.hashPassword = (pass, salt) => bcrypt.hash(pass, salt);

module.exports = User;
