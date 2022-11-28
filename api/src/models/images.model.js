import {database} from '../../index.js'


export const insertImage = async (id_image, link_image) => {
    return database.query("INSERT INTO images (id_image, link_image) values ($1,$2)",[id_image,link_image]);
}