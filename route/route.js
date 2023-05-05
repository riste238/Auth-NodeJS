const router = require('express').Router()
const employees = require('../controllers/employeesControllers.js')
const ROLE_LIST = require('../config/roles_list.js')
const verifyRoles = require('../middleware/verifyRoles.js')


router.route('/')
    .get(employees.getEmployees)
    .post(verifyRoles(ROLE_LIST.Admin, ROLE_LIST.Editor), employees.createNewEmployees)
    .put(verifyRoles(ROLE_LIST.Admin, ROLE_LIST.Editor), employees.updateEmployee)
// .delete(verifyRoles(ROLE_LIST.Admin), employees.deleteEmployee)
// router.route('/:id')
// .delete(verifyRoles(ROLE_LIST.Admin), employees.deleteEmployee)

router.route('/:id')
    .delete(verifyRoles(ROLE_LIST.Admin), employees.deleteEmployee)
router.route('/:id')
    .get(employees.getEmployee)

// about delete => just admin has a permission to delete some employee;
module.exports = router