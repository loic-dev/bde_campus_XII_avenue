import request from 'supertest';
import {app} from '../../index.js';
import constants from '../utils/constants.util.json'

export const testHome = () => {

    describe("GET /partners", () => {

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

        


        

})
}
