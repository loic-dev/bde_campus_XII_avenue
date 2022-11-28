import request from 'supertest';
import {app} from '../../index.js';
import constants from '../utils/constants.util.json'
import { registerData } from '../utils/functions.util.js';

export const testLogin = () => {

    describe("POST /login", () => {

        test("login - bad login data restriction ( email, username or password )", async () => {
            const res = await request(app).post("/api/login").send({login:"",password:""})
            expect(res.statusCode).toBe(401);
            expect(res.body).toEqual({error:"Login data policy not respected"});
        })

        test("login - user don't exist", async () => {
            const res = await request(app).post("/api/login").send({login:constants.login.email_userNotConfirmed,password:constants.login.password})
            expect(res.statusCode).toBe(401);
            expect(res.body).toEqual({error:"Login or password doesn't match"});
        })

        test("login - bad password", async () => {
            const res = await request(app).post("/api/login").send({login:constants.login.email,password:constants.login.badPassword})
            expect(res.statusCode).toBe(401);
            expect(res.body).toEqual({error:"Login or password doesn't match"});
        })

        test("login - user email not confirmed", async () => {
            let data = registerData();
            data.email = constants.login.email_userNotConfirmed;
            await request(app).post("/api/register").send(data)
            const res = await request(app).post("/api/login").send({login:constants.login.email_userNotConfirmed,password:constants.login.password})
            expect(res.statusCode).toBe(401);
            expect(res.body).toEqual({error:"User email hasn't been confirmed"});
        })

        test("login by email - successfull", async () => {
            const res = await request(app).post("/api/login").send({login:constants.login.email,password:constants.login.password})
            expect(res.statusCode).toBe(200);
        })

        

})
}
