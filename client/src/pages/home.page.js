import { HeaderComponent } from "../components/header/header.component"
import { RowPanelHome } from "../components//rowPanelHome/rowPanelHome.component"
import './home.style.scss';
import { PartnerList } from "../components/partnerList/partnerList.component";
import { getNextEventAPI, getPanelsAPI } from "../utils/API";
import { useState , useEffect} from "react";
import { HeadNextEvent } from "../components/headNextEvent/headNextEvent.component";
import { NextEventPanel } from "../components/nextEventPanel/nextEventPanel.component";


export const HomePage = () => {

    const [listPanels, setListPanels] = useState([])
    const [nextEvent, setNextEvent] = useState(null);



    
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
            <HeaderComponent/>
            <div className="title-container">
                <div className="title-section">
                    <div className="title">
                        <span className="uppercase">bienvenue</span>
                        <span>chez <span className="color-orange">Campus XII Avenue</span></span>
                    </div>
                    
                       
                   
                    
                </div>
                {nextEvent && <NextEventPanel name={nextEvent.name_event}
                        date={nextEvent.date_event}
                        description={nextEvent.desc_event}
                        linkImage={nextEvent.link_image}
                        signup={nextEvent.signup_event} />}
            </div>
            <PartnerList/>
            <div className="container-row">
                {listPanels.length > 0 &&
                        listPanels.map((panel,index) => {
                            let template = index + 1;
                            return  <RowPanelHome template={template} key={panel.id_panel} title={panel.title_panel} description={panel.desc_panel} linkImage={panel.link_image}/>
                        })
                
                }


            </div>
        </section>
        
    )

}