import { Router } from "express";
import User from '../models/User.js'
import bcrypt from 'bcrypt';
import Toastify from 'toastify-js'

const router = Router();

router.get('/register', (req, res) => {
    res.render('register', {
        title: "Register",
        isRegister: true,
    })
})
router.get('/login', (req, res) => {
    res.render('login', {
        title: "Login",
        isLogin: true,
    })
})
router.post('/login', async (req, res) => {
    const existUser = await User.findOne({ email: req.body.email })

    if (!existUser) {
        res.send(200, "User not found")
    }

const isPassEqual = await bcrypt.compare(req.body.password, existUser.password)

if (!isPassEqual) {
    console.log("Password wrong");
    return res.send(200, "Password wrong")
}
res.redirect('/')
})
router.post('/register', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const userData = {
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        email: req.body.email,
        password: hashedPassword,
    }
    const user = await User.create(userData)
    console.log(user);
    res.redirect('/')
})

export default router