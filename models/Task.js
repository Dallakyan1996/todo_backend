const { Schema, model } = require('mongoose')

const Task = Schema({
    userID: { type: String, required: true },
    taskText: { type: String, required: true },
    isCompleted: { type: Boolean, required: true },
    edit: { type: Boolean }
})

module.exports = model('Task', Task)