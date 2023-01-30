import { useState ,useEffect} from "react";
import { getRegisterService } from "../../utils/API";




export const RegisterAdmin = ({id_event, name_event}) => {

    const [listRegister, setListRegister] = useState([]);
    const [isMobile, setIsMobile] = useState(false)
 
    //choose the screen size 
    const handleResize = () => {
    if (window.innerWidth < 720) {
        setIsMobile(true)
    } else {
        setIsMobile(false)
    }
    }

    // create an event listener
    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize)
    })

    const fetchData = async () => {
        try {
            const res = await getRegisterService(id_event);
            setListRegister(res.data.data);
        } catch (error) {
            console.log(error)
        }
    };


    useEffect(() => {
        fetchData();
    }, []);




    return (
        <div>
            <h1>événements - Inscription "{name_event}"</h1>
            <span>Nombre d'inscris : {listRegister.length}</span>
            <div className="tab">
                {isMobile ? <table>
                    <tbody>
                        {listRegister.map(register => {
                            return (
                                <tr key={register.id_register} className="tab-body-mobile">
                                    <td>
                                        <span><strong>Nom : </strong> {register.lastname_register}</span>
                                        <span><strong>Prénom : </strong> {register.firstname_register}</span>
                                        <span><strong>E-mail : </strong> {register.email_register}</span>
                                        <span><strong>Commentaire : </strong> {register.comment_register}</span>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                :
            <table>
                    <thead>
                        <tr className="tab-head">
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>E-mail</th>
                            <th>Commentaire</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listRegister.map(register => {
                            return (
                                <tr key={register.id_register} className="tab-body">
                                    <td>{register.lastname_register}</td>
                                    <td>{register.firstname_register}</td>
                                    <td>{register.email_register}</td>
                                    <td>{register.comment_register}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>}

            </div>
        </div>

        )
}