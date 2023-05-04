const express = require('express');
const register = require('../controllers/registerController.js')
const router = express.Router();

router.post('/', register.handleUser);

module.exports = router;