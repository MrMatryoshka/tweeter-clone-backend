import express from 'express'
import {UserModel, UserModelInterface} from "../modules/UserModule";
import {validationResult} from "express-validator";
import {generateMD5} from "../utils/genirateHash";
import {sendEmail} from "../utils/sendMaill";

class UserController {
   async  index( _ : any , res: express.Response) : Promise<void>{
       try {
           const  users = await UserModel.find({}).exec()

           res.json({
               status : 'success',
               data: users
           })

       }catch (error) {
           res.status(500).json({
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
           const data: UserModelInterface = {
               email: req.body.email,
               username: req.body.username,
               fullname: req.body.fullname,
               password: req.body.password,
               confirmHash: generateMD5(process.env.SECRET_KEY || Math.random().toString() ),

           }


           const user =  await UserModel.create(data)

          sendEmail(
              {
              emailFrom:'admin@tweeter.com',
              emailTo: data.email,
              subject:'Подтверждение почты для Tweeter-clone',
              html:`Для того, чтобы подтвердить почту, перейдите <a href="http://localhost:${
                  process.env.PORT || 8888
              }/users/verify?hash=${data.confirmHash}">по этой ссылке</a>`
          },
              (err: Error |null ) =>
           {
               if (err) {
                   res.status(500).json({
                       status: 'error',
                       massage: JSON.stringify(err)
                   })
               }else {
                   res.status(201).json({
                       status: 'success',
                       data: user
                   })
               }
           })

       }catch (error){
           res.status(500).json({
               status:'error',
               massage : JSON.stringify(error)
           })
       }
    }

    async  verify( req : any , res: express.Response) : Promise<void>{
        try {
            const hash = req.query.hash

            console.log(hash)
            if(!hash){
                res.status(400).send('verify:что то не так ')
            }

           const user = await UserModel.findOne({confirmHash : hash}).exec();

            if(user){
                user.confirmed = true
               await user.save()
                res.json({
                    status : 'success',
                })
            }else {
                res.status(404).json({
                    status : 'error',
                    message:'Ошибка'
                })
            }


        }catch (error) {
            res.status(500).json({
                status:'error',
                massage : JSON.stringify(error)
            })
        }
    }
}


export const UserCtrl  =new UserController()
