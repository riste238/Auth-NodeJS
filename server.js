require('dotenv').config()
const express = require('express')
const PORT = process.env.PORT || 3001
const cors = require('cors')
const UserModel = require('./config/model.js')
const mongoose = require('mongoose')
const { ObjectId } = require('mongodb');
// const router = require('./route/route.js')
const cookieParser = require('cookie-parser')
const verifyJWT = require('./middleware/verifyJWT.js')
const credentials = require('./middleware/credentials.js')
const corsOptions = require('./config/corsOptions.js')


const app = express()

// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json());
app.use(credentials)
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptions))
app.use(cookieParser());
app.use(express.json())
app.set('view engine', 'ejs')

// const URL = `mongodb+srv://ristebosev:${process.env.PASSWORD}@cluster0.fw9frx5.mongodb.net/test`
// mongoose.set('strictQuery', false);

// mongoose.connect(URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
//     .then((res) => {
//         console.log(`I connected to a database!`);
//         app.listen(PORT, () => {
//             console.log(`Listening to port ${PORT}`);
//         })
//     })
//     .catch((err) => {
//         console.log(`Mongo DB is fails,the reason is this one ${err}`);
//     })

// app.get('/', async (req, res) => {
//     try {
//         await UserModel.find().then(function (models) {
//             console.log(models);
//             res.send(models)
//         })
//     }
//     catch (err) {
//         console.log(err);
//     }
// })

// app.post('/register', async (req, res) => {
//     const { username, lastname, userId } = req.body;

//     const newUser = await new UserModel({
//         username: username,
//         lastname: lastname,
//         userId: userId
//     })

//     newUser.save().then(() => {
//         res.send(newUser)
//     })
//         .catch((err) => {
//             console.log(err);
//         })
// })

// app.post('/login', async (req, res) => {
//     const { username, lastname, userId } = req.body

//     try {
//         const findUser = await UserModel.find({ username, lastname, userId });
//         console.log(findUser);
//         res.send(findUser)
//     }
//     catch (err) {
//         console.log('User is not find ', err);
//     }
// })

// app.get('/user/:id', async (req, res) => {
//     try {
//         const userId = await UserModel.findOne({ _id: new ObjectId(req.params.id) })
//         console.log(userId);
//         res.send(userId)
//     }
//     catch (err) { console.log(err); }
// })

// // app.put('/update/:id', async(req,res) => {
// //     const reqBody = req.body;
// //     const param = req.params.id
// // //    try{
// //  const updatedUser =  await UserModel.updateOne({_id: new ObjectId(param)}, {$set: {reqBody}})
// //         // console.log('Has something updated? ',updatedUser);
// //         // res.send(updatedUser)
// // //    }
// // //    catch(err){
// // //     console.log(err);
// // //    }
// //    .then((result) => {res.status(200).json(result)})
// //     .catch((err) => {res.status(500).json({message: err.message})})
// // })


// app.put('/update', async(req,res) => {
//     const {username} = req.body;
// try{
//     const updatedUser =   await UserModel.updateOne({username: "Riste"}, {$set: {username: username}})
//     res.send(updatedUser)
// }
// catch(err){ console.log(err);}
//         // console.log('Has something updated? ',updatedUser);
//         // res.send(updatedUser)
// //    }
// //    catch(err){
// //     console.log(err);
// //    }
// //    .then((result) => {res.status(200).json(result)})
//     // .catch((err) => {res.status(500).json({message: err.message})})
// })

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
})


app.use('/register', require('./route/register.js'))
app.use('/login', require('./route/login.js'))
app.use('/restart', require('./route/refresh.js'))
app.use('/logout', require('./route/logout.js'))

app.use(verifyJWT)
app.use('/employee', require('./route/route.js'))

console.log('riki');
// dejan - pass - deki
//  stojan - pass - stole
//  riste - pass -


  // {
    //     "username": "Riste",
    //     "roles": {
    //         "User": 2001,
    //         "Editor": 1984,
    //         "Admin": 5150
    //     },
    //     "password": "$2b$10$F58BOo1yY3eoJZwm6s9E7eJHjNtJnpAgTIhiYolQfXYegihTL6G.2",
    //     "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlJpc3RlIiwiaWF0IjoxNjgzMTk2MTEyLCJleHAiOjE2ODMyODI1MTJ9.clYZGy0OoTJ7rJHrTOyEIYlgCizOCbMb28iA_NnQZPw"
    // },