// const userDB = {
//     users: require('../model/users.json'),
//     setUsers: function (data) { this.users = data }
// }
const User = require('../model/User.js');

// const fsPromises = require('fs').promises;
// const path = require('path');

const logoutHandle = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies) { return res.sendStatus(204); }//No content

    const refreshToken = cookies.jwt;
    const foundUser = await User.findOne({ refreshToken }).exec()
    // const foundUser = userDB.users.find(user => user.refreshToken === refreshToken);
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }
    //    Delete refreshToken in database;
    foundUser.refreshToken = '';
    await foundUser.save()


    res.clearCookie('jwt', { httpOnly: true, sameSite: "None", secure: true })
    res.sendStatus(204) // No content!

}

module.exports = { logoutHandle }