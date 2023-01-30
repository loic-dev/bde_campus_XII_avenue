import { useState } from "react";
import { Link } from "react-router-dom";
import "./footer.style.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes, faChevronRight  } from '@fortawesome/free-solid-svg-icons'
import {AiFillInstagram,AiFillCalendar,AiFillHome,AiFillPhone,AiFillFacebook} from "react-icons/ai"




export const FooterComponent = () => {
    
    return (
        <footer>
            &copy; Copyright 2023 <a className="linkLinkedin" href="https://fr.linkedin.com/in/lo%C3%AFc-charri%C3%A9-a63909184">Loïc Charrié</a> et <a className="linkLinkedin" href="https://www.linkedin.com/in/thomas-joly-46120/">Thomas JOLY</a> - <a className="footerLink" href="./administration">Administration</a>
        </footer>
    )
}