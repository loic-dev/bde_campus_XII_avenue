import { useState } from "react";
import { Link } from "react-router-dom";
import "./header.style.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes, faChevronRight  } from '@fortawesome/free-solid-svg-icons'
import {AiFillInstagram,AiFillCalendar,AiFillPhone,AiFillFacebook} from "react-icons/ai"


export const HeaderComponent = () => {
    const [headerMobile, setHeaderMobile] = useState(false);


   
    return (
        <nav className="header">
            <div className="header-container">
                <div className="container">
                    <div className="logo">
                        logo
                    </div>
                    <div className="mobileMenuIconContainer">
                        <span onClick={() => setHeaderMobile(!headerMobile)}><FontAwesomeIcon className="mobileMenuIcon"  icon={headerMobile ? faTimes : faBars}/></span>
                    </div>
                </div>
                <div className="border-mobile-container"><span className={`border-mobile ${headerMobile ? "open" : "close"}`} ></span></div>
                <div className={`link-container ${headerMobile ? "open" : "close"}`}>
                    <ul>
                        <li>
                            <Link className="link" to="/events">
                                <AiFillCalendar className="linkIcon" fontSize={"1.4rem"}/>
                                <span>événements</span>
                                <FontAwesomeIcon className="chevronLinkIcon"  icon={faChevronRight}/>
                            </Link>
                        </li> 
                        <li>
                            <Link className="link" to="/contact">
                                <AiFillPhone className="linkIcon" fontSize={"1.4rem"}/>
                                <span>contact</span>
                                <FontAwesomeIcon className="chevronLinkIcon"  icon={faChevronRight}/>
                            </Link>
                        </li> 
                        <li className="social">
                            <a target="_blank" href="https://www.instagram.com">
                                <AiFillInstagram fontSize={"1.4rem"}/>
                                <span>Suivez nous sur Instagram</span>
                            </a>
                        </li>
                        <li className="social">
                            <a target="_blank" className="showDesktop" href="https://www.facebook.com">
                                <AiFillFacebook fontSize={"1.4rem"}/>
                                <span>Suivez nous sur facebook</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>       
        </nav>
    )
}