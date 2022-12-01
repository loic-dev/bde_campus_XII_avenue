import { createEvent } from "../../models/events.model.js"
import { v4 as uuidv4 } from 'uuid';


export const createEventService = async (req,res) => {

    let { name, desc, date, signup } = req.body;
    let id_image = req.id_image;

   
    try {
        if(!name || !desc || !id_image || !date || !signup){
            throw new Error("Missing arguments")
        }
    
        let id_panel = uuidv4();
        let response = await createEvent(id_panel, id_image, name, desc, date, signup);
        if(response.rowCount === 0){
            throw new Error('Something went wrong while the database insert event')
        }
        return res.status(200).send({error: "Event successfully created"});
    } catch(e) {
        console.log("error create panel: ", e)
        return res.status(403).send({error: "Something went wrong while insert event"});
    }

}