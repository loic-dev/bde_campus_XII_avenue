import "./navAdmin.style.scss";
import img from "../../images/fleche_bas.png"

export const  NavAdmin = ({}) => {
    return (
        <div className="navAdmin">
            <ul className="navAdminMax">
                <li><a className="accueil" href="#home">Accueil</a></li>
                <li><a href="#allEvent">Evenements</a></li>
                <li><a href="#ajouterEvenement">Ajouter Evenements</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="#about">Mon compte</a></li>
            </ul>

            
            <ul className="navAdminMin">
                <li className="adminDropdown dropdown">
                    <a href="#home" className="dropbtn"><span>Accueil</span>  <img src={img}></img> </a>
                    <div className="dropdown-content">
                        <a href="#allEvent">Evenements</a>
                        <a href="#ajouterEvenement">Ajouter Evenements</a>
                        <a href="#contact">Contact</a>
                        <a href="#about">Mon compte</a>
                    </div>
                </li>
            </ul>

        </div>   
    )
}