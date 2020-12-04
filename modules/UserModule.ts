import  {model, Schema} from 'mongoose';

const UserSchema = new Schema({
    email : {
        unique : true,
        required: true,
        type: String
    },
    fullname : {
        required : true,
        type: String
    },
    username : {
        unique: true,
        required: true ,
        type: String,
    },
    location:{
        type: String
    },
    password : {
        required: true,
        type: String
    },
    confirmed : {
        type : Boolean
    },
    confirmed_hash: {
        required: true,
        type: String
    },
    about:{
        type: String
    },
    website:{
        type: String
    }

})

export const UserModel = model('User' , UserSchema)
