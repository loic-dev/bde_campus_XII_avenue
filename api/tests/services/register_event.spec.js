import request from 'supertest';
import {app} from '../../index.js';
import constants from '../utils/constants.util.json'
import { createToken } from '../utils/functions.util.js';
import { database } from '../../index.js';
import { getNextEvent } from '../../src/models/events.model.js';

export const testRegisterEvent = () => {

    describe("Register", () => {

        let idRegister = null;
        let registerData = constants.register_event;

        it("Register - create Register - bad event", async () => {
            database.query("truncate register CASCADE")
            const res = await request(app).post("/api/event/register/create").send(registerData)
            expect(res.statusCode).toBe(403);
        })

        it("Register - create Register", async () => {
            let event = await getNextEvent();
            registerData['id_event'] = event.rows[0]['id_event'];
            const res = await request(app).post("/api/event/register/create").send(registerData)
            expect(res.statusCode).toBe(200);
        })

        it("Register - create Register - same email", async () => {
            const res = await request(app).post("/api/event/register/create").send(registerData)
            expect(res.statusCode).toBe(403);
        })


        it("Register - get all register", async () => {
            let token = await createToken(constants.register.email,false)
            const res = await request(app).get(`/api/event/registers?id_event=${registerData['id_event']}`).set('Authorization','bearer '+token)
            expect(res.statusCode).toBe(200);
            expect(res.body.data.length).toBeGreaterThan(0);
            idRegister = res.body.data[0].id_register;
        })

        it("Register - get one register bad id", async () => {
            let token = await createToken(constants.register.email,false)
            const res = await request(app).get("/api/event/register?id_register=00000000-0000-0000-0000-000000000000").set('Authorization','bearer '+token)
            expect(res.statusCode).toBe(403);
        })

        it("Register - get one register", async () => {
            let token = await createToken(constants.register.email,false)
            const res = await request(app).get(`/api/event/register?id_register=${idRegister}`).set('Authorization','bearer '+token)
            expect(res.statusCode).toBe(200);
        })

        it("Register - get modify register", async () => {
            let token = await createToken(constants.register.email,false)
            registerData['lastname_register'] = "testmodify";
            registerData['id_register'] = idRegister;
            const res = await request(app).post("/api/event/register/modify").set('Authorization','bearer '+token).send(registerData)
            expect(res.statusCode).toBe(200);
        })


        it("Register - post delete register - unknow id", async () => {
            let token = await createToken(constants.register.email,false)
            const res = await request(app).post("/api/event/register/delete").set({Authorization:'bearer '+token}).send({"id_register":'00000000-0000-0000-0000-000000000000'})
            expect(res.statusCode).toBe(403);
        })
        
        it("Register - post delete register", async () => {
            let token = await createToken(constants.register.email,false)
            const res = await request(app).post("/api/event/register/delete").set({Authorization:'bearer '+token}).send({"id_register":idRegister})
            expect(res.statusCode).toBe(200);
        })

})
}
