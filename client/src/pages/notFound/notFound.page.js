import { Link } from "react-router-dom"
import "./notfound.style.scss";

export const NotFoundPage = () => {

    return (
        <section className="notfound-container">
            <div id="container-image">
                <img className="notfound-image" src="/notfound.svg"></img>
            </div>
            <div className="container-text">
                <p>Oups, cette page est introuvable !</p>
                <Link to="/">
                    <button>Retour à l'acceuil</button>           
                </Link>
            </div> 
            
            
        </section>
        
    )

}