import { deletePanel, getAllPanels, getPanel } from "../../models/panels.model.js"

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
    /*let id = req.body['id'];
    try {
        console.log(id)
        let response = await deletePartner(id);
        if(response.rowCount === 0){
            throw new Error("bad id");
        }
        return res.status(200).send({text:"partner deleted successfully"});
    } catch (error) {
        console.log("Error delete partner : ", error)
        return res.status(403).send({error: "Something went wrong while deleting partner"});
    }*/
}