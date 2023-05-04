const data = {
    employees: require('../model/employees.json'),
    setEmployees: function (data) {
        this.employees = data
    }
}

const getEmployees = async (req, res) => {
    await res.json(data.employees)
}

const createNewEmployees = async (req, res) => {

    const newEmployee = {
        id: data.employees[data.employees.length - 1].id + 1 || 1,
        username: req.body.username,
        lastname: req.body.lastname
    }

    if (!newEmployee.username || !newEmployee.lastname) {
        return res.status(400).json({ message: "Firstname and lastname are reqired" })
    }

    data.setEmployees([...data.employees, newEmployee])

    await res.status(201).json(data.employees)
}

const updateEmployee =  (req, res) => {

    const employee =  data.employees.find(employee => employee.id === parseInt(req.body.id));

    if (!employee) { res.status(400).json({ message: `Employee ID  ${req.body.id} doesn't exist in the database!` }) }

    if (req.body.username) { employee.username = req.body.username }
    if (req.body.lastname) { employee.lastname = req.body.lastname }

    const filteredArray =  data.employees.filter(employee => employee.id !== parseInt(req.body.id));
    const unSortedArray =  [...filteredArray, employee];

    data.setEmployees(unSortedArray.sort((a, b) => {
        if (a.id > b.id) { return -1 }
        else if (a.id < b.id) {
            return 1
        }
        else {
            return 0
        }
    }))
    res.status(200).json(data.setEmployees)


}

module.exports = {
    getEmployees,
    createNewEmployees,
    updateEmployee,
}
