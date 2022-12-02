import {database} from '../../index.js'
import { createSetUpdateDatabase } from '../utils/functions.utils.js';

export const getAllRegister = async (id_event) => {
    return database.query("SELECT * FROM register WHERE id_event = $1", [id_event]);
}

export const getOneRegister = async (id_register) => {
    return database.query("SELECT * FROM register WHERE id_register = $1", [id_register]);
}

export const getOneRegisterWithEmail = async (email_register) => {
    return database.query("SELECT * FROM register WHERE email_register = $1", [email_register]);
}


export const createRegister = async (id_register,id_event, lastname_register,firstname_register , email_register, comment_register, datenow) => {
    return database.query("INSERT INTO register (id_register, id_event, lastname_register, firstname_register, email_register, comment_register, created_at, updated_at ) values ($1,$2, $3, $4,$5,$6, $7, $8)",[id_register,id_event,lastname_register, firstname_register,email_register,comment_register, datenow, datenow]);
}


export const modifyRegister = async (id_register, modifydata) => {
    let SQL = createSetUpdateDatabase(modifydata);
    return database.query(`UPDATE register ${SQL} WHERE id_register = $1`,[id_register]);
}


export const deleteRegister = async (id_register) => {
    return database.query(`DELETE FROM register WHERE id_register = $1`,[id_register]);
}