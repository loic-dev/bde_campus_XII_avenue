import "./eventAdmin.style.scss";
import dotImg from "../../images/dots.png"

export const EventAdmin = () => {

    function optionAdminEvent(){
        console.log("TestOk");
    }
    return (
        <div className="eventAdmin">
            <div className="headEventAdmin">
                <h1>Evenements</h1>
                <button className="btnAddEvent">Ajouter evenement</button>
            </div>
            <div className="allAdminEvent">
                <div className="oneAdminEvent">
                    <div className="optionActive"></div>
                    <div className="optionEventAdmin">
                        <div className="modifierOptionEventAdmin">{">"} Modifier</div>
                        <div className="inscriptionOptionEventAdmin">{">"} Inscription</div>
                        <div className="supprimerOptionEventAdmin">{">"} Supprimer</div>
                    </div>
                    <div className="headOneAdminEvent">
                        <div>Soirée loft</div>
                        <img className="dotImg" alt="Apres click affiche les options modifier et supprimer" src={dotImg} onClick={optionAdminEvent}/>
                    </div>
                    <div className="imgAdminEvent">
                    </div>
                    <div className="infoAdminEvent">
                        <div>28/05/2023</div>
                        <div>10 inscrits</div>
                    </div>
                    <div>idustry. Lorem Ipsum has been thmm when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, rema</div>
                </div>

                <div className="oneAdminEvent">
                    <div className="headOneAdminEvent">
                        <div>Soirée loft</div>
                        <img className="dotImg" src={dotImg}/>
                    </div>
                    <div className="imgAdminEvent">
                    </div>
                    <div className="infoAdminEvent">
                        <div>28/05/2023</div>
                        <div>10 inscrits</div>
                    </div>
                    <div>idustry. Lorem Ipsum has been thmm when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, rema</div>
                </div>

                <div className="oneAdminEvent">
                    <div className="headOneAdminEvent">
                        <div>Soirée loft</div>
                        <img className="dotImg" src={dotImg}/>
                    </div>
                    <div className="imgAdminEvent">
                    </div>
                    <div className="infoAdminEvent">
                        <div>28/05/2023</div>
                        <div>10 inscrits</div>
                    </div>
                    <div>idustry. Lorem Ipsum has been thmm when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, rema</div>
                </div>


                <div className="oneAdminEvent">
                    <div className="headOneAdminEvent">
                        <div>Soirée loft</div>
                        <img className="dotImg" src={dotImg}/>
                    </div>
                    <div className="imgAdminEvent">
                    </div>
                    <div className="infoAdminEvent">
                        <div>28/05/2023</div>
                        <div>10 inscrits</div>
                    </div>
                    <div>idustry. Lorem Ipsum has been thmm when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, rema</div>
                </div>


                <div className="oneAdminEvent">
                    <div className="headOneAdminEvent">
                        <div>Soirée loft</div>
                        <img className="dotImg" src={dotImg}/>
                    </div>
                    <div className="imgAdminEvent">
                    </div>
                    <div className="infoAdminEvent">
                        <div>28/05/2023</div>
                        <div>10 inscrits</div>
                    </div>
                    <div>idustry. Lorem Ipsum has been thmm when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, rema</div>
                </div>
            </div>
        </div>
    )
}