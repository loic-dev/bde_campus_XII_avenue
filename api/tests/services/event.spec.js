import request from 'supertest';
import {app} from '../../index.js';
import constants from '../utils/constants.util.json'
import { createToken } from '../utils/functions.util.js';
var path = require('path');
import { database } from '../../index.js';

export const testEvent = () => {

    describe("Event", () => {

        let idEvent = null;


        it("home - post partner", async () => {
            let token = await createToken(constants.register.email,false)
            let filename = path.resolve(__dirname, '../upload/good.jpg');

            const res = await request(app)
                .post("/api/event/create")
                .set('Authorization','bearer '+token)
                .set('Content-Type','multipart/form-data')
                .attach('pictures', filename)
                .field('name', 'orpi')
                .field('desc', 'description')
                .field('date', `${Date.now()}`)
                .field('signup', 'true');
            expect(res.statusCode).toBe(200);
        })

      

    
})
}
