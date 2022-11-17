import { HeaderComponent } from "../components/header/header.component"
import './event.style.scss';
import { HeadNextEvent } from "../components/headNextEvent/headNextEvent.component";
import { ListEvent } from "../components/listEvent/listEvent.component";


export const EventPage = () => {

    return (
        <section className="eventPage">
            <HeaderComponent/>
            <HeadNextEvent/>
            <ListEvent/>
        </section>  
    )
  
} 