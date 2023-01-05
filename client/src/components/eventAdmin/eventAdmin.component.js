import "./eventAdmin.style.scss";
import moment from "moment"
import { useEffect, useState } from "react";
import { deleteEventService, getAllEvents } from "../../utils/API";
import { url } from "../../utils/API";
import {FaTimes,FaTrashAlt} from "react-icons/fa"
import {BsThreeDotsVertical,BsArrowLeftShort} from "react-icons/bs"
import { NewEvent } from "../newEvent/newEvent.component.js"

export const EventAdmin = () => {

    const [listEvent, setListEvent] = useState([]);
    const [selectEvent, setSelectEvent] = useState(null)
    const [addEventSection, setAddEventSection] = useState(false)

    async function deleteEvent(id){
        let data = {id:id};
        await deleteEventService(data);
        fetchData();
    }

    let fetchData = async () => {
        try {
            const events = await getAllEvents();
            setListEvent(events.data.data);
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => { 
        fetchData();
    }, [])

    function handleContextMenuEvent(id){
        setSelectEvent(id)
    }

    const handleSetAddEventSection = () => {
        setAddEventSection(!addEventSection)
    }

    const backToMain = () => {
        handleSetAddEventSection();
        fetchData();
    }
   
    return (
        <div className="eventAdmin">
            {addEventSection ?

            <>
                <div className="backToMainSection" onClick={handleSetAddEventSection}>
                    <BsArrowLeftShort/>
                    <span>retour</span>
                </div>
                <NewEvent backToMain={backToMain}/>
            
            </>
           
           
    
    
            :
    
            <>
            <div className="headEventAdmin">
                <h1>Evenements</h1>
                <span className="btnAddEvent" onClick={handleSetAddEventSection}>Ajouter evenement</span>
            </div>
            <div className="allAdminEvent"> 
                    {listEvent.map((event) => {
                    let dateFormat = new moment(event.date_event).format("DD-MM-YYYY HH:mm");
                    return (
                        <div className={`oneAdminEvent ${selectEvent === event.id_event ? 'hidden' : ''}`} key={event.id_event}>
                            {selectEvent === event.id_event && <div className="optionEventAdmin">
                                <div  onClick={() => deleteEvent(event.id_event)} className="supprimerOptionEventAdmin">
                                    <FaTrashAlt/>
                                    <span>Supprimer</span>
                                    
                                </div>
                            </div>}
                            <div className="oneAdminEvent-card">
                                <div className="headOneAdminEvent">
                                    <div>{event.name_event}</div>
                                    {selectEvent === event.id_event ? 
                                    <FaTimes onClick={() => handleContextMenuEvent(null)}/>
                                    :
                                    <BsThreeDotsVertical onClick={() => handleContextMenuEvent(event.id_event)}/>}
                                </div>
                                <div className="imgAdminEvent" style={{backgroundImage:`url(${url+event.link_image})`}}>
                                </div>
                                <div className="infoAdminEvent">
                                    <div>{dateFormat}</div>
                                    <div className="nb_inscrit"></div>
                                </div>
                                <div>{event.desc_event}</div>
                            </div>
                            
                        </div>
                        )
                    })}
                </div></>}
        </div>
    )
}