const express = require('express')
const router = express.Router()
const logout = require('../controllers/logoutController.js')

router.get('/', logout.logoutHandle)

module.exports = router;