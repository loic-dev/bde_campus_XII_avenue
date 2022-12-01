import request from 'supertest';
import {app,database} from '../../index.js';
import constants from '../utils/constants.util.json'
import {registerData,createToken} from '../utils/functions.util.js';



export const testRegister = () => {
    describe("POST /register", () => {

        //empty users table
        test("empty users table", async () => {
            await database.query("truncate users");
        })

        test("invalid user data", async () => {
            const res = await request(app).post("/api/register").send({email:"",firstname:"",password:"",lastname:""})
            expect(res.body).toEqual({error:"invalid register data"});
        })

        

        test("successfull register", async () => {
            await database.query("truncate users");
            const response = await request(app).post("/api/register").send(registerData())
            expect(response.statusCode).toBe(200);
        })

        test("user with this email already exist", async () => {
            const response = await request(app).post("/api/register").send(registerData())
            expect(response.body).toEqual({error:"User with this email already exist"});
        })

        test("confirm email - token expired", async () => {
            let token = await createToken(constants.register.email,true)
            const confirm_response = await request(app).post("/api/confirm-email").send({token});
            expect(confirm_response.statusCode).toBe(401);
            expect(confirm_response.body).toEqual({error:"Something went wrong while the email confirming"});
        })

        test("confirm email - unknow user", async () => {
            let token = await createToken("test",false,true);
            const confirm_response = await request(app).post("/api/confirm-email").send({token});
            expect(confirm_response.statusCode).toBe(401);
            expect(confirm_response.body).toEqual({error:"Error email confirmation: userId don't exist"});
        })

        test("confirm email - success", async () => {
            let token = await createToken(constants.register.email,false)
            const confirm_response = await request(app).post("/api/confirm-email").send({token});
            expect(confirm_response.statusCode).toBe(200);
            expect(confirm_response.body).toEqual({text:"User email successfully confirmed, you can login you"});
        })


        

})
}

