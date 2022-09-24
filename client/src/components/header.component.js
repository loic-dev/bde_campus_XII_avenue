import { Link } from "react-router-dom";

export const HeaderComponent = () => {
    return (
        <nav>
            <div className="logo">
                <img></img>
            </div>
            <div className="link">
                <ul>
                    <li>
                        <Link to="/events">evenements</Link>
                    </li> 
                    <li>
                        <Link to="/contact">contact</Link>
                    </li> 
                    <li className="social">
                        <a href="https://www.facebook.com">facebook</a>
                        <a href="https://www.instagram.com">instagram</a>
                    </li>
                </ul>
                
            </div>
            
        </nav>
    )
}