import { HeaderComponent } from "../components/header/header.component"
import { RowPanelHome } from "../components//rowPanelHome/rowPanelHome.component"
import './home.style.scss';
import { PartnerList } from "../components/partnerList/partnerList.component";
import { getPanelsAPI } from "../utils/API";
import { useState , useEffect} from "react";


export const HomePage = () => {

    const [listPanels, setListPanels] = useState([])

    useEffect(() => {
        let fetchData = async () => {
            try {
                const res = await getPanelsAPI();
                setListPanels(res.data.data);
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
            </div>
            <PartnerList/>
            <div className="container-row">
                {listPanels.length > 0 &&
                        listPanels.map((panel,index) => {
                            let reverse = index % 3 === 0;
                            let template = index % 2 === 0 ? 2 : 1;
                            return  <RowPanelHome template={template} reverse={reverse} key={panel.id_panel} title={panel.title_panel} description={panel.desc_panel} linkImage={panel.link_image}/>
                        })
                
                }


            </div>
        </section>
        
    )

}