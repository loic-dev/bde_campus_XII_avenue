import { HeaderComponent } from "../components/header/header.component"
import { RowPanelHome } from "../components//rowPanelHome/rowPanelHome.component"
import './home.style.scss';


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
            
            <RowPanelHome  page="homePage"/>
        </section>
        
    )

}