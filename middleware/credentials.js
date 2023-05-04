const allowedOrigin = require('../config/allowedOrigin.js')

const credentials = (req, res, next) => {
    console.log("what all contains headers object "  + req.headers);
    const origin = req.headers.origin; // headers object has an origin property

    if(allowedOrigin.includes(origin)){
        res.header('Access-Control-Allow-Credentials', true)
    }
    next()

}

module.exports = credentials;