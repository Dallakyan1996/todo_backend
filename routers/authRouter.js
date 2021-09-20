const Router = require('express')
const { check } = require('express-validator')
const controller = require('../controllers/authController')
const authMiddleware = require('../middleware/authMiddleware')
const router = new Router()

router.post('/registration', [
    check("email", "Mail-ը լրացված չէ").notEmpty(),
    check("firstName", "Անունը լրացված չէ").notEmpty(),
    check("lastName", "Ազգանունը լրացված չէ").notEmpty(),
    check("birthDay", "Ծննդյան օրը լրացված չէ").notEmpty(),
    check("gender", "Սեռը լրացված չէ").notEmpty(),
    check("password", "Գաղտնաբառի երկարությունը պետք է լինի մեծ 4-ից, և փոքր 10-ից").isLength(4, 10)
], controller.registration)
router.post('/login', controller.login)
router.get('/users', authMiddleware, controller.getUsers)

module.exports = router