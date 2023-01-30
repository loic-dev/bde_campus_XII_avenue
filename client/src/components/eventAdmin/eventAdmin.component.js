import "./eventAdmin.style.scss";
import moment from "moment"
import { useEffect, useState } from "react";
import { deleteEventService, getAllEvents } from "../../utils/API";
import { url } from "../../utils/API";
import {FaTimes,FaTrashAlt} from "react-icons/fa"
import {BsThreeDotsVertical,BsArrowLeftShort} from "react-icons/bs"
import {BiChevronRight} from "react-icons/bi"
import { NewEvent } from "../newEvent/newEvent.component.js"
import { RegisterAdmin } from "../registerAdmin/RegisterAdmin.component";

export const EventAdmin = () => {

    const [listEvent, setListEvent] = useState([]);
    const [selectEvent, setSelectEvent] = useState({
        id:'',
        name:''
    })
    const [sectionActive, setSectionActive] = useState(0);

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

    function handleContextMenuEvent(e,id,name){

        e.stopPropagation();

        const closeContextMenu = (e) => {
            e.stopPropagation()
            setSelectEvent('','')
        }

        setSelectEvent({
            id:id,
            name:name
        })

        document.addEventListener("click", closeContextMenu)
    }


    const backToMain = () => {
        setSelectEvent('','')
        setSectionActive(0)
        fetchData();
    }

    const choiceSection = () => {
        switch (sectionActive) {
            case 0:
                return mainSection();
            case 1: 
                return <NewEvent backToMain={backToMain}/>
            case 2:
                return <RegisterAdmin id_event={selectEvent.id} name_event={selectEvent.name} ></RegisterAdmin>
            default:
                break;
        }
    }


    const mainSection = () => {
        return (
            <>
                <div className="headEventAdmin">
                    <h1>Evenements</h1>
                    <span className="btnAddEvent" onClick={() =>  setSectionActive(1)}>Ajouter evenement</span>
                </div>
                <div className="allAdminEvent"> 
                        {listEvent.map((event) => {
                        let dateFormat = new moment(event.date_event).format("DD-MM-YYYY HH:mm");
                        return (
                            <div className={`oneAdminEvent ${selectEvent.id === event.id_event ? 'hidden' : ''}`} key={event.id_event}>
                                {selectEvent.id === event.id_event && <div className="optionEventAdmin">
                                    <div  onClick={() => deleteEvent(event.id_event)} className="supprimerOptionEventAdmin">
                                        <FaTrashAlt/>
                                        <span>Supprimer</span>
                                        
                                    </div>
                                    <div  onClick={() => setSectionActive(2)} >
                                        <BiChevronRight/>
                                        <span>Inscriptions</span>
                                    </div>
                                </div>}
                                <div className="oneAdminEvent-card">
                                    <div className="headOneAdminEvent">
                                        <div>{event.name_event}</div>
                                        {selectEvent.id === event.id_event ? 
                                        <FaTimes onClick={(e) => handleContextMenuEvent(e,null,null)}/>
                                        :
                                        <BsThreeDotsVertical onClick={(e) => handleContextMenuEvent(e,event.id_event, event.name_event)}/>}
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
                    </div>
                </> 
        )
    }







 


    return (
        <div className="eventAdmin">
            {sectionActive > 0 && <div className="backToMainSection" onClick={() =>  setSectionActive(0)}>
                    <BsArrowLeftShort/>
                    <span>retour</span>
            </div>}
            {choiceSection()}
            
    
    
        </div>
    )
}