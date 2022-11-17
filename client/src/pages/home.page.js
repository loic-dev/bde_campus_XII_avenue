import { HeaderComponent } from "../components/header/header.component"
import { RowPanelHome } from "../components//rowPanelHome/rowPanelHome.component"
import './home.style.scss';
import { PartnerList } from "../components/partnerList/partnerList.component";
import { BdeDescription } from "../components/bdeDescription/bdeDescription.component";


export const HomePage = () => {

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
            <RowPanelHome  page="homePage"/>
            <BdeDescription/> 
        </section>
        
    )

}