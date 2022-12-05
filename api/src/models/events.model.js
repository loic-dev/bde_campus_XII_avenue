import {database} from '../../index.js'
import { createSetUpdateDatabase } from '../utils/functions.utils.js';

export const createEvent = async (id_event, id_image, name_event, desc_event , date_event , signup_event, datenow) => {
    return database.query("INSERT INTO events (id_event, id_image, name_event, desc_event,  date_event, signup_event, created_at, updated_at) values ($1,$2,$3,$4,$5,$6,$7,$8)",[id_event,id_image, name_event, desc_event, date_event, signup_event,datenow,datenow]);
}

export const getAllEvents = async () => {
    return database.query("SELECT events.id_event, events.name_event, events.desc_event, events.date_event, events.signup_event, images.link_image FROM events INNER JOIN images ON events.id_image=images.id_image");
}

export const getEvent = async (id) => {
    return database.query(`SELECT events.id_event, events.name_event, events.desc_event, events.date_event, events.signup_event, images.link_image FROM events INNER JOIN images ON events.id_image=images.id_image WHERE events.id_event = $1`,[id]);
}

export const getNextEvent = async () => {
    return database.query(`SELECT events.id_event, events.name_event, events.desc_event, events.date_event, events.signup_event, images.link_image FROM events INNER JOIN images ON events.id_image=images.id_image ORDER BY events.date_event DESC LIMIT 1`);
    
}

export const modifyOneEvent = async (id_event, modifydata) => {
    let SQL = createSetUpdateDatabase(modifydata);
    console.log(SQL)
    return database.query(`UPDATE events ${SQL} WHERE id_event = $1`,[id_event]);
}


export const deleteEvent = async (id) => {
    return database.query(`DELETE FROM events WHERE id_event = $1`,[id]);
}
