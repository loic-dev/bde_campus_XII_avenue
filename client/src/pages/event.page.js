import { HeaderComponent } from "../components/header/header.component"
import './event.style.scss';
import { HeadNextEvent } from "../components/headNextEvent/headNextEvent.component";
import { ListEvent } from "../components/listEvent/listEvent.component";
import { InformationEvent } from "../components/informationEvent/informationEvent.component";


export const EventPage = () => {

    return (
        <section className="eventPage">
            <HeaderComponent/>
            <HeadNextEvent/>
            <ListEvent/>
            <InformationEvent/>
        </section>  
    )
  
} 