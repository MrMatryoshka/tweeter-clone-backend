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
                    done(null, user);
                } else {
                    done(null, false);
                }
            } catch (error) {
                done(error, false);
            }
        },
    ),
);

passport.use(
    new JWTstrategy(
        {
            secretOrKey: process.env.SECRET_KEY || '123',
            jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
        },
        async (payload, done) => {
            try {
                return done(null, payload.user);
            } catch (error) {
                done(error);
            }
        },
    ),
);

passport.serializeUser((user: UserModelInterface, done) => {
    done(null, user?._id);
});

passport.deserializeUser((id, done) => {
    UserModel.findById(id, (err, user) => {
        done(err, user);
    });
});

export { passport };
