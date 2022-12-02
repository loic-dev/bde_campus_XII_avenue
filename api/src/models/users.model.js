import {database} from '../../index.js'
import moment from 'moment';

//return true if user exist
export const getUserById = async (userId) => {
    return database.query("SELECT * FROM users WHERE id_user = $1",[userId]);
}

export const getUserByEmail = async (email) => {
    return database.query("SELECT * FROM users WHERE email = $1",[email]);
}


export const addUser = (id_user,id_role, lastname,firstname,email, password, datenow) => {
    return database.query("INSERT INTO users (id_user, id_role, lastname, firstname, email, password, verify, created_at, updated_at) VALUES ($1,$2,$3,$4,$5,$6,$7,$8, $9)",[id_user,id_role,lastname,firstname,email,password,false,datenow,datenow])
}

export const confirmEmailDatabase = (userId) => {
    var datenow = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    return database.query("UPDATE users SET verify=$1, updated_at=$2 WHERE id_user=$3",[true,datenow,userId])
}

