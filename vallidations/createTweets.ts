import {body} from 'express-validator';

export const createTweetsValidations = [
    body('text', 'Ваведите текст твита ')
        .isString()
        .withMessage('Неверный тип даных')
        .isLength({
        min:1,
        max:280
    }).withMessage('Допустимое количество символов 280 '),
    ];
