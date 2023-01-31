import "./headNextEvent.style.scss";

export const  HeadNextEvent = () => {
    return (
        <div className="eventHeader">
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
