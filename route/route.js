const router = require('express').Router()
const employees = require('../controllers/employeesControllers.js')


router.route('/')
    .get(employees.getEmployees)
    // .get(require('../middleware/verifyJWT.js'), employees.getEmployees)?
    .post(employees.createNewEmployees)
    .put(employees.updateEmployee)

module.exports = router