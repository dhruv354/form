const express = require('express')
const router = express.Router()
const HomeController = require('../controllers/HomeController')
const UserController = require('../controllers/UserController')
router.get('/', HomeController.home)
router.post('/create-user', UserController.User)

module.exports = router
