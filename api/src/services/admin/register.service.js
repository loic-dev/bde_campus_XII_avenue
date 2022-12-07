import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { createRegister, deleteRegister, getAllRegister, getOneRegister, getOneRegisterWithEmail, modifyRegister } from "../../models/registers.model.js";
import { getEvent } from '../../models/events.model.js';
import { emailValidator } from '../../utils/regex.util.js';

export const createRegisterService = async (req,res) => {

    let { id_event, lastname_register, firstname_register , email_register, comment_register } = req.body;

  
    try {
        var datenow = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');


        if(!id_event || !lastname_register || !firstname_register || !email_register){
            throw new Error("Missing arguments")
        }

        if(!emailValidator(email_register)){
            throw new Error("Email bad format");
        }

        let event = await getEvent(id_event)
        if(event.rowCount === 0 ){
            throw new Error("Event don't exist");
        }

        let register = await getOneRegisterWithEmail(email_register);
        if(register.rowCount > 0){
            throw new Error("Register already exist");
        }

        let date_event = moment(new Date(event.rows[0]['date_event'])).format('YYYY-MM-DD HH:mm:ss');
        if(date_event < datenow){
            throw new Error("this event is already finished")
        }

        let id_register = uuidv4();


        let response = await createRegister(id_register,id_event, lastname_register, firstname_register , email_register, comment_register, datenow);
        if(response.rowCount === 0){
            throw new Error('Something went wrong while the database insert register')
        }
        return res.status(200).send({text: "Register successfully created"});
    } catch(e) {
        console.log("error create register: ", e)
        return res.status(403).send({error: "Something went wrong while insert register : "+e});
    }

}


export const getAllRegistersService = async (req,res) => {
    let id_event = req.query['id_event'];
    console.log(req.query)
    try {
        let AllRegister = await getAllRegister(id_event);
        return res.status(200).send({text:"get registers successfully", data: AllRegister.rows});
    } catch (error) {
        console.log("Error get registers : ", error)
        return res.status(403).send({error:"Something went wrong while get registers"});
    }
    
}

export const getOneRegisterService = async (req,res) => {
    let id_register = req.query['id_register'];
    try {
        let register = await getOneRegister(id_register);
        if(register.rowCount === 0){
            throw new Error("bad id");
        }
        return res.status(200).send({text:"get register successfully", data: register.rows[0]});
    } catch (error) {
        console.log("Error get register  : ", error)
        return res.status(403).send({error: "Something went wrong while get register"});
    }
}



export const modifyOneRegisterService = async (req,res) => {
    let { id_register, lastname_register, firstname_register , email_register, comment_register } = req.body;

    try {
        let register = await getOneRegister(id_register);
        if(register.rowCount === 0){
            throw new Error("No register");
        }

    
        var datenow = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        


        let ArrayCompare = [{
            "key":"lastname_register",
            "send":lastname_register
        },
        {
            "key":"firstname_register",
            "send":firstname_register
        },
        {
            "key":"email_register",
            "send":email_register
        },
        {
            "key":"comment_register",
            "send":comment_register
        }];


        let dataModify = {};
        ArrayCompare.forEach((data) => {
            if(data.send && `${register.rows[0][data.key]}` !== data.send){
                dataModify[data.key] = data.send;
            }
        })

        if(Object.keys(dataModify).length === 0){
            throw new Error('Nothing to modify');
        }

        dataModify['updated_at'] = datenow;
        let response = await modifyRegister(id_register, dataModify);
        if(response.rowCount === 0){
            throw new Error('Something went wrong while the database modify register')
        }
        return res.status(200).send({error: "Register successfully modify"});
    } catch(e) {
        console.log("error modify register: ", e)
        return res.status(403).send({error: "Something went wrong while modify register : "+e});
    }
}

export const deleteRegisterService = async (req,res) => {
    let id_register = req.body['id_register'];
    try {
        let response = await deleteRegister(id_register);
        if(response.rowCount === 0){
            throw new Error("bad id");
        }
        return res.status(200).send({text:"register deleted successfully"});
    } catch (error) {
        console.log("Error delete register : ", error)
        return res.status(403).send({error: "Something went wrong while deleting register"});
    }
}
