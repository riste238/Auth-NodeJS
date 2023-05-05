// require('dotenv').config()
// const userDB = {
//     users: require('../model/users.json'),
//     setUser: function (data) { this.users = data }
// }
const User = require('../model/User.js');

const express = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fsPromises = require('fs').promises;
const path = require('path')
const cookieParser = require('cookie-parser')
const app = express()

app.use(cookieParser())

const loginHandle = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password

    console.log(`username ${username}`);

    if (!username || !password) { return res.status(400).json({ 'message': 'Username and password are required!' }) }

    const findUser = await User.findOne({ username: username }).exec()
    // const findUser = userDB.users.find(user => user.username === username)
    console.log(`Does something exist into findUser ${findUser.username}`);
    if (!findUser) { return res.status(401) } // Unatorized!

    const match = await bcrypt.compare(password, findUser.password)
    if (match) {

        const roles = Object.values(findUser.roles);

        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": findUser.username,
                    "roles": roles // unities od role property 2001 / 1984  or 5001 will be received together with username.
                }
            },
            process.env.ACCESS_TOKEN,
            { 'expiresIn': '30s' })

        const refreshToken = jwt.sign(
            { "username": findUser.username },
            process.env.REFRESH_TOKEN,
            { 'expiresIn': '1d' })

            // saving refreshToken with current user
            findUser.refreshToken = refreshToken;
            const result = await findUser.save();
            console.log(result);

        // await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'users.json'), JSON.stringify(userDB.users), 'utf-8');

        await res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 })
        await res.status(200).json({ accessToken })

    }

    else { res.sendStatus(401) }
}
module.exports = { loginHandle };
