import { HeaderComponent } from "../components/header/header.component"
import './admin.style.scss';

export const AdminPage = () => {

    return (
        <section className="adminPage">
            <HeaderComponent/>
            <h1>Espace Administrateur</h1>
            <div className="adminStructure">
                <div>AdminNav</div>
                <div>AdminContent</div>
            </div>
        </section>  
    )
  
} 