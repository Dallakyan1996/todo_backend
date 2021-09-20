const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const authRouter = require("./routers/authRouter")
const todoRouter = require("./routers/todoRouter")
const PORT = process.env.PORT || 3001
const app = express()

app.use(express.json())
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));

app.use('/auth', authRouter)
app.use(todoRouter)
const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://dbToDo:toDo2021@cluster0.70faz.mongodb.net/todo?retryWrites=true&w=majority')
        app.listen(PORT, () => console.log(`server  started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()
