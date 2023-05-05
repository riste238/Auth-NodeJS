// const data = {
//     employees: require('../model/employees.json'),
//     setEmployees: function (data) {
//         this.employees = data
//     }
// }
const { ObjectId } = require('mongodb');
const Employee = require('../model/Employee.js')

const getEmployees = async (req, res) => {
    const employees = await Employee.find()
    if (!employees) { return res.status(204).json({ 'message': 'No employees found' }) }

    res.json(employees);
}

const createNewEmployees = async (req, res) => {

    if (!req?.body?.username || !req?.body?.lastname) {
        res.status(400).json({ 'message': 'Username & lastname are required!' })
    }
    try {
        const newEmployee = await Employee.create({
            username: req.body.username,
            lastname: req.body.lastname
        })
        const result = newEmployee.save()
        console.log(`It's a result from created new user ${result}`);
        res.json(result)

    }
    catch (err) {
        console.log(err);
    }
}

const updateEmployee = async (req, res) => {
    if (!req?.body?.id) { return res.status(400).json({ 'message': 'ID parameter is required!' }) }
    const employee = await Employee.findOne({ _id: req.body.id }).exec()
    if (!employee) { return res.status(204).json({ 'message': `No emoployee matches ID  ${req.body.id}` }) }

    if (req.body?.username) { employee.username = req.body.username }
    if (req.body?.lastname) { employee.lastname = req.body.lastname }


    const result = await employee.save()
    console.log(result);
    res.json(result);

}

// const deleteEmployee = async (req, res) => {
//     // if (!req?.body?.username) return res.status(400).json({ 'message': 'Employee ID required.' });
//         const employee = req.body.username;
//     // const employee = await Employee.findOne({ _id: req.body.username }).exec();
//     // if (!employee) {
//     //     return res.status(204).json({ "message": `No employee matches ID ${req.body.id}.` });
//     // }
//     const result = await Employee.deleteOne({employee}); //{ _id: req.body.id }
//     res.json(result);
// }


const deleteEmployee = async (req, res) => {
    const param = req.params.id;
    // await Employee.deleteOne({ _id:  param })
    await Employee.deleteOne({ _id: new Object( param)})
        .then((result) => {
            res.status(200).json(result)
        })
        .catch((err) => { console.log(err); })
        // next()
}

const getEmployee = async (req, res) => {
    if (!req?.params?.id) { return res.status(400).json({ "message": "ID parameter is required!" }) }

    // const employee = await Employee.findOne({_id : new ObjectId(req.params.id)}).exec()
    const employee = await Employee.findOne({ _id: req.params.id }).exec()
    res.json(employee)
}

module.exports = {
    getEmployees,
    createNewEmployees,
    updateEmployee,
    deleteEmployee,
    getEmployee

}
