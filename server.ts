import dotenv from 'dotenv'
dotenv.config();

import express from 'express';
import {UserCtrl} from "./controlles/UserController";
import {registerValidations} from "./vallidations/register";

import './core/db';
import {passport} from "./core/passport";


const app = express()

app.use(express.json())
app.use(passport.initialize())

app.get('/users', UserCtrl.index)

app.get('/users/me', passport.authenticate("jwt"), UserCtrl.getUserInfo)

app.get('/users/:id',  UserCtrl.show)

app.post('/auth/register', registerValidations, UserCtrl.create)

app.get("/auth/verify", registerValidations, UserCtrl.verify )

app.post('/auth/login', passport.authenticate('local'), UserCtrl.afterLogin);

// app.path('/user', UserCtrl.update)
//
// app.delete('/user', UserCtrl.delete)

app.listen(process.env.PORT , () => {
   console.log('SERVER RUNNING!')
})
