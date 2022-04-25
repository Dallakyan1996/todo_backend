const User = require('../models/User')
const Role = require('../models/Role')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const { secret } = require('../config')
const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }

    return jwt.sign(payload, secret, {
        expiresIn: "24h"
    })
}
class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors) {
                res.send(400).json('Գրանցումը սխալ է։')
            }
            const { email, firstName, lastName, birthDay, gender, password } = req.body
            const candidate = await User.findOne({ email })
            if (candidate) {
                return res.status(400).json({ message: "Այս անունով օգտատեր արդեն գոյություն ունի։" })
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({ value: "USER" })
            const user = new User({ email, firstName, lastName, birthDay, gender, password: hashPassword, roles: [userRole.value] })
            await user.save()
            return res.json({ message: "Գրանցումը հաջողությամբ կատարվել է։" })

        } catch (e) {
            console.log(e)
            res.status(400).json({ message: 'Registration error' })
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ email })
            if (!user) {
                res.status(400).json({ message: 'Գաղտնաբառը կամ mail-ը սխալ է։' })
            }
            else {
                const { firstName, lastName, birthDay, gender } = user
                const token = generateAccessToken(user._id, user.roles)
                const validPassword = bcrypt.compareSync(password, user.password)
                if (!validPassword) {
                    res.status(400).json({ message: 'Գաղտնաբառը սխալ է։' })
                }
                return res.status(200).send({ firstName, lastName, birthDay, gender, token })
            }

        } catch (e) {
            console.log(e)
            res.status(400).json({ message: 'Գաղտնաբառը կամ mail-ը սխալ է։' })
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new authController()
