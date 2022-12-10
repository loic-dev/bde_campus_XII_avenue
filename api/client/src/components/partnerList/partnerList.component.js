import "./partnerList.style.scss";
import {getPartnersAPI, url} from '../../utils/API';
import { useEffect, useState } from "react";
import { Spinner } from "../spinner/spinner.component";


export const  PartnerList = ({}) => {


    const [listPartner, setListPartner] = useState([])

    useEffect(() => {
        let fetchData = async () => {
            try {
                const res = await getPartnersAPI();
                setListPartner(res.data.data);
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, []);


    return (
        <div className="partnerList">
            <h1>NOS PARTENAIRES</h1>
            <div className="list">
                {listPartner.length > 0 ? 
                    listPartner.map(partner=> {
                        return <div key={partner.id_partner} className="partner-container">
                                <span className="partner-image" style={{backgroundImage:`url(${url+partner.link_image})`}}></span>
                                <p className="partner-name">{partner.name_partner}</p>
                            </div>  
                    })
                
                :

                    <Spinner />
            
                }
            </div>
        </div>   
    )
}