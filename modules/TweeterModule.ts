import { model, Schema, Document } from 'mongoose';
import {UserModelInterface} from "./UserModule";

export interface TweetsModelInterface {
    _id?: string;
    text: string;
    user: UserModelInterface ;
    likes?: string;
    retweets?: string;
    replies?: string;
}

export type TweetsModelDocumentInterface = TweetsModelInterface & Document;

const TweetsSchema = new Schema({
    text: {
        required: true,
        type: String,
        minlength: 1 ,
        maxlength: 280
    },
    user: {
        required: true,
        ref: "User",
        type: Schema.Types.ObjectId,
    },
}, {
    timestamps: true
});



export const TweetsModel = model<TweetsModelDocumentInterface>('Tweets', TweetsSchema);
