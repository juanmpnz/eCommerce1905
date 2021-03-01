const S = require('sequelize')
const db = require('../db')

class Order extends S.Model{}
Order.init(
    {
        units: {
            type: S.INTEGER,
            allowNull: false
        },
        subtotal: {
            type: S.FLOAT,
            allowNull: true
        },
    }, {sequelize: db, modelName: 'order'}
)

module.exports = Order