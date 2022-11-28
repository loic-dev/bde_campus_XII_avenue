import request from 'supertest';
import {app} from '../../index.js';
import constants from '../utils/constants.util.json'
import { createToken } from '../utils/functions.util.js';
var path = require('path');


export const testHome = () => {

    describe("home", () => {

        

       /* test("home - get all partners", async () => {
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
            const res = await request(app).get("/api/partner?id=00000000-0000-0000-0000-000000000000")
            expect(res.statusCode).toBe(403);
        })

        test("home - get one panel bad id", async () => {
            const res = await request(app).get("/api/panel?id=00000000-0000-0000-0000-000000000000")
            expect(res.statusCode).toBe(403);
        })

        test("home - get one partners", async () => {
            const res = await request(app).get("/api/partner?id=a0c3bce8-682b-11ed-9022-0242ac120002")
            expect(res.statusCode).toBe(200);
        })

        test("home - get one panel", async () => {
            const res = await request(app).get("/api/panel?id=1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed")
            expect(res.statusCode).toBe(200);
        })


        test("home - post delete partner - not connected", async () => {
            const res = await request(app).post("/api/partner/delete",{id:'00000000-0000-0000-0000-000000000000'})
            expect(res.statusCode).toBe(401);
        })

        test("home - post delete panel - not connected", async () => {
            const res = await request(app).post("/api/panel/delete",{id:'00000000-0000-0000-0000-000000000000'})
            expect(res.statusCode).toBe(401);
        })

        test("home - post delete panel - unknow id", async () => {
            let token = await createToken(constants.register.email,false)
            const res = await request(app).post("/api/panel/delete").set({Authorization:'bearer '+token}).send({id:'00000000-0000-0000-0000-000000000000'})
            expect(res.statusCode).toBe(403);
        })


        test("home - post delete partner - unknow id", async () => {
            let token = await createToken(constants.register.email,false)
            const res = await request(app).post("/api/partner/delete").set({Authorization:'bearer '+token}).send({id:'00000000-0000-0000-0000-000000000000'})
            expect(res.statusCode).toBe(403);
        })
        
        test("home - post delete panel", async () => {
            let token = await createToken(constants.register.email,false)
            const res = await request(app).post("/api/panel/delete").set({Authorization:'bearer '+token}).send({id:'1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'})
            expect(res.statusCode).toBe(200);
        })


        test("home - post delete partners", async () => {
            let token = await createToken(constants.register.email,false)
            const res = await request(app).post("/api/partner/delete").set({Authorization:'bearer '+token}).send({id:'a0c3bce8-682b-11ed-9022-0242ac120002'})
            expect(res.statusCode).toBe(200);
        })*/


        test("home - post partner", async () => {
            let token = await createToken(constants.register.email,false)
            
            let filename = path.resolve(__dirname, '../upload/good.jpg');
            const res = await request(app)
                .post("/api/partner/create")
                .set('Authorization','bearer '+token)
                .set('Content-Type','multipart/form-data')
                .attach('pictures', filename);
            expect(res.statusCode).toBe(200);
        })

        

        


        

})
}
