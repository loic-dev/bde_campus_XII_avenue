import request from 'supertest';
import {app} from '../../index.js';
import constants from '../utils/constants.util.json';
import {createToken} from '../utils/functions.util.js';

export const testAuth = () => {

    describe("GET /auth", () => {

        it("JWT expired", async () => {
            let token = await createToken(constants.register.email,true)
            const res = await request(app).get("/api/auth").set({Authorization:token})
            expect(res.statusCode).toBe(401);
            expect(res.body).toEqual({error:"Error JWT"});
        })

        it("user doesn't exist", async () => {
            
        })

        it("user email not confirmed", async () => {
            
        })

        it("user auth sucessfull", async () => {
            
        })
  

})
}
