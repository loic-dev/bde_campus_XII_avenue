import "./newEvent.style.scss";
import { useEffect, useState,useRef } from 'react';
import { Spinner } from '../../components/spinner/spinner.component';
import { Link, useNavigate } from 'react-router-dom';
import { createEventService } from '../../utils/API'
import {AiOutlinePlusCircle} from 'react-icons/ai'

export const NewEvent = ({backToMain}) => {

    const [newEvent, setNewEvent] = useState({
        name: "",
        desc: "",
        date: "",
        signup: "",
    })

    const fileInput = useRef(null);

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);



    


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

        const formData = new FormData();
        formData.append('pictures', image);
        formData.append('name', newEvent.name);
        formData.append('signup', newEvent.signup);
        formData.append('desc', newEvent.desc);
        formData.append('date', newEvent.date);
          
        if(!disabled){
            setLoading(true)
            try {
                let response = await createEventService(formData)
                
            } catch (error) {
                console.log(error.response.data.error)
                setErr(error.response.data.error);
            }
            setLoading(false)
            setImage(null)
            setPreview(null)
            setNewEvent({
                name: "",
                desc: "",
                date: "",
                signup: "",
                pictures: "",
            })
            backToMain()
        }
    }
      
    useEffect(() => {
        handleDisabled();
    },[newEvent])

    let handleDisabled = () => {
        setDisabled(!newEvent.name || !newEvent.desc || !newEvent.date);
    }

    let handleUploadFile = (e) => {
        const file = e.target.files[0];
        setImage(file);

        const reader = new FileReader();
        reader.onloadend = () => {
        setPreview(reader.result);
        };
        reader.readAsDataURL(file);
    }

    let handleInput = () => {
        fileInput.current.click();
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
                    {!preview && <>
                    <input
                        type="file"
                        ref={fileInput}
                        style={{ display: 'none' }}
                        onChange={handleUploadFile}
                    />
                    <span onClick={handleInput} className="addImgEventPanel"><AiOutlinePlusCircle/></span>
                    </>}
                {preview && <div className="addImgEvent" style={{backgroundImage: `url(${preview})`}}>
                </div>}
                <button type="submit" className={`btnAddEvent2 ${disabled ? 'disabled' : ''}`} value="Submit">Ajouter</button>
            </form>
        </div>
    )
}