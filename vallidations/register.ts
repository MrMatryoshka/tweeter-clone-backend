import {body} from 'express-validator';

export const registerValidations = [
    body('email', 'Ваведите E-mail').isEmail().withMessage('Неверный E-mail').isLength({
        min:9,
        max:50
    }).withMessage('Неверный E-mail'),

    body('fullname', 'Ваведите имя').isString().withMessage('Неверный имя').isLength({
        min:2,
        max:50
    }).withMessage('Неверный имя'),

    body('username', 'Укажите логин ').isString().withMessage('Неверный логин').isLength({
        min:2,
        max:50
    }).withMessage('Неверный логин'),


    body('password', 'Укажите пароль ').isString().withMessage('Неверный пароль').isLength({
        min:6,
        max:50
    }).withMessage('Слишком коротки пароль')
        .custom((value,{req}) => {
            if(value != req.body.password2){
                throw new Error('пароли не совподают')
            }else {
                return value
            }
        })
];
