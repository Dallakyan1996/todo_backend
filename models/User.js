const { Schema, model } = require('mongoose')

const User = Schema({
    email: { type: String, unique: true, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthDay: { type: String, required: true },
    gender: { type: String, required: true },
    password: { type: String, required: true },
    roles: [{ type: String, ref: 'Role' }]
})

module.exports = model('User', User)