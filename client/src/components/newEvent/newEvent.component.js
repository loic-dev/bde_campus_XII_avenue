import "./newEvent.style.scss";
import { useEffect, useState } from 'react';
import { Spinner } from '../../components/spinner/spinner.component';
import { Link, useNavigate } from 'react-router-dom';
import { createEventService } from '../../utils/API'

export const NewEvent = () => {

    const [newEvent, setNewEvent] = useState({
        name: "",
        desc: "",
        date: "",
        signup: "",
        pictures: "",
    })

    const [disabled, setDisabled] = useState(true);
    const [err, setErr] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = evt => {
        setErr(null)
        const name = evt.target.name;
        const value = evt.target.value;
        setNewEvent({
          ...newEvent,
          [name]: value
        })
        console.log(newEvent);
      } 


      let handleSubmitNewEvent = async (e) => {
        e.preventDefault(); // permet de ne pas recharger la page
        if(!disabled){
            setLoading(true)
            try {
                let response = await createEventService(newEvent)
                console.log(response)
            } catch (error) {
                console.log(error.response.data.error)
                setErr(error.response.data.error);
            }
            setLoading(false)
            setNewEvent({
                name: "",
                desc: "",
                date: "",
                signup: "",
                pictures: "",
            })
        }
    }
      
    useEffect(() => {
        handleDisabled();
    },[newEvent])

    let handleDisabled = () => {
        setDisabled(!newEvent.name || !newEvent.desc || !newEvent.date);
    }

    return (
        <div className="newEvent">
            <h1 id="ajouterEvenement">Ajouter un évènement</h1>
            <form className="formNewEvent" onSubmit={handleSubmitNewEvent}> 
                <label>Titre</label>
                <input type="text" name="name" value={newEvent.name} onChange={handleChange}></input>
                <div className="flexContainer"> 
                    <div className="flexContainerColumn">
                        <label>Date</label>
                        <input type="date" name="date" value={newEvent.date} onChange={handleChange}></input>
                    </div>
                    <div>
                        <label>Inscription</label>
                        <div> 
                            <div>
                                <input type="radio" name="signup" value={true} onChange={handleChange}></input>
                                <label className="labelRadio">Oui</label>
                            </div>
                            <div>
                                <input type="radio"  name="signup" value={false} onChange={handleChange}></input>
                                <label className="labelRadio">Non</label>
                            </div>
                        </div>
                    </div>
  
                </div>  
                <label>Description</label>
                <textarea name="desc" value={newEvent.desc} onChange={handleChange}></textarea>
                <label>Photo</label>
                <input type="image" alt="ajouter une image" name="pictures"></input>
                <div className="addImgEvent"></div>
                <button type="submit" className={`btnAddEvent2 ${disabled ? 'disabled' : ''}`} value="Submit">Ajouter</button>
            </form>
        </div>
    )
}