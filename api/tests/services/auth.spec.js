import request from 'supertest';
import {app} from '../../index.js';
import constants from '../utils/constants.util.json';
import {createToken} from '../utils/functions.util.js';

export const testAuth = () => {

    describe("GET /auth", () => {

        test("JWT expired", async () => {
            let token = await createToken(constants.register.username,true)
            const res = await request(app).get("/api/auth").set({Authorization:token})
            expect(res.statusCode).toBe(401);
            expect(res.body).toEqual({error:"Error JWT"});
        })

        test("user doesn't exist", async () => {
            
        })

        test("user email not confirmed", async () => {
            
        })

        test("user auth sucessfull", async () => {
            
        })
  

})
}
