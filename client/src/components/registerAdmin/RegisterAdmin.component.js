import { useState ,useEffect} from "react";
import { getRegisterService } from "../../utils/API";




export const RegisterAdmin = ({id_event, name_event}) => {

    const [listRegister, setListRegister] = useState([]);

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
                                <tr className="tab-body">
                                    <td>{register.lastname_register}</td>
                                    <td>{register.firstname_register}</td>
                                    <td>{register.email_register}</td>
                                    <td>{register.comment_register}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

            </div>
        </div>

        )
}