import { useState } from "react";
import { url } from "../../utils/API";
import { Popup } from "../popup/popup.component";
import { InfoEventTemplate } from "../popup/template/infoEvent/infoEvent.template";
import "./listEvent.style.scss";

export const  ListEvent = ({listEvent}) => {

    const [eventSelect, setEventSelect] = useState(null);

    const handleSelect = (id_event) => {
        let index = listEvent.findIndex(event => event.id_event === id_event);
        setEventSelect(listEvent[index]);
    }

    const closePopup = () => {
        setEventSelect(null);
    }


    return (
        <div className="listEvent">
            {eventSelect && <Popup title="information" close={closePopup} name={eventSelect.name_event}>
                <InfoEventTemplate link={eventSelect.link_image}  desc={eventSelect.desc_event} />
            </Popup>}
            <h2>Les prochains évènements</h2>
            <div className="allEvent">
                {listEvent.map((event) => {
                    return (
                        <div key={event.id_event} onClick={() => handleSelect(event.id_event)}  className="event">
                            <span className="event-image" style={{backgroundImage:`url(${url+event.link_image})`}}>
                                <div className="eventAction">
                                    <span>Information</span>
                                </div>
                            </span>
                            <div className="eventInformation">
                                <p className="eventDate">06 Mai 2022</p>
                                <p className="eventTitle">{event.name_event}</p>
                            </div>
                    </div>)
                })}
            </div>
        </div>   
    )
}
