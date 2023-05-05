
// getAllUsers, deleteUser, getUser
const User = require('../model/User.js');
const { ObjectId } = require('mongodb');


const getAllUsers = async (req, res) => {
    const users = await User.find();
    if (!users) { return res.status(204).json({ "message": "No users found!" }) }

    res.json(users)
}

const deleteUser = async (req, res) => {
    if (!req?.body?.id) { return res.status(400).json({ "message": "id isn't exist!" }) }
    const id = req.body;
    // const deleteUser = await User.findOne({ _id: new ObjectId(id) }, {}).exec()

    // if (!deleteUser) { return res.status(400).json({ "message": `It isn't found alike user ${deleteUser}` }) }
    // 
    // const result = await deleteUser.deleteOne({ _id: id });
    await User.deleteOne({ _id: new ObjectId(id) })
        .then((result) => {
            res.json(result)
        })
        .catch((err) => { console.log(err.message); })
}

const getUser = async (req, res) => {
    try {
        if (!req?.params?.id) { return res.status(400).json({ "message": "There is not exist alike ID" }) }
        // const userId = req.params.id;
        const result = await User.findOne({ _id: req.params.id }).exec()
        console.log(`Result has a user ${result.username}`);
        res.json(result)
    }
    catch (err) {
        console.error(err.message);

    }

}

module.exports = {

    getAllUsers,
    deleteUser,
    getUser

}