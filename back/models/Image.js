const S = require('sequelize')
const db = require('../db')

class Image extends S.Model{}
Image.init(
    {
        url: {
            type:S.STRING,
            allowNull: false
        },
    }, {sequelize: db, modelName: 'image'}
)

module.exports = Image