import "./headNextEvent.style.scss";
import img from "../../images/event_page_background2.png"

export const  HeadNextEvent = ({}) => {
    return (
        <div className="eventHeader">
            <img src={img}></img> 
            <div className="infoNextEvent">
                <div className="infoNextEventImg"></div>
                <div className="infoNextEventDesc">
                    <div className="infoNextEventTitle">Voici un titre d'évenement</div>
                    <div className="infoNextEventChild">
                        <div>28 Avril 2022</div>
                        <div className="infoNextEventBtn">
                            <button>Inscription</button>
                            <button>+ D'infos</button>
                        </div>
                    </div>
                </div>    
            </div>
        </div>   
    )
}
