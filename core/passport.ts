import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTstrategy, ExtractJwt } from 'passport-jwt';

import {generateMD5} from "../utils/genirateHash";
import {UserModel, UserModelInterface} from "../modules/UserModule";


passport.use(
    new LocalStrategy(
        async (username, password, done): Promise<void> => {
            try {
                const user = await UserModel.findOne({ $or: [{ email: username }, { username }] }).exec();

                if (!user) {
                    return done(null, false);
                }

                if (user.password === generateMD5(password + process.env.SECRET_KEY)) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            } catch (error) {
                console.log(error)
                return  done(error, false);
            }
        },
    ),
);

passport.use(
    new JWTstrategy(
        {
            secretOrKey: process.env.SECRET_KEY || '123',
            jwtFromRequest: ExtractJwt.fromHeader('token'),
        },
        async (payload: {data : UserModelInterface}, done): Promise<void> => {
            try {
                const user = await  UserModel.findById(payload.data._id).exec()
                if (user){
                   return  done (null ,user)
                }
                done(null ,false)
            } catch (error) {
               return  done(error ,false);
            }
        },
    ),
);

passport.serializeUser((user: UserModelInterface, done) => {
    done(null, user?._id);
});

passport.deserializeUser((id, done) => {
    UserModel.findById(id, (err, user) => {
       return  done(err, user);
    });
});

export { passport };
