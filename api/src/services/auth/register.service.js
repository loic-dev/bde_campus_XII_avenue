import bcrypt from "bcrypt";
import {addUser, confirmEmailDatabase, getUserByEmail, getUserById, getUserByUsername} from '../../models/users.model.js'
import { usernameValidator, emailValidator, passwordValidator , phoneValidator} from "../../utils/regex.util.js";
import {sendVerifyUserEmail} from '../emails/verifyUser.service.js';
import { v4 as uuidv4 } from 'uuid';
import jwt  from 'jsonwebtoken';

export const registerService = async (req,res) => {

    try {
        let {email,username,password,phone} = req.body;

        // valid user info
        if(usernameValidator(username) && emailValidator(email) && passwordValidator(password) && phoneValidator(phone)){
            let userByUsername = await getUserByUsername(username);
            let userByEmail = await getUserByEmail(email);

            if(userByUsername.rowLength > 0){
                console.log(username + " : user with this username already exist")
                throw new Error("User with this username already exist");
            }

            if(userByEmail.rowLength > 0){
                console.log(email + " : user with this email already exist");
                throw new Error("User with this email already exist");
            }

            //create userId
            const userId = uuidv4();


            //hash password
            const hashPassword = await bcrypt.hash(password, 10);


            addUser(userId,username,email,hashPassword,phone).then(() => {
                console.log(`User added sucessfully : ${username} `)

                let tokenConfirmEmail = jwt.sign({ userId },  process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

                //send email verification
                sendVerifyUserEmail(username,tokenConfirmEmail).then((url) => {
                    console.log(`User added sucessfully, an email has been sent to you : ${username} `)

                    //dev environment
                    process.env.NODE_ENV !== "production" && console.log(`URL EMAIL : ${url} `)
                    return res.status(200).send({text:"User added sucessfully, an email has been sent to you"});
                }).catch((err) => {
                    console.log(`Something went wrong while the email sending : ${username} ==> `+err)
                    throw new Error("Something went wrong while the email sending");
                })

            }).catch((err) => {
                console.log(err)
                throw new Error("Something went wrong in database");
            })
        } else {
            console.log(`invalid register data`)
            throw new Error("invalid register data");
        }  
    } catch (err) {
        return res.status(401).send({error:err.message});
    }
    
}


export const confirmEmailService = async (req,res) => {
    try {
        let {token} = req.body;
        let decoded = null;
        try {
            decoded = jwt.verify(token,  process.env.JWT_SECRET_KEY);
        } catch (error) {
            console.log(error)
            throw new Error("Something went wrong while the email confirming")
        }
        
        let user = await getUserById(decoded.userId).catch((err) => {
            console.log(`Error getUserById : `, err);
            throw new Error("Something went wrong while the email confirming")
        });

        if(user.rowLength === 0){
            console.log("Error email confirmation: userId don't exist", decoded.userId);
            throw new Error("Error email confirmation: userId don't exist");
        }

        await confirmEmailDatabase(decoded.userId).catch((err) => {
            console.log(`Error confirmEmailDatabase : `, err);
            throw new Error("Something went wrong while the email confirming")
        });


        return res.status(200).send({text:"User email successfully confirmed, you can login you"});

      } catch(err) {
        return res.status(401).send({error: err.message});
    }
    
}