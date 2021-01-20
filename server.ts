import dotenv from 'dotenv'
dotenv.config();

import express from 'express';
import {UserCtrl} from "./controlles/UserController";
import {registerValidations} from "./vallidations/register";

import './core/db';
import {passport} from "./core/passport";
import {TweetsCtrl} from "./controlles/TweeterController";
import {createTweetsValidations} from "./vallidations/createTweets";


const app = express()

app.use(express.json())
app.use(passport.initialize())

app.get('/users', UserCtrl.index)
app.get('/users/me', passport.authenticate("jwt", {session: false}), UserCtrl.getUserInfo)
app.get('/users/:id',  UserCtrl.show)
// app.path('/user', UserCtrl.update)
// app.delete('/user', UserCtrl.delete)


app.post('/auth/register', registerValidations, UserCtrl.create)
app.get('/auth/verify', registerValidations, UserCtrl.verify )
app.post('/auth/login', passport.authenticate('local'), UserCtrl.afterLogin);

app.get('/tweets' , TweetsCtrl.index)
app.get('/tweets/:id' , TweetsCtrl.show)
app.post('/tweets', passport.authenticate('jwt'), createTweetsValidations, TweetsCtrl.create);
app.delete('/tweets/:id', passport.authenticate('jwt'), TweetsCtrl.delete);
app.patch('/tweets/:id', passport.authenticate('jwt'), createTweetsValidations, TweetsCtrl.update);


app.get('hello',(_,res:express.Response)=>{
   res.send('Salam alekum')
})




app.listen(process.env.PORT , () => {
   console.log('SERVER RUNNING!')
})
