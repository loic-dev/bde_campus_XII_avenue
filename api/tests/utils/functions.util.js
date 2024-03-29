import {database} from '../../index';
import jwt  from 'jsonwebtoken';

import constants from '../utils/constants.util.json'

export const registerData = () => {
    return {
        email:constants.register.email,
        firstname:constants.register.firstname,
        lastname:constants.register.lastname,
        password:constants.register.password,
    }
}

export const createToken = async (email, expired, unknow = false) => {
    const res = await database.query(`select id_user from users where email=$1`, [email]);
    let userId = unknow ? '23cd68da-0139-4a4f-b12f-35f024923ee5' : res.rows[0].id_user;
    let token = null;
    if(expired){
        token = jwt.sign({ userId, iat: Math.floor(Date.now() / 1000) - 30 }, process.env.JWT_SECRET_KEY, { expiresIn: 5 });
    } else {
        token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    }
    return token
}