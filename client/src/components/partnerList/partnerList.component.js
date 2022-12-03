import "./partnerList.style.scss";
import {getPartnersAPI, url} from '../../utils/API';
import { useEffect, useState } from "react";


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
        <div class="partnerList">
            <h1>NOS PARTENAIRES</h1>
            <div class="list">
                {listPartner.map(partner=> {
                    return <div key={partner.id_partner}>
                            <span style={{backgroundImage:`url(${url+partner.link_image})`}}></span>
                            <p>{partner.name_partner}</p>
                        </div>  
                })}
            </div>
        </div>   
    )
}