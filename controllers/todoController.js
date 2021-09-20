const Task = require('../models/Task')
const jwt_decode = require('jwt-decode');

class todoController {
    async addTask(req, res) {
        try {
            const task = new Task(req.body)
            await task.save((err, result) => {
                return res.json(result.id);
            })
        }
        catch (e) {
            console.log(e)
            res.status(400).json({ message: 'Add Task Error' })
        }

    }

    async deleteTask(req, res) {
        try {
            const id = req.body._id;
            await Task.findByIdAndDelete(id);
        }
        catch (e) {
            console.log(e)
        }
    }

    async completeTask(req, res) {
        try {
            const id = req.body._id;
            const isChecked = req.body.isChecked;
            await Task.updateOne({ _id: id }, {
                $set: {
                    isCompleted: isChecked
                }
            })
        }

        catch (e) {
            console.log(e)
        }
    }

    async clearCompleted(req, res) {
        try {
            await Task.deleteMany({ isCompleted: true })
        }
        catch (e) {
            console.log(e)
        }
    }

    async editTask(req, res) {
        try {
            const id = req.body._id;
            const newText = req.body.newText;
            await Task.updateOne({ _id: id }, {
                $set: {
                    taskText: newText
                }
            })
        }
        catch (e) {
            console.log(e)
        }
    }


    async getTasks(req, res) {
        let userID = jwt_decode(req.headers.authorization.split(' ')[1]);
        // console.log(userID.id)
        try {
            const tasks = await Task.find({ userID: userID.id });
            res.json(tasks)
        } catch (e) {
            console.log(e)
        }
    }
}


module.exports = new todoController()