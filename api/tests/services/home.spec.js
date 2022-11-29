import request from 'supertest';
import {app} from '../../index.js';
import constants from '../utils/constants.util.json'
import { createToken } from '../utils/functions.util.js';
var path = require('path');
import { database } from '../../index.js';

export const testHome = () => {

    describe("home", () => {

        

        let idPanel = null;
        let idPartner = null;

        it("empty images table", async () => {
            await database.query("truncate panel");
            await database.query("truncate partner");
        })

        it("home - post partner", async () => {
            let token = await createToken(constants.register.email,false)
            
            let filename = path.resolve(__dirname, '../upload/good.jpg');
            const res = await request(app)
                .post("/api/partner/create")
                .set('Authorization','bearer '+token)
                .set('Content-Type','multipart/form-data')
                .attach('pictures', filename)
                .field('name', 'orpi')
                .field('desc', 'description');
            expect(res.statusCode).toBe(200);
        })


        it("home - post panel", async () => {
            let token = await createToken(constants.register.email,false)
            
            let filename = path.resolve(__dirname, '../upload/good.jpg');
            const res = await request(app)
                .post("/api/panel/create")
                .set('Authorization','bearer '+token)
                .set('Content-Type','multipart/form-data')
                .attach('pictures', filename)
                .field('title', 'rodez')
                .field('desc', 'ville paisible');
            expect(res.statusCode).toBe(200);
        })

        it("home - get all partners", async () => {
            const res = await request(app).get("/api/partners")
            expect(res.statusCode).toBe(200);
            expect(res.body.data.length).toBeGreaterThan(0);
            idPartner = res.body.data[0].id_partner;
        })

        it("home - get all panels", async () => {
            const res = await request(app).get("/api/panels")
            expect(res.statusCode).toBe(200);
            expect(res.body.data.length).toBeGreaterThan(0);
            idPanel = res.body.data[0].id_panel
        })

        it("home - get one partners bad id", async () => {
            const res = await request(app).get("/api/partner?id=00000000-0000-0000-0000-000000000000")
            expect(res.statusCode).toBe(403);
        })

        it("home - get one panel bad id", async () => {
            const res = await request(app).get("/api/panel?id=00000000-0000-0000-0000-000000000000")
            expect(res.statusCode).toBe(403);
        })

        it("home - get one partners", async () => {
            const res = await request(app).get("/api/partner?id="+idPartner)
            expect(res.statusCode).toBe(200);
        })

        it("home - get one panel", async () => {
            const res = await request(app).get("/api/panel?id="+idPanel)
            expect(res.statusCode).toBe(200);
        })


        it("home - post delete partner - not connected", async () => {
            const res = await request(app).post("/api/partner/delete",{id:'00000000-0000-0000-0000-000000000000'})
            expect(res.statusCode).toBe(401);
        })

        it("home - post delete panel - not connected", async () => {
            const res = await request(app).post("/api/panel/delete",{id:'00000000-0000-0000-0000-000000000000'})
            expect(res.statusCode).toBe(401);
        })

        it("home - post delete panel - unknow id", async () => {
            let token = await createToken(constants.register.email,false)
            const res = await request(app).post("/api/panel/delete").set({Authorization:'bearer '+token}).send({id:'00000000-0000-0000-0000-000000000000'})
            expect(res.statusCode).toBe(403);
        })


        it("home - post delete partner - unknow id", async () => {
            let token = await createToken(constants.register.email,false)
            const res = await request(app).post("/api/partner/delete").set({Authorization:'bearer '+token}).send({id:'00000000-0000-0000-0000-000000000000'})
            expect(res.statusCode).toBe(403);
        })
        
        it("home - post delete panel", async () => {
            let token = await createToken(constants.register.email,false)
            const res = await request(app).post("/api/panel/delete").set({Authorization:'bearer '+token}).send({id:idPanel})
            expect(res.statusCode).toBe(200);
        })


        it("home - post delete partners", async () => {
            let token = await createToken(constants.register.email,false)
            const res = await request(app).post("/api/partner/delete").set({Authorization:'bearer '+token}).send({id:idPartner})
            expect(res.statusCode).toBe(200);
        })

    
})
}
