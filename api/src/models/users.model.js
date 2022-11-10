import {database} from '../../index.js'



/* CREATE TABLE users (
    id UUID,
    username text,
    email text,
    password text,
    phone text,
    email_confirmed boolean,
    created_at text,
    updated_at text,
    PRIMARY KEY (id));

)*/



//return true if user exist
export const getUserById = async (userId) => {
    return database.query("SELECT * FROM users WHERE id = $1",[userId]);
}

export const getUserByUsername = async (username) => {
    return database.query("SELECT * FROM users WHERE username = $1 ALLOW FILTERING",[username])
    
}

export const getUserByEmail = async (email) => {
    return database.query("SELECT * FROM users WHERE email = $1 ALLOW FILTERING",[email]);
}


export const addUser = (userId,username,email,hashPassword, phone) => {
    return database.query("INSERT INTO users (id, username, email, password, phone, email_confirmed, created_at, updated_at) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",[userId,username,email,hashPassword,phone,false,`${Date.now()}`,`${Date.now()}`])
}

export const confirmEmailDatabase = (userId) => {
    return database.query("UPDATE users SET email_confirmed=$1, updated_at=$2 WHERE id=$3",[true,`${Date.now()}`,userId])
}

