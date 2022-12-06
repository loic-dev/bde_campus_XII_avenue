import { url } from "../../../../utils/API";
import "./infoEvent.style.scss";

export const InfoEventTemplate = ({link, desc}) => {

    
    return (
        <div className="info-event">
            <div className="info-container-desc">
                <span className="info-desc-event">{desc}</span>
            </div>
            <div className="info-container-image">
                <span className="info-image-event" style={{backgroundImage:`url(${url+link})`}}></span>
            </div>
            
        </div>
    )

}