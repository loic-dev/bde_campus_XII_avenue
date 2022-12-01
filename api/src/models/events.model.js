import {database} from '../../index.js'


export const createEvent = async (id_event, id_image, name_event, desc_event , date_event , signup_event) => {
    return database.query("INSERT INTO events (id_event, id_image, name_event, desc_event,  date_event, signup_event) values ($1,$2,$3,$4,$5,$6)",[id_event,id_image, name_event, desc_event, date_event, signup_event]);
}

