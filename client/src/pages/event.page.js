import { HeaderComponent } from "../components/header/header.component"
import './event.style.scss';
import { ListEvent } from "../components/listEvent/listEvent.component";
import { useEffect, useState } from "react";
import { getAllEvents } from "../utils/API";
import { Spinner } from "../components/spinner/spinner.component";
import { NextEventPanel } from "../components/nextEventPanel/nextEventPanel.component";

export const EventPage = () => {

    const [listEvent, setListEvent] = useState([])

    const [alert, setAlert] = useState({
        message:"",
        status:""
    });

    const handleAlert = (message, status) => {
        setAlert({
            message:message,
            status:status
        })
    }


    useEffect(() => {
        if(alert.message !== ""){
            setTimeout(() => {
                setAlert({
                    message:"",
                    status:""
                })
            }, 3500);
        }
    }, [alert])



    useEffect(() => {
        let fetchData = async () => {
            try {
                const events = await getAllEvents();
                setListEvent(events.data.data);
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();

    }, [])




    return (
        <section className="eventPage">
            <HeaderComponent/>
            <div className="wrapper">
                <div className="container-background">
                    <span className="page-title">événements</span>
                    <div className="eventpage-next-event">
                        {listEvent.length !== 0 && <NextEventPanel name={listEvent[0].name_event}
                                    handleAlert={handleAlert}
                                    id={listEvent[0].id_event}
                                    date={listEvent[0].date_event}
                                    description={listEvent[0].desc_event}
                                    linkImage={listEvent[0].link_image}
                                    signup={listEvent[0].signup_event} />}

                    </div>
                
                </div>
                {listEvent.length === 0 ? <Spinner/> : <ListEvent listEvent={listEvent}/>}
            </div>
            
           
        </section>  
    )
  
} 