import nodemailer from 'nodemailer'
import '../_env.example'

const options ={
  host: process.env.NODEMAILER_HOST || 'smtp.mailtrap.io' ,
    port: Number(process.env.NODEMAILER_PORT)  || 2525,
    auth:{
      user:process.env.NODEMAILER_USER ,
        pass:process.env.NODEMAILER_PASS
    }
}

const transport = nodemailer.createTransport(options)

export default  transport;
