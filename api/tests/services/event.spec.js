import request from 'supertest';
import {app} from '../../index.js';
import constants from '../utils/constants.util.json'
import { createToken } from '../utils/functions.util.js';
var path = require('path');
import { database } from '../../index.js';

export const testEvent = () => {

    describe("Event", () => {

        let idEvent = null;


        it("Event - create event", async () => {
            database.query("truncate events CASCADE")
            let token = await createToken(constants.register.email,false)
            let filename = path.resolve(__dirname, '../upload/good.jpg');

            const res = await request(app)
                .post("/api/event/create")
                .set('Authorization','bearer '+token)
                .set('Content-Type','multipart/form-data')
                .attach('pictures', filename)
                .field('name', 'orpi')
                .field('desc', 'description')
                .field('date', `${new Date("2023-02-26")}`)
                .field('signup', 'true');
            expect(res.statusCode).toBe(200);
        })

        it("Event - create other event", async () => {
            let token = await createToken(constants.register.email,false)
            let filename = path.resolve(__dirname, '../upload/good.jpg');

            const res = await request(app)
                .post("/api/event/create")
                .set('Authorization','bearer '+token)
                .set('Content-Type','multipart/form-data')
                .attach('pictures', filename)
                .field('name', 'orpi')
                .field('desc', 'description')
                .field('date', `${new Date("2023-02-27")}`)
                .field('signup', 'true');
        })


        it("Event - create event with bad date", async () => {
            let token = await createToken(constants.register.email,false)
            let filename = path.resolve(__dirname, '../upload/good.jpg');

            const res = await request(app)
                .post("/api/event/create")
                .set('Authorization','bearer '+token)
                .set('Content-Type','multipart/form-data')
                .attach('pictures', filename)
                .field('name', 'orpi')
                .field('desc', 'description')
                .field('date', `${new Date("2021-02-26")}`)
                .field('signup', 'true');
            expect(res.statusCode).toBe(403);
        })

        it("Event - get all events", async () => {
            const res = await request(app).get("/api/events")
            expect(res.statusCode).toBe(200);
            expect(res.body.data.length).toBeGreaterThan(0);
            idEvent = res.body.data[0].id_event;
        })

        it("Event - get one event bad id", async () => {
            const res = await request(app).get("/api/event?id=00000000-0000-0000-0000-000000000000")
            expect(res.statusCode).toBe(403);
        })

        it("Event - get one event", async () => {
            const res = await request(app).get(`/api/event?id=${idEvent}`)
            expect(res.statusCode).toBe(200);
        })

        it("Event - get next event", async () => {
            const res = await request(app).get(`/api/event/next`)
            expect(res.statusCode).toBe(200);
        })

        it("Event - get modify event", async () => {
            let token = await createToken(constants.register.email,false)
            let filename = path.resolve(__dirname, '../upload/good.jpg');

            const res = await request(app)
                .post("/api/event/modify")
                .set('Authorization','bearer '+token)
                .set('Content-Type','multipart/form-data')
                .attach('pictures', filename)
                .field('name', 'orpi')
                .field('desc', 'description')
                .field('date', `${new Date("2024-02-26")}`)
                .field('signup', true)
                .field('id', idEvent);
            expect(res.statusCode).toBe(200);
        })


        it("Event - post delete event - unknow id", async () => {
            let token = await createToken(constants.register.email,false)
            const res = await request(app).post("/api/event/delete").set({Authorization:'bearer '+token}).send({id:'00000000-0000-0000-0000-000000000000'})
            expect(res.statusCode).toBe(403);
        })
        
        it("Event - post delete panel", async () => {
            let token = await createToken(constants.register.email,false)
            const res = await request(app).post("/api/event/delete").set({Authorization:'bearer '+token}).send({id:idEvent})
            expect(res.statusCode).toBe(200);
        })

})
}
