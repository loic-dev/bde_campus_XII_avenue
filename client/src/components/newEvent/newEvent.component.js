import "./newEvent.style.scss";

export const NewEvent = () => {
    return (
        <div className="newEvent">
            <h1>Ajouter un évènement</h1>
            <form className="formNewEvent"> 
                <label>Titre</label>
                <input type="text"></input>
                <div className="flexContainer"> 
                    <div className="flexContainerColumn">
                        <label>Date</label>
                        <input type="date"></input>
                    </div>
                    <div>
                        <label>Inscription</label>
                        <div> 
                            <div>
                                <input type="radio" name="checkInscription"></input>
                                <label className="labelRadio">Oui</label>
                            </div>
                            <div>
                                <input type="radio"  name="checkInscription"></input>
                                <label className="labelRadio">Non</label>
                            </div>
                        </div>
                    </div>
  
                </div>  
                <label>Description</label>
                <textarea></textarea>
                <label>Photo</label>
                <div className="addImgEvent"></div>
            </form>
        </div>
    )
}