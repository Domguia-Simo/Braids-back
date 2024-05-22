const express = require('express')
const router = express.Router()

const {login ,register,isLogin,logout} = require('../controllers/admin.controller.js')

// const verifyAdmin = require('../middleware/verifyAdmin.js')

router.route('/login').post(login)
router.route('/register').post(register)
router.route('/isLogin').get(isLogin)
router.route('/logout').get(logout)

module.exports = router;