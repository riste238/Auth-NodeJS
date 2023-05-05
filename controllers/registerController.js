// const userDB = {
//     users: require('../model/users.json'),
//     setUsers: function (data) { this.users = data }
// }
const User = require('../model/User.js');

const fsPromises = require('fs').promises;
const bcrypt = require('bcrypt');
const path = require('path');

const handleUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username & password are required!' })
    }
    const duplicate = await User.findOne({username: username}).exec()
    // const duplicate = userDB.users.find(user => user.username === username);
    if (duplicate) { return res.status(409) }

    try {

        // bcrypt -> is asynchronous call back function, what receive a lot of requests. It's a c++ funciton, so that means, it's executing in c++ through LIBUV library

        const handlePassword = await bcrypt.hash(password, 10);
        // const newUser = {
        //      "username": username, 
        //      "roles": {
        //         "User": 2001
        //      },
        //      "password": handlePassword
        //      }

        const newUser = await User.create({
            username: username,
            password: handlePassword
        })
            console.log(newUser);

        // await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'users.json'), JSON.stringify(userDB.users), 'utf8' , '\n');

        res.status(201).json({ "succes": `New user is created ${newUser.username}` })
    }
    catch (err) {
        res.status(500).json({ 'message': err.message })
    }
}

module.exports = {handleUser}