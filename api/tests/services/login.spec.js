import request from 'supertest';
import {app} from '../../index.js';
import constants from '../utils/constants.util.json'

export const testLogin = () => {

    describe("POST /login", () => {

        test("login - bad login data restriction ( email, username or password )", async () => {
            const res = await request(app).post("/api/login").send({login:"",password:""})
            expect(res.statusCode).toBe(401);
            expect(res.body).toEqual({error:"Login data policy not respected"});
        })

        test("login - user don't exist", async () => {
            const res = await request(app).post("/api/login").send({login:constants.login.badUsername,password:constants.login.password})
            expect(res.statusCode).toBe(401);
            expect(res.body).toEqual({error:"Login or password doesn't match"});
        })

        test("login - bad password", async () => {
            const res = await request(app).post("/api/login").send({login:constants.login.email,password:constants.login.badPassword})
            expect(res.statusCode).toBe(401);
            expect(res.body).toEqual({error:"Login or password doesn't match"});
        })

        test("login - user email not confirmed", async () => {
            await request(app).post("/api/register").send({email:constants.register.email2,username:constants.register.username2,password:constants.register.password,phone:constants.register.phone})
            const res = await request(app).post("/api/login").send({login:constants.login.email_userNotConfirmed,password:constants.login.password})
            expect(res.statusCode).toBe(401);
            expect(res.body).toEqual({error:"User email hasn't been confirmed"});
        })

        test("login by email - successfull", async () => {
            const res = await request(app).post("/api/login").send({login:constants.login.email,password:constants.login.password})
            expect(res.statusCode).toBe(200);
        })

        test("login by username - successfull", async () => {
            const res = await request(app).post("/api/login").send({login:constants.login.username,password:constants.login.password})
            expect(res.statusCode).toBe(200);
        })


        

})
}
