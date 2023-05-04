const userDB = {
    users: require('../model/users.json'),
    setUser: function (data) { this.users = data }
}

const jwt = require('jsonwebtoken')
require('dotenv').config()


const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) { return res.status(401) }

    const refreshToken = cookies.jwt;


    const foundUser = userDB.users.find(user => user.refreshToken === refreshToken)
    if (!foundUser) { return res.status(403) }

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) { return res.sendStatus(403) }

            const accessToken = jwt.sign(
                { "username": decoded.username },
                process.env.ACCESS_TOKEN,
                { 'expiresIn': '30s' }
            )
            res.json({ accessToken })
        }
    )
}

module.exports = { handleRefreshToken };