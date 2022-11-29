import { createPanel, deletePanel, getAllPanels, getPanel } from "../../models/panels.model.js"
import { v4 as uuidv4 } from 'uuid';

export const getAllPanelsService = async (req,res) => {
    try {
        let allPanels = await getAllPanels();
        return res.status(200).send({text:"get panels successfully", data: allPanels.rows});
    } catch (error) {
        console.log("Error get panels : ", error)
        return res.status(403).send({error:"Something went wrong while get panels"});
    }
}


export const getOnePanelService = async (req,res) => {
    let id = req.query['id'];
    try {
        let panel = await getPanel(id);
        if(panel.rowCount === 0){
            throw new Error("bad id");
        }
        return res.status(200).send({text:"get panel successfully", data: panel.rows[0]});
    } catch (error) {
        console.log("Error get panel  : ", error)
        return res.status(403).send({error: "Something went wrong while get panel"});
    }
}


export const deletePanelService = async (req,res) => {
    let id = req.body['id'];
    try {
        let response = await deletePanel(id);
        if(response.rowCount === 0){
            throw new Error("bad id");
        }
        return res.status(200).send({text:"panel deleted successfully"});
    } catch (error) {
        console.log("Error delete panel : ", error)
        return res.status(403).send({error: "Something went wrong while deleting panel"});
    }
}

export const createPanelService = async (req,res) => {

    let { desc,title } = req.body;
    let id_image = req.id_image;
    try {
        if(!title || !desc || !id_image){
            throw new Error("Missing arguments")
        }
    
        let id_panel = uuidv4();
        let response = await createPanel(id_panel,id_image, title, desc );
        if(response.rowCount === 0){
            throw new Error('Something went wrong while the database insert panel')
        }
        return res.status(200).send({error: "Panel successfully created"});
    } catch(e) {
        console.log("error create panel: ", e)
        return res.status(403).send({error: "Something went wrong while insert panel"});
    }

}