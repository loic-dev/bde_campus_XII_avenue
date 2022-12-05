import {FaTimes} from "react-icons/fa"
import "./popup.style.scss"


export const Popup = ({title, name,  button, children, close, action }) => {
    return (
        <div className="overlay">
            <section className="popup">
                <div className="container-popup">
                    <div className="header-popup">
                        <span className="c-title">{title} : <span className="c-name"> {name}</span></span>
                        <span className="c-close" onClick={close}><FaTimes className="closeIcon" fontSize={"1.2rem"}/></span>
                    </div>
                    <div className="body-popup">{children}</div>
                    <div className="footer-popup">
                        <button onClick={action}>{button}</button>
                    </div>
                </div>
            </section>
        </div>
        
    )
}