import {database} from '../../index.js'
import { createSetUpdateDatabase } from '../utils/functions.utils.js';



export const getAllPartners = async () => {
    return database.query("SELECT partner.id_partner, partner.name_partner, partner.desc_partner, images.link_image FROM partner INNER JOIN images ON partner.id_image=images.id_image");
}

export const getPartner = async (id) => {
    return database.query(`SELECT partner.id_partner, partner.name_partner, partner.desc_partner, images.link_image FROM partner INNER JOIN images ON partner.id_image=images.id_image WHERE partner.id_partner = $1`,[id]);
}

export const createPartner = async (id_partner,id_image, name_partner, desc_partner) => {
    return database.query("INSERT INTO partner (id_partner, id_image, name_partner, desc_partner) values ($1,$2, $3, $4)",[id_partner,id_image,name_partner, desc_partner]);
}

export const modifyOnePartner = async (id_partner, modifydata) => {
    let SQL = createSetUpdateDatabase(modifydata);
    return database.query(`UPDATE partner ${SQL} WHERE id_partner = $1`,[id_partner]);
}

export const deletePartner = async (id) => {
    return database.query(`DELETE FROM partner WHERE id_partner = $1`,[id]);
}