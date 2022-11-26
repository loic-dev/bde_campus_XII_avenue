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