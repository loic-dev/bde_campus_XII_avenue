import { createPartner, deletePartner, getAllPartners, getPartner, modifyOnePartner } from "../../models/partners.model.js"
import { v4 as uuidv4 } from 'uuid';


export const getAllPartnersService = async (req,res) => {
    try {
        let allPartners = await getAllPartners();
        return res.status(200).send({text:"get partners successfully", data: allPartners.rows});
    } catch (error) {
        console.log("Error get partners : ", error)
        return res.status(403).send({error:"Something went wrong while get partners"});
    }
}

export const getOnePartnerService = async (req,res) => {
    let id = req.query['id'];
    try {
        let partner = await getPartner(id);
        if(partner.rowCount === 0){
            throw new Error("bad id");
        }
        return res.status(200).send({text:"get partner successfully", data: partner.rows[0]});
    } catch (error) {
        console.log("Error get partner : ", error)
        return res.status(403).send({error: "Something went wrong while get partner"});
    }
}


export const deletePartnerService = async (req,res) => {
    let id = req.body['id'];
    try {
        let response = await deletePartner(id);
        if(response.rowCount === 0){
            throw new Error("bad id");
        }
        return res.status(200).send({text:"partner deleted successfully"});
    } catch (error) {
        console.log("Error delete partner : ", error)
        return res.status(403).send({error: "Something went wrong while deleting partner"});
    }
}


export const createPartnerService = async (req,res) => {

    let { desc,name } = req.body;
    let id_image = req.id_image;
    try {
        if(!name || !desc || !id_image){
            throw new Error("Missing arguments")
        }
    
        let id_partners = uuidv4();
        let response = await createPartner(id_partners,id_image, name, desc );
        if(response.rowCount === 0){
            throw new Error('Something went wrong while the database insert partner')
        }
        return res.status(200).send({error: "Partner successfully created"});
    } catch(e) {
        console.log("error create partner: ", e)
        return res.status(403).send({error: "Something went wrong while insert partner"});
    }


    
    
}


export const modifyPartnerService = async (req,res) => {

    let { id, desc,name } = req.body;
    let id_image = req.id_image;
    try {

        let partner = await getPartner(id);
        if(partner.rowCount === 0){
            throw new Error("No event");
        }


        let ArrayCompare = [{
            "key":"id_image",
            "send":id_image
        },
        {
            "key":"desc_partner",
            "send":desc
        },
        {
            "key":"name_partner",
            "send":name
        }];


        let dataModify = {};
        ArrayCompare.forEach((data) => {
            if(data.send && `${partner.rows[0][data.key]}` !== data.send){
                dataModify[data.key] = data.send;
            }
        })

        if(Object.keys(dataModify).length === 0){
            throw new Error('Nothing to modify');
        }

  
        let response = await modifyOnePartner(id, dataModify);
        if(response.rowCount === 0){
            throw new Error('Something went wrong while the database modify partner')
        }
        return res.status(200).send({error: "Partner successfully modify"});
    } catch(e) {
        console.log("error modify partner: ", e)
        return res.status(403).send({error: "Something went wrong while modify partner"});
    }

}