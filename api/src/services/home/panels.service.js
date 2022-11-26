import { deletePanel, getAllPanels, getPanel } from "../../models/panels.model.js"
import { validate as uuidValidate } from 'uuid';

export const getAllPanelsService = async (req,res) => {
    try {
        let allPanels = await getAllPanels();
        return res.status(200).send({text:"get panels successfully", data: allPanels.rows});
    } catch (error) {
        console.log("Error get panels : ", error)
        return res.status(401).send({error:"Something went wrong while get panels"});
    }
}


export const getOnePanelService = async (req,res) => {
    let id = req.query['id'];
    try {
        if(uuidValidate(id)){
            throw new Error('id is not uuid');
        }
        let panel = await getPanel(id);
        return res.status(200).send({text:"get panel successfully", data: panel.rows[0]});
    } catch (error) {
        console.log("Error get panel  : ", error)
        return res.status(401).send({error: "Something went wrong while get panel"});
    }
}


export const deletePanelService = async (req,res) => {
    let id = req.body['id'];

    try {
        if(uuidValidate(id)){
            throw new Error('id is not uuid');
        }
        await deletePanel(id);
        return res.status(200).send({text:"panel deleted successfully"});
    } catch (error) {
        console.log("Error delete panel : ", error)
        return res.status(401).send({error: "Something went wrong while deleting panel"});
    }
}