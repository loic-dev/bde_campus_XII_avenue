import "./nextEventPanel.style.scss";
import moment from "moment"
import { Popup } from "../popup/popup.component";
import { useContext, useEffect, useState } from "react";
import { RegisterEventTemplate } from "../popup/template/registerEvent/registerEvent.template";
import { InfoEventTemplate } from "../popup/template/infoEvent/infoEvent.template";
import { createRegister } from "../../utils/API";

export const NextEventPanel = ({id,name,handleAlert, date, linkImage, description, signup}) => {

    const initialState = {
        lastname:"",
        firstname:"",
        email:"",
        comment:"",
        loading:false,
        err:""
    }

    const [popupInfo, setPopupInfo] = useState(false);
    const [popupRegister, setPopupRegister] = useState(false);
    const [register, setRegister] = useState(initialState);
    

    const handleChangeRegister = evt => {
        const name = evt.target.name;
        const value = evt.target.value;
        setRegister({
          ...register,
          [name]: value
        })
    }



    const handleErrorRegister = (value) => {
        setRegister({
            ...register,
            err: value
        })
    }

    
    
    const handleSubmitRegister = async () => {
        
        try {
            let body = {
                id_event:id,
                lastname_register:register.lastname,
                firstname_register:register.firstname,
                comment_register:register.comment,
                email_register:register.email,
            }
            await createRegister(body);
            changeStateRegister();
            handleAlert("Votre inscription a bien été enregistré","success");
            
            
        } catch (error) {
            handleErrorRegister(error.response.data.error);
        }
       
        setRegister(initialState)
    }


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
            {popupInfo && <Popup title="information" action={changeStateRegister} close={changeStatePopupInfo} name={name} button="Passer à l'inscription">

                <InfoEventTemplate link={linkImage}  desc={description} />

            </Popup>}
            
            
            
            {popupRegister && <Popup title="inscription" action={handleSubmitRegister} close={changeStateRegister} name={name}  button="S'inscrire">
                <RegisterEventTemplate register={register} setRegister={handleChangeRegister} />
            </Popup>}
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