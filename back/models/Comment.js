const S = require('sequelize')
const db = require('../db')

class Comment extends S.Model{}
Comment.init(
    {
        content: {
            type:S.TEXT,
            allowNull: false
        },
    }, {sequelize: db, modelName: 'comment'}
)

module.exports = Comment