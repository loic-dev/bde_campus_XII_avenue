import { createEvent, deleteEvent, getAllEvents, getEvent, getNextEvent, modifyOneEvent } from "../../models/events.model.js"
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

export const createEventService = async (req,res) => {

    let { name, desc, date, signup } = req.body;
    let id_image = req.id_image;

    console.log(req.body)

   
    try {
        if(!name || !desc || !id_image || !date || !signup){
            throw new Error("Missing arguments")
        }
        let newDate = new Date(date);
        var timestamp = moment(newDate).format('YYYY-MM-DD HH:mm:ss');
        var datenow = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        if(timestamp < datenow){
            throw new Error("Date must be in the future")
        }
        let id_panel = uuidv4();
        let response = await createEvent(id_panel, id_image, name, desc, timestamp, signup, datenow);
        if(response.rowCount === 0){
            throw new Error('Something went wrong while the database insert event')
        }
        return res.status(200).send({text: "Event successfully created"});
    } catch(e) {
        console.log("error create panel: ", e)
        return res.status(403).send({error: "Something went wrong while insert event : "+e});
    }

}


export const getAllEventsService = async (req,res) => {

    try {
        let AllEvents = await getAllEvents();
        return res.status(200).send({text:"get events successfully", data: AllEvents.rows});
    } catch (error) {
        console.log("Error get events : ", error)
        return res.status(403).send({error:"Something went wrong while get events"});
    }
}

export const getOneEventService = async (req,res) => {
    let id = req.query['id'];
    try {
        let event = await getEvent(id);
        if(event.rowCount === 0){
            throw new Error("bad id");
        }
        return res.status(200).send({text:"get event successfully", data: event.rows[0]});
    } catch (error) {
        console.log("Error get event  : ", error)
        return res.status(403).send({error: "Something went wrong while get event"});
    }
}

export const getNextEventService = async (req,res) => {
    try {
        let event = await getNextEvent();
        if(event.rowCount === 0){
            throw new Error("No event");
        }
        return res.status(200).send({text:"get event successfully", data: event.rows[0]});
    } catch (error) {
        console.log("Error get next event  : ", error)
        if(error instanceof Error){
            return res.status(403).send({error: error});
        } else {
            return res.status(403).send({error: "Something went wrong while get next event"});
        }
        
    }
}

export const modifyOneEventService = async (req,res) => {
    let { id, name, desc, date, signup } = req.body;
    let id_image = req.id_image;

   
    try {
        let event = await getEvent(id);
        if(event.rowCount === 0){
            throw new Error("No event");
        }

    
        var datenow = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        var timestamp = null;
        if(date){
            timestamp = moment(new Date(date)).format('YYYY-MM-DD HH:mm:ss');
            if(timestamp < datenow){
                throw new Error("Date must be in the future")
            }
        }

        


        let ArrayCompare = [{
            "key":"id_image",
            "send":id_image
        },
        {
            "key":"name_event",
            "send":name
        },
        {
            "key":"desc_event",
            "send":desc
        },
        {
            "key":"date_event",
            "send":timestamp
        },
        {
            "key":"signup_event",
            "send":signup
        }];


        let dataModify = {};
        ArrayCompare.forEach((data) => {
            if(data.send && `${event.rows[0][data.key]}` !== data.send){
                dataModify[data.key] = data.send;
            }
        })

        if(Object.keys(dataModify).length === 0){
            throw new Error('Nothing to modify');
        }

        console.log(dataModify)

        dataModify['updated_at'] = datenow;
        let response = await modifyOneEvent(id, dataModify);
        if(response.rowCount === 0){
            throw new Error('Something went wrong while the database modify event')
        }
        return res.status(200).send({error: "Event successfully modify"});
    } catch(e) {
        console.log("error modify event: ", e)
        return res.status(403).send({error: "Something went wrong while modify event : "+e});
    }
}

export const deleteEventService = async (req,res) => {
    let id = req.body['id'];
    try {
        let response = await deleteEvent(id);
        if(response.rowCount === 0){
            throw new Error("bad id");
        }
        return res.status(200).send({text:"event deleted successfully"});
    } catch (error) {
        console.log("Error delete panel : ", error)
        return res.status(403).send({error: "Something went wrong while deleting event"});
    }
}
