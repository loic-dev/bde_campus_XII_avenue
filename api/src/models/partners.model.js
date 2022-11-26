import {database} from '../../index.js'



export const getAllPartners = async () => {
    return database.query("SELECT * FROM partner");
}

export const getPartner = async (id) => {
    return database.query(`SELECT * FROM partner WHERE id_partner = $1`,[id]);
}

export const deletePartner = async (id) => {
    return database.query(`DELETE FROM partner WHERE id_partner = $1`,[id]);
}