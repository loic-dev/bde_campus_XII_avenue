import {database} from '../../index.js'
import { createSetUpdateDatabase } from '../utils/functions.utils.js';

export const createEvent = async (id_event, id_image, name_event, desc_event , date_event , signup_event, datenow) => {
    return database.query("INSERT INTO events (id_event, id_image, name_event, desc_event,  date_event, signup_event, created_at, updated_at) values ($1,$2,$3,$4,$5,$6,$7,$8)",[id_event,id_image, name_event, desc_event, date_event, signup_event,datenow,datenow]);
}

export const getAllEvents = async () => {
    return database.query("SELECT event.id_event, event.name_event, event.desc_event, event.date_event, event.signup_event, images.link_image FROM event INNER JOIN images ON event.id_image=images.id_image");
}

export const getEvent = async (id) => {
    return database.query(`SELECT event.id_event, event.name_event, event.desc_event, event.date_event, event.signup_event, images.link_image FROM event INNER JOIN images ON event.id_image=images.id_image WHERE event.id_event = $1`,[id]);
}

export const getNextEvent = async () => {
    return database.query(`SELECT event.id_event, event.name_event, event.desc_event, event.date_event, event.signup_event, images.link_image FROM event INNER JOIN images ON event.id_image=images.id_image ORDER BY event.date_event DESC LIMIT 1`);
    
}

export const modifyOneEvent = async (id_event, modifydata) => {
    let SQL = createSetUpdateDatabase(modifydata);
    console.log(SQL)
    return database.query(`UPDATE events ${SQL} WHERE id_event = $1`,[id_event]);
}


export const deleteEvent = async (id) => {
    return database.query(`DELETE FROM events WHERE id_event = $1`,[id]);
}
