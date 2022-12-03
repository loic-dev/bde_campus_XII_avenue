import {database} from '../../index.js'
import { createSetUpdateDatabase } from '../utils/functions.utils.js';



export const getAllPanels = async () => {
    return database.query("SELECT panel.id_panel, panel.title_panel, panel.desc_panel, images.link_image FROM panel INNER JOIN images ON panel.id_image=images.id_image");
}

export const getPanel = async (id) => {
    return database.query(`SELECT panel.id_panel, panel.title_panel, panel.desc_panel, images.link_image FROM panel INNER JOIN images ON panel.id_image=images.id_image WHERE panel.id_panel = $1`,[id]);
}

export const deletePanel = async (id) => {
    return database.query(`DELETE FROM panel WHERE id_panel = $1`,[id]);
}

export const modifyOnePanel = async (id_panel, modifydata) => {
    let SQL = createSetUpdateDatabase(modifydata);
    return database.query(`UPDATE panel ${SQL} WHERE id_panel = $1`,[id_panel]);
}


export const createPanel = async (id_panel,id_image, title_panel, desc_panel) => {
    return database.query("INSERT INTO panel (id_panel, id_image, title_panel, desc_panel) values ($1,$2, $3, $4)",[id_panel,id_image,title_panel, desc_panel]);
}