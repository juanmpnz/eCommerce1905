const S = require('sequelize')
const db = require('../db')

class Rate extends S.Model{}
Rate.init(
    {
        content: {
            type:S.INTEGER,
            allowNull: false,
            validate: {
                min: 0,
                max: 5,
            }
        },
    }, {sequelize: db, modelName: 'rate'}
)

module.exports = Rate