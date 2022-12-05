import { url } from "../../utils/API";
import "./template1.style.scss";

export const  RowPanelHome = ({title, linkImage, description, reverse, template}) => {
    
   
    return (
        template === 1 ?
        <div className="row-panel">
            <div className={`container-panel ${reverse ? 'reverse' : '' }`}>
                <div className="panel-image" style={{backgroundImage:`url(${url+linkImage})`}}></div>
                <div className="container-column">
                    <span className="panel-title">{title}</span>
                    <div className="panel-description">{description}</div>
                </div>
            </div>
        </div>
        
        :

        <div className="row-panel">
            <div className="container-panel">
                <span className="panel-title">{title}</span>
                <div className="container-row">
                    <div className="panel-description">{description}</div>
                    <div className="panel-image" style={{backgroundImage:`url(${url+linkImage})`}}></div>
                </div>
            </div> 
        </div>
    )
}