import { useEffect, useState } from "react"
import {FaTimes} from "react-icons/fa"
import "./popup.style.scss"


export const Popup = ({title, name,  button, children, close, action }) => {

    const [active, setActive] = useState(false)

    let closePopup = () => {
        setActive(false);
        setTimeout(() => {
            close();
        }, 300);
    }

    useEffect(() => {
      document.querySelector("body").classList.add("not-overflow");
      setActive(true);

      return () => {
        document.querySelector("body").classList.remove("not-overflow");
      }
    }, [])
    
    return (
        <div className="overlay">
            <section className="popup">
                <div className={`container-popup ${active ? 'active' : ''}`}>
                    <div className="header-popup">
                        <span className="c-title">{title} : <span className="c-name"> {name}</span></span>
                        <span className="c-close" onClick={closePopup}><FaTimes className="closeIcon" fontSize={"1.2rem"}/></span>
                    </div>
                    <div className="body-popup">{children}</div>
                    <div className="footer-popup">
                        {button && <button onClick={action}>{button}</button>}
                    </div>
                </div>
            </section>
        </div>
        
    )
}