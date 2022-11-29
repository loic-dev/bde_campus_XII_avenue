import {database} from '../../index.js'



export const getAllPartners = async () => {
    return database.query("SELECT * FROM partner");
}

export const getPartner = async (id) => {
    return database.query(`SELECT * FROM partner WHERE id_partner = $1`,[id]);
}

export const createPartner = async (id_partner,id_image, name_partner, desc_partner) => {
    return database.query("INSERT INTO partner (id_partner, id_image, name_partner, desc_partner) values ($1,$2, $3, $4)",[id_partner,id_image,name_partner, desc_partner]);
}


export const deletePartner = async (id) => {
    return database.query(`DELETE FROM partner WHERE id_partner = $1`,[id]);
}