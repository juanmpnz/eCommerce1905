const S = require('sequelize')
const db = require('../db')

class Purchase extends S.Model{}
Purchase.init(
    {
        status: {
            type: S.ENUM({
                values: ['completed', 'pending']
            }),
            defaultValue: 'pending',
        },
        total: {
            type: S.FLOAT,
            allowNull: true
        },
        delivery:{
            type: S.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    }, {sequelize: db, modelName: 'purchase'}
)

module.exports = Purchase