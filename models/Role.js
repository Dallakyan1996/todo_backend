const { Schema, model } = require('mongoose')

const Role = Schema({
    value: { type: String, unique: true, default: 'USER' },
})

module.exports = model('Role', Role)