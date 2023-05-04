const userDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}
const fsPromises = require('fs').promises;
const path = require('path');

const logoutHandle = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies) { return res.sendStatus(204); }//No content

    const refreshToken = cookies.jwt;
    const foundUser = userDB.users.find(user => user.refreshToken === refreshToken);
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }
    const otherUser = userDB.users.filter(user => user.refreshToken !== foundUser.refreshToken);
    const currentUser = { ...foundUser, refreshToken: '' };
    userDB.setUsers([...otherUser, currentUser])

    await fsPromises.writeFile(path.join(__dirname, "..", "model", "users.json"), JSON.stringify(userDB.users), 'utf-8');

    res.clearCookie('jwt', { httpOnly: true, sameSite: "None", secure: true })
    res.sendStatus(204) // No content!

}

module.exports = { logoutHandle }