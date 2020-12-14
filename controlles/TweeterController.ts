import express from 'express'
import {TweetsModel,} from "../modules/TweeterModule";
import {isValidationId} from "../utils/isValidObjectId";
import {UserModelInterface} from "../modules/UserModule";
import {validationResult} from "express-validator";


class TweetsController {
    async index(_: any, res: express.Response): Promise<void> {
        try {
            const tweets = await TweetsModel.find({})
                .populate('user')
                .sort({'createdAt': '-1'} )
                .exec()

            res.json({
                status: 'success',
                data: tweets
            })

        } catch (error) {
            res.status(500).json({
                status: 'error',
                massage: JSON.stringify(error)
            })
        }
    }

    async show(req: any, res: express.Response): Promise<void> {
        try {
            const tweetId = req.params.id

            if (!isValidationId(tweetId)) {
                res.status(400).json({
                    status: 'error',
                    massage: 'НЕ верный запрос !!!'
                })
            }
            const tweet = await TweetsModel.findById(tweetId).populate('user').exec()

            if (!tweet) {
                res.status(404).json({
                    status: 'error',
                    massage: 'Пост не найден !!!'
                })
            }
            res.json({
                status: 'success',
                data: tweet
            })

        } catch (error) {
            res.status(500).json({
                status: 'error',
                massage: JSON.stringify(error)
            })
        }
    }

    async create(req: express.Request, res: express.Response): Promise<void> {
        try {
            const user = req.user as UserModelInterface;

            if (user?._id) {
                const errors = validationResult(req);

                if (!errors.isEmpty()) {
                    res.status(400).json({status: 'error', errors: errors.array()});
                    return;
                }

                //TODO: поправить типизацию
                const data: any = {
                    text: req.body.text,
                    user: user._id
                };

                const tweet = await TweetsModel.create(data);

                res.json({
                    status: 'success',
                    data: await tweet.populate('user').execPopulate(),
                });
            }
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error,
            });
        }
    }

    async delete(req :express.Request, res: express.Response): Promise<void> {
        const user = req.user as UserModelInterface

        try {

            if(user){
                const tweetId = req.params.id

                if(! isValidationId(tweetId)){
                    res.status(400).send()
                    return
                }

                const tweet = await TweetsModel.findById(tweetId)

                if(tweet){

                    if( String(tweet.user._id) === String(user._id)) {
                        tweet.remove()
                        res.json({
                            status: 'success',
                            message: "твит удален "
                        })
                    }else {
                        res.status(403).json({message: " что то не так "})
                    }
                }else {
                    res.status(404).json({message: "Твит не найден"})
                }

            }

        } catch (error) {
            res.status(500).json({
                status: 'error',
                massage: JSON.stringify(error)
            })
        }
    }

    async update(req: express.Request, res: express.Response): Promise<void> {

            const user = req.user as UserModelInterface

        try {
            if(user){
                const tweetId = req.params.id

                if(!isValidationId(tweetId)){
                    res.status(400).send({message:"не аторезированный"})
                    return
                }
                const tweet = await TweetsModel.findById(tweetId)

                if(tweet){
                    if( String(tweet.user._id) === String(user._id)) {
                        tweet.text = req.body.text
                        tweet.save()
                        res.json({
                            status: 'success',
                            message: "твит изменен "
                        })
                    }else {
                        res.status(403).json({message: " не валаделец твита  "})
                    }
                }else {
                    res.status(404).json({message: "Твит не найден"})
                }
            }
        } catch (error) {
            res.status(500).json({
                status: 'error',
                massage: JSON.stringify(error)
            })
        }
    }


}

    export const TweetsCtrl  = new TweetsController()
