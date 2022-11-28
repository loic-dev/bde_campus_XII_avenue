import { deletePartner, getAllPartners, getPartner } from "../../models/partners.model.js"
import { validate as uuidValidate } from 'uuid';

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
        return res.status(200).send({text:"get partner successfully", data: partner.rows[0]});
    } catch (error) {
        console.log("Error get partner : ", error)
        return res.status(403).send({error: "Something went wrong while get partner"});
    }
}


export const deletePartnerService = async (req,res) => {
    let id = req.body['id'];
    try {
        await deletePartner(id);
        return res.status(200).send({text:"partner deleted successfully"});
    } catch (error) {
        console.log("Error delete partner : ", error)
        return res.status(403).send({error: "Something went wrong while deleting partner"});
    }
}