import request from 'supertest';
import {app} from '../../index.js';
import constants from '../utils/constants.util.json'
import { createToken } from '../utils/functions.util.js';

export const testHome = () => {

    describe("home", () => {

        test("home - get all partners", async () => {
            const res = await request(app).get("/api/partners")
            expect(res.statusCode).toBe(200);
            expect(res.body.data.length).toBeGreaterThan(0);
        })

        test("home - get all panels", async () => {
            const res = await request(app).get("/api/panels")
            expect(res.statusCode).toBe(200);
            expect(res.body.data.length).toBeGreaterThan(0);
        })

        test("home - get one partners bad id", async () => {
            const res = await request(app).get("/api/partner?id=0")
            expect(res.statusCode).toBe(403);
        })

        test("home - get one panel bad id", async () => {
            const res = await request(app).get("/api/panel?id=0")
            expect(res.statusCode).toBe(403);
        })

        test("home - get one partners", async () => {
            const res = await request(app).get("/api/partner?id=a0c3bce8-682b-11ed-9022-0242ac120002")
            expect(res.statusCode).toBe(200);
        })

        test("home - get one panel", async () => {
            const res = await request(app).get("/api/panel?id=a0c3bce8-682b-11ed-9022-0242ac120002")
            expect(res.statusCode).toBe(200);
        })


        test("home - post delete partner - not connected", async () => {
            const res = await request(app).post("/api/partner/delete",{id:'0'})
            expect(res.statusCode).toBe(401);
        })

        test("home - post delete panel - not connected", async () => {
            const res = await request(app).post("/api/panel/delete",{id:'0'})
            expect(res.statusCode).toBe(401);
        })

        test("home - post delete panel - unknow id", async () => {
            let token = await createToken(constants.register.username,true)
            const res = await request(app).post("/api/panel/delete").set({Authorization:token}).send({id:'0'})
            expect(res.statusCode).toBe(403);
        })


        test("home - post delete partner - unknow id", async () => {
            let token = await createToken(constants.register.username,true)
            const res = await request(app).post("/api/partner/delete").set({Authorization:token}).send({id:'0'})
            expect(res.statusCode).toBe(403);
        })

        test("home - post delete panel", async () => {
            let token = await createToken(constants.register.username,true)
            const res = await request(app).post("/api/panel/delete").set({Authorization:token}).send({id:'a0c3bce8-682b-11ed-9022-0242ac120002'})
            expect(res.statusCode).toBe(200);
        })


        test("home - post delete partners", async () => {
            let token = await createToken(constants.register.username,true)
            const res = await request(app).post("/api/partner/delete").set({Authorization:token}).send({id:'a0c3bce8-682b-11ed-9022-0242ac120002'})
            expect(res.statusCode).toBe(200);
        })

     

        


        

})
}
