const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyToken =  (req, res, next) => {

    const authorization = req.headers['authorization']
    if (!authorization) { return res.sendStatus(401) }

    const token = authorization.split(' ')[1];

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN,
        (err, decoded) => {
            if (err) return res.sendStatus(403) //Invalid token

            req.username = decoded.username
            next()
        }
    )
}

module.exports = verifyToken;