import "./informationEvent.style.scss";


const informationEvent = event => {
    console.log('div clicked');
    document.getElementById("informationEvent").style.display = "none"
};

export const  InformationEvent = ({}) => {
    return (
        <div className="informationEvent" id="informationEvent">
            <div className="informationEventTitle">
                <div>Information :</div>  
                <div className="informationEventTitleEvent">Event Title</div>
                <a onClick={informationEvent}>X</a>
            </div>
            <div className="informationEventContent">
                <div className="informationEventImage">IMAGE</div>
                <div className="informationEventDescription"> TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXTTEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXTTEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXTTEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXTTEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXTTEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXTTEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT</div>
            </div>
            <div className="informationEventFooter">
                <button>Je participe</button>
                <button>Retour</button>
            </div>
        </div>
    )
}
