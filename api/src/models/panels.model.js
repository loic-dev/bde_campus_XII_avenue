import {database} from '../../index.js'



export const getAllPanels = async () => {
    return database.query("SELECT * FROM panel");
}

export const getPanel = async (id) => {
    return database.query(`SELECT * FROM panel WHERE id_panel = $1`,[id]);
}

export const deletePanel = async (id) => {
    return database.query(`DELETE FROM panel WHERE id_panel = $1`,[id]);
}

export const createPanel = async (id_panel,id_image, title_panel, desc_panel) => {
    return database.query("INSERT INTO panel (id_panel, id_image, title_panel, desc_panel) values ($1,$2, $3, $4)",[id_panel,id_image,title_panel, desc_panel]);
}