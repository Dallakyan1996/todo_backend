const Router = require('express')
const { check } = require('express-validator')
const todoController = require('../controllers/todoController')
const authMiddleware = require('../middleware/authMiddleware')
const router = new Router()

router.post('/add-task', authMiddleware, todoController.addTask)
router.post('/delete-task', authMiddleware, todoController.deleteTask)
router.post('/complete-task', authMiddleware, todoController.completeTask)
router.get('/clear-completed', authMiddleware, todoController.clearCompleted)
router.post('/edit-task', authMiddleware, todoController.editTask)
router.get('/task-list', todoController.getTasks)

module.exports = router