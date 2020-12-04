import express from 'express';
import {UserCtrl} from "./controlles/UserController";
import {registerValidations} from "./vallidations/register";
// import bodyParser from "body-parser";

const app = express()

app.use(express.json())

app.get('/user', UserCtrl.index)

app.post('/user', registerValidations, UserCtrl.create)

// app.path('/user', UserCtrl.update)
//
// app.delete('/user', UserCtrl.delete)

app.listen(8888, () => {
   console.log('SERVER RUNNING!')
})
