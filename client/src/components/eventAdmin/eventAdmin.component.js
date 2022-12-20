import "./eventAdmin.style.scss";
import dotImg from "../../images/dots.png"
import { useEffect, useState } from "react";
import { deleteEventService, getAllEvents } from "../../utils/API";
import { url } from "../../utils/API";

export const EventAdmin = () => {

    const [listEvent, setListEvent] = useState([]);

    const [opacity, setOpacity] = useState("0");
    const [display, setDisplay] = useState("none");
    const [affiche, setAffiche] = useState(false);

    async function deleteEvent(id){
        console.log(id)
        let data = {id:id};
        await deleteEventService(data);
        fetchData();
    }

    let fetchData = async () => {
        try {
            const events = await getAllEvents();
            setListEvent(events.data.data);
            console.log(events.data.data);
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => { 
        fetchData();
    }, [])

    function voirAffiche(){
        if(!affiche){
            setDisplay("block");
            setOpacity("0,6");
            setAffiche(true);
            console.log("On affiche + " + affiche);
        }else{
            setAffiche(false);
            setDisplay("none");
            setOpacity("1");
            console.log("nn" + affiche + "  " + display);
        }
    }

    return (
        <div className="eventAdmin">
            <div className="headEventAdmin">
                <h1>Evenements</h1>
                <a href="#ajouterEvenement" className="btnAddEvent" >Ajouter evenement</a>
            </div>
            <div className="allAdminEvent"> 
                    {listEvent.map((event) => {
                    return (
                        <div className="oneAdminEvent" key={event.id_event}>
                            <div onClick={voirAffiche} className="optionActive" style={{display:display}}>
                                <img onClick={voirAffiche} className="dotImg2" alt="Apres click affiche les options modifier et supprimer" src={dotImg} />
                            </div>
                            <div className="optionEventAdmin" style={{display:display}}>
                                <div className="modifierOptionEventAdmin">{">"} Modifier</div>
                                <div className="inscriptionOptionEventAdmin">{">"} Inscription</div>
                                <div  onClick={() => deleteEvent(event.id_event)} className="supprimerOptionEventAdmin">{">"} Supprimer</div>
                            </div>
                            <div className="headOneAdminEvent">
                                <div>{event.name_event}</div>
                                <img onClick={voirAffiche} className="dotImg" alt="Apres click affiche les options modifier et supprimer" src={dotImg} />
                            </div>
                            <div className="imgAdminEvent" style={{backgroundImage:`url(${url+event.link_image})`}}>
                            </div>
                            <div className="infoAdminEvent">
                                <div>{event.date_event}</div>
                                <div className="nb_inscrit"></div>
                            </div>
                            <div>{event.desc_event}</div>
                        </div>
                        )
                    })}
                </div>
        </div>
    )
}