import bcrypt from "bcrypt";
import {getUserByEmail} from '../../models/users.model.js'
import { emailValidator, passwordValidator } from "../../utils/regex.util.js";
import jwt  from 'jsonwebtoken';


export const loginService = async (req, res) => {
    let {login, password } = req.body;
    try {
        let isEmail = emailValidator(login);
        console.log(isEmail)
        let passwordPolicyRespected = passwordValidator(password);
        let databaseResponse = null;


        //password policy doesn't respected
        if(!passwordPolicyRespected){
            console.log("password policy not respected");
            return res.status(401).send({error:"Login data policy not respected"});
        }


        //verify login data policy
        if(isEmail){
            databaseResponse = await getUserByEmail(login);
        } else {
            console.log("Login data policy not respected");
            return res.status(401).send({error:"Login data policy not respected"});
        }


        //verify user exist
        if(databaseResponse.rowCount === 0){
            console.log("User unknow");
            return res.status(401).send({error:"Login or password doesn't match"});
        }

        const user = databaseResponse.rows[0];


        //verify confirm user email
        if(!user.verify){
            console.log(login + " : user email hasn't been confirmed")
            return res.status(401).send({error:"User email hasn't been confirmed"});
        }
        

        //verify password
        let hashPassword = await bcrypt.compare(password, user.password);
        if(!hashPassword){
            console.log(login + " : password wrong")
            return res.status(401).send({error:"Login or password doesn't match"});
        }

        let userId = user.id;
        let loginToken = jwt.sign({ userId },  process.env.JWT_SECRET_KEY, { expiresIn: '24h' });

        return res.status(200).send({text:"User login successfully", token:loginToken});


    } catch (error) {
        console.log("Error login : ", error)
        return res.status(401).send({error:"Something went wrong while login"});
    }

    



    
}