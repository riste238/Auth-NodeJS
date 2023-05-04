const express = require('express')
const router = express.Router()
const refreshToken = require('../controllers/refreshToken.js')

router.get('/', refreshToken.handleRefreshToken)

module.exports = router;