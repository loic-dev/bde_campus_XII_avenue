import { HeaderComponent } from "../components/header/header.component"
import { RowPanelHome } from "../components//rowPanelHome/rowPanelHome.component"
import './home.style.scss';
import "video-react/dist/video-react.css";
import { Player ,BigPlayButton} from 'video-react';
import { PartnerList } from "../components/partnerList/partnerList.component";
import { getNextEventAPI, getPanelsAPI } from "../utils/API";
import { useState , useEffect} from "react";
import { HeadNextEvent } from "../components/headNextEvent/headNextEvent.component";
import { NextEventPanel } from "../components/nextEventPanel/nextEventPanel.component";
import { Alert } from "../components/alert/alert.component";
import "../components/rowPanelHome/template1.style.scss";
import "../components/rowPanelHome/template2.style.scss";
import { FooterComponent } from "../components/footer/footer.component"

export const HomePage = () => {

    const [listPanels, setListPanels] = useState([])
    const [nextEvent, setNextEvent] = useState(null);
    const [alert, setAlert] = useState({
        message:"",
        status:""
    });


    useEffect(() => {
        if(alert.message !== ""){
            setTimeout(() => {
                setAlert({
                    message:"",
                    status:""
                })
            }, 3500);
        }
    }, [alert])

    const handleAlert = (message, status) => {
        setAlert({
            message:message,
            status:status
        })
    }
    
    useEffect(() => {
        
        let fetchData = async () => {
            try {
                const panel = await getPanelsAPI();
                setListPanels(panel.data.data);
                const nextEvent = await getNextEventAPI();
                setNextEvent(nextEvent.data.data);
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, []);

    return (
        <section className="homepage">
            <Alert message={alert.message} status={alert.status}/>
            <HeaderComponent/>
            <div className="home-wrapper">
                <div className="title-container">
                    <div className="title-section">
                        <div className="title">
                            <span className="uppercase">bienvenue</span>
                            <span>chez <span className="color-orange">Campus XII Avenue</span></span>
                        </div>
                    </div>
                    <div className="section-next-event">
                        {nextEvent && <NextEventPanel name={nextEvent.name_event}
                            handleAlert={handleAlert}
                            id={nextEvent.id_event}
                            date={nextEvent.date_event}
                            description={nextEvent.desc_event}
                            linkImage={nextEvent.link_image}
                            signup={nextEvent.signup_event} />}
                    </div>
                    
                </div>

            </div>
            
            <PartnerList/>
            <div className="video-wrapper">
                <div className="video-container">
                    <Player
                        playsInline
                        poster="../../bg_teaser.png"
                        src="../../teaser.mp4"
                        >

                            <BigPlayButton position="center" />
                        </Player>

                </div>


            </div>  
            
            
            <div className="container-row">
                <div className="row-panel">
                    <div className={`container-panel`}>
                        <div className="panel-image" style={{backgroundImage:`url(../../rocket.svg)`}}></div>
                        <div className="container-column">
                            <span className="panel-title">Qui somme nous ?</span>
                            <div className="panel-description">Le BDE (Bureau des Élèves) Campus XII Avenue est une association représentative des différentes formations de la CCI (Chambre de Commerce et d'Industrie) de Rodez.<br></br><br></br>Elle a pour objectif principal de rassembler les étudiants de la CCI, de créer une synergie entre les différents BDE de la CCI, ainsi que de Rodez, et d'organiser des événements stimulants pour les étudiants. L'association est ouverte à tous les étudiants de la CCI et vise à créer une communauté dynamique, inclusive et stimulante pour les étudiants de la ville.<br></br><br></br>Au cours de l'année, l'association organisera divers événements tels que des soirées au loft, des AfterWork, des tournois Fifa, des galas, et bien d'autres encore, offrant ainsi une variété de divertissement pour tous les étudiants.</div>
                        </div>
                    </div>
                </div>


            </div>
            <div className="row-panel template2">
            <div className="container-panel ">
                <span className="panel-title">Le campus 12e avenue</span>
                <div className="container-row">
                    <div className="panel-description">
                        Le campus 12e avenue, de la CCI Aveyron, est un établissement qui regroupe une multitude d’activités, d’enseignements et de formations. Des formations dites initiales pour les étudiants et des formations professionnelles continues pour les professionnels.
                        <br></br><br></br>
                        Pour plus de chiffres, le Campus XIIE Avenue c’est : 80% des formations en apprentissage, 1000 étudiants formés tous les ans, une communauté implantée de plusieurs milliers d’étudiants entrepreneurs, formateurs et partenaires. Plus de 110 formations professionnelles interentreprises.
                        <br></br><br></br>
                        Le tout sur trois sites de formation: Rodez, Millau et Saint-Affrique.</div>
                    <div className="panel-image" style={{backgroundImage:`url(../../campus.png)`}}></div>
                </div>
            </div> 
        </div>

        <div className="container-row">
                <div className="row-panel">
                    <div className={`container-panel reverse`}>
                        <div className="panel-image" style={{backgroundImage:`url(../../astronaut.svg)`}}></div>
                        <div className="container-column">
                            <span className="panel-title">Nos objectifs de mission</span>
                            <div className="panel-description">L’objectif de l’association est de promouvoir les activités étudiantes (culturelles, sportives,
                            médiatiques) au sein des différentes écoles et formations du campus. Et de faire valoir le CAMPUS XIIe AVENUE dans son ensemble auprès des acteurs locaux (entreprises, collectivités, associations) et du grand public.
                            <br></br><br></br>
                            Avec des étudiants aux profils très variés, des établissements différents, de nombreuses filières,
                            des rythmes d’études différents; gérer une communication efficace et proposer des évènements n’est pas une tâche facile avec des bureaux étudiants isolés, d’où la création de cette association.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterComponent/>
        </section>
        
    )

}