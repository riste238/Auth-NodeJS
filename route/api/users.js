const express = require('express')
const router = express.Router()
const user = require('../../controllers/userControllers.js')
const ROLE_LIST = require('../../config/roles_list.js')
const verifyRoles = require('../../middleware/verifyRoles.js')

router.route('/')
    .get(verifyRoles(ROLE_LIST.Admin, ROLE_LIST.Editor), user.getAllUsers)
    .delete(verifyRoles(ROLE_LIST.Admin), user.deleteUser)

router.route('/:id')
    .get(verifyRoles(ROLE_LIST.Admin), user.getUser)

module.exports = router;