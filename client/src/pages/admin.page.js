import { HeaderComponent } from "../components/header/header.component"
import { NavAdmin } from "../components/navAdmin/navAdmin.component"
import { EventAdmin } from "../components/eventAdmin/eventAdmin.component"
import { NewEvent } from "../components/newEvent/newEvent.component"
import './admin.style.scss';

export const AdminPage = () => {

    return (
        <section className="adminPage">
            <HeaderComponent/>
            <h1>Espace Administrateur</h1>
            <div className="adminStructure">
                <div><NavAdmin/></div>
                <div className="adminContent">
                    <EventAdmin/>
                    <NewEvent/>
                </div>
            </div>   
        </section>  
    )
  
} 
