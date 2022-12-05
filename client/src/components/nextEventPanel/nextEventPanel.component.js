import "./nextEventPanel.style.scss";
import moment from "moment"
import { Popup } from "../popup/popup.component";
import { useState } from "react";

export const NextEventPanel = ({name, date, linkImage, description, signup}) => {


    const [popupInfo, setPopupInfo] = useState(false);
    const [popupRegister, setPopupRegister] = useState(false);


    const changeStatePopupInfo = () => {
        setPopupInfo(!popupInfo);
        setPopupRegister(false);
    }

    const changeStateRegister = () => {
        setPopupRegister(!popupRegister);
        setPopupInfo(false);
    }



    const dateFormat = new moment(date).format("DD-MM-YYYY HH:mm");
    return (
        <>
            {popupInfo && <Popup title="information" action={changeStateRegister} close={changeStatePopupInfo} name={name} button="Passer à l'inscription" />}
            {popupRegister && <Popup title="inscription" close={changeStateRegister} name={name}  button="S'inscrire" />}
            <section className="next-event-panel">
                
                <div className="next-event-container">
                    <span className="ne-title">Prochain événement</span>
                    <div>
                        <span className="container-image"></span>
                        <div className="container-info">
                            <span className="ne-name">{name}</span>
                            <span className="ne-date">{dateFormat}</span>
                            <div className="container-buttons">
                                <button onClick={changeStatePopupInfo}>information</button>
                                {signup && <button onClick={changeStateRegister}>inscription</button>}
                            </div>
                        </div>
                    </div>
                    
                </div>
            </section>
        </>
    )
}