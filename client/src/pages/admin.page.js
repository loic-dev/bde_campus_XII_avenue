import { HeaderComponent } from "../components/header/header.component"
import { NavAdmin } from "../components/navAdmin/navAdmin.component"
import { EventAdmin } from "../components/eventAdmin/eventAdmin.component"
import { NewEvent } from "../components/newEvent/newEvent.component"
import './admin.style.scss';
import {  useState , useEffect} from "react";
import { HomeAdmin } from "../components/homeAdmin/homeAdmin.component";

export const AdminPage = () => {


    const menu = ['accueil','événements']
    const [menuSelect, setMenuSelect] = useState(0)
    const [width, setWidth] = useState(window.innerWidth);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    const isTablet = width <= 768;

    const componentChoice = () => {
        switch (menuSelect) {
            case 0:
                return <HomeAdmin/>
            case 1:
                return <EventAdmin/>
            default:
                break;
        }
    }

    const handleChangeMenu = (index) => {
        setMenuSelect(index);
    }


    return (
        <section className="adminPage">
            <HeaderComponent/>
            <div className="container-adminpage">
                <div className="admin-wrapper">
                    <h1>Espace Administrateur</h1>
                    <div className="adminStructure">
                        {isTablet ?
                            <div className="list-menu">   
                                <select value={menuSelect} onChange={(e) => handleChangeMenu(parseInt(e.target.value))}>
                                    {menu.map((item,index) => {
                                        return <option value={index}>{item}</option>
                                    })}
                                </select>
                            </div>                    
                        :
                        <div className="list-menu">
                            {menu.map((item,index) => {
                                return <span key={index} onClick={() => handleChangeMenu(index)} className={`item-menu ${index === menuSelect ? 'select' : ''}`}>{item}</span>
                            })}
                        </div>}
                        {/*<NavAdmin/>*/}
                        <div className="adminContent">
                            {componentChoice()}
                           {/*<NewEvent/>*/}
                        </div>
                    </div> 
                </div>
            </div>
              
        </section>  
    )
  
} 
