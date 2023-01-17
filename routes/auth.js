import { Router } from "express";
import User from '../models/User.js'
import bcrypt from 'bcrypt';

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
router.post('/login', (req, res) => {
    console.log(req.body);
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