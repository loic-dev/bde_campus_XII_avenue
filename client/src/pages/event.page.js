import { HeaderComponent } from "../components/header/header.component"
import './home.style.scss';
import { ListEvent } from "../components/listEvent/listEvent.component";


export const EventPage = () => {

    return (
        <section className="eventPage">
            <HeaderComponent/>
            <ListEvent/>
        </section>  
    )

}