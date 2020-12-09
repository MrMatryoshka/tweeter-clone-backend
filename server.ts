import dotenv from 'dotenv'
dotenv.config();

import express from 'express';
import {UserCtrl} from "./controlles/UserController";
import {registerValidations} from "./vallidations/register";

import './core/db';


const app = express()

app.use(express.json())

app.get('/users', UserCtrl.index)

app.post('/users', registerValidations, UserCtrl.create)

app.get("/users/verify", registerValidations, UserCtrl.verify )

// app.path('/user', UserCtrl.update)
//
// app.delete('/user', UserCtrl.delete)

app.listen(process.env.PORT , () => {
   console.log('SERVER RUNNING!')
})
