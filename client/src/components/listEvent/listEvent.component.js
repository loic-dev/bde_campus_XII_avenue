import "./listEvent.style.scss";
import img from "../../images/event_page_background.png"

export const  ListEvent = ({}) => {
    return (
        <div class="listEvent">
            <div class="eventHeader">
                <img src={img}></img> 
                <div class="infoNextEvent">
                    <div class="infoNextEventImg"></div>
                    <div class="infoNextEventDesc">
                        <div class="infoNextEventTitle">Voici un titre d'évenement</div>
                        <div class="infoNextEventChild">
                            <div>28 Avril 2022</div>
                            <div class="infoNextEventBtn">
                                <button>Inscription</button>
                                <button>+ D'infos</button>
                            </div>
                        </div>
                    </div>    
                </div>
            </div>
            <h2>Les prochains évènements</h2>
            <div class="allEvent">
                <div class="event">
                    <a href="#">
                        <div class="eventInscription">
                            <span>Inscription</span>
                        </div>
                    </a>
                    <div class="eventInformation">
                        <p class="eventDate">06 Mai 2022</p>
                        <p class="eventTitle">Titre</p>
                    </div>
                </div>
                <div class="event">
                    <a>
                        <div class="eventInscription">
                            <span>Inscription</span>
                        </div>
                    </a>
                    <div class="eventInformation">
                        <p class="eventDate">06 Mai 2022</p>
                        <p class="eventTitle">Titre</p>
                    </div>
                </div>
                <div class="event">
                    <a>
                        <div class="eventInscription">
                            <span>Inscription</span>
                        </div>
                    </a>
                    <div class="eventInformation">
                        <p class="eventDate">06 Mai 2022</p>
                        <p class="eventTitle">Titre</p>
                    </div>
                </div>
                <div class="event">
                    <a>
                        <div class="eventInscription">
                            <span>Inscription</span>
                        </div>
                    </a>
                    <div class="eventInformation">
                        <p class="eventDate">06 Mai 2022</p>
                        <p class="eventTitle">Titre</p>
                    </div>
                </div>
                <div class="event">
                    <a>
                        <div class="eventInscription">
                            <span>Inscription</span>
                        </div>
                    </a>
                    <div class="eventInformation">
                        <p class="eventDate">06 Mai 2022</p>
                        <p class="eventTitle">Titre</p>
                    </div>
                </div>
                <div class="event">
                    <a>
                        <div class="eventInscription">
                            <span>Inscription</span>
                        </div>
                    </a>
                    <div class="eventInformation">
                        <p class="eventDate">06 Mai 2022</p>
                        <p class="eventTitle">Titre</p>
                    </div>
                </div>
                <div class="event">
                    <a>
                        <div class="eventInscription">
                            <span>Inscription</span>
                        </div>
                    </a>
                    <div class="eventInformation">
                        <p class="eventDate">06 Mai 2022</p>
                        <p class="eventTitle">Titre</p>
                    </div>
                </div>
                <div class="event">
                    <a>
                        <div class="eventInscription">
                            <span>Inscription</span>
                        </div>
                    </a>
                    <div class="eventInformation">
                        <p class="eventDate">06 Mai 2022</p>
                        <p class="eventTitle">Titre</p>
                    </div>
                </div>
            </div>
        </div>   
    )
}
