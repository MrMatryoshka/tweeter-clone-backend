import express from 'express'
import {UserModel} from "../modules/UserModule";
import {validationResult} from "express-validator";

class UserController {
   async  index( _ : any , res: express.Response) : Promise<void>{
       try {
           const  users = await UserModel.find({}).exec()

           res.json({
               status : 'success',
               data: users
           })

       }catch (error) {
          res.json({
              status:'error',
              massage : JSON.stringify(error)
          })
       }
    }

    async create(req : express.Request , res: express.Response) : Promise<void>{

       try {
            const errors = validationResult(req);
           if(!errors.isEmpty()){
              res.status(400).json({status : 'error', errors : errors.array()})
               return;
           }
           const data = {
               email: req.body.email,
               fullname: req.body.fullname,
               username: req.body.username,
               password: req.body.password,
               password2 : req.body.password2
           }

           const user = await UserModel.create(data)

           res.json({
               status: 'success',
               data: user
           })
       }catch (error){
           res.json({
               status:'error',
               massage : JSON.stringify(error)
           })
       }
    }
}


export const UserCtrl  =new UserController()
