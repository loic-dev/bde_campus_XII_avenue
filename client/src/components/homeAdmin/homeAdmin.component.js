import { useState, useEffect } from "react";
import { createPartnerService, deletePartnerService, getPartnersAPI,url } from "../../utils/API";
import "./homeAdmin.style.scss";
import { BiX,BiCheck,BiTrash } from 'react-icons/bi'
import { Alert } from "../alert/alert.component";

export const HomeAdmin = ({}) => {

  
    const [listPartner, setListPartner] = useState([]);
    const [err, setErr] = useState(null);
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
    const [addPartnerValue, setAddPartnerValue] = useState({
        show:false,
        name:'',
        desc:'',
        icon:'',

    
    });

    const handleChange = evt => {
        const name = evt.target.name;
        const value = evt.target.value;
        setAddPartnerValue({
          ...addPartnerValue,
          [name]: value
        })
      } 

    const fetchData = async () => {
        try {
            const res = await getPartnersAPI();
            setListPartner(res.data.data);
        } catch (error) {
            console.log(error)
        }
    };


    useEffect(() => {
        fetchData();
    }, []);

    const addPartner = () => {
        setAddPartnerValue({
            ...addPartnerValue,
            show:true
        })
    }

    const handleUploadFile = (e) => {
        const file = e.target.files[0];
        setAddPartnerValue({
            ...addPartnerValue,
            icon:file
        })
    }

    let handleSubmitPartner = async (e) => {
        e.preventDefault(); // permet de ne pas recharger la page

        const formData = new FormData();
        formData.append('pictures', addPartnerValue.icon);
        formData.append('name', addPartnerValue.name);
        formData.append('desc', addPartnerValue.desc);


        try {
            let response = await createPartnerService(formData);
            fetchData();
        } catch (error) {
            console.log(error.response.data.error)
            setErr(error.response.data.error);
        }
        setAddPartnerValue({
            show:false,
            name:'',
            desc:'',
            icon:'',
        })
        
        
    }
    
    const deletePartner = async (id) => {
        try {
            let response = await deletePartnerService({id:id});
            fetchData();
        } catch (error) {
            console.log(error.response.data.error)
            setErr(error.response.data.error);
        }
    }


    return (
        <div className="homeAdmin">
            {err && <Alert message={err} status="error"/>}
            <div className="section-partners">
                <span>Liste des partenaires</span>
                {isMobile ?
                <table>
                    <tbody>
                        {listPartner.map(partner => {
                            return (
                                <tr key={partner.id_partner} className="tab-body-mobile">
                                    <td>
                                        <span><strong>Nom : </strong> {partner.name_partner}</span>
                                        <span><strong>Prénom : </strong> {partner.desc_partner}</span>
                                        <span><strong>Icone : </strong><a href={url+partner.link_image} target="_blank">Lien image</a></span>
                                        <span className="tab-delete-option">
                                            
                                            <span className="tab-icon danger"><BiTrash onClick={() => deletePartner(partner.id_partner)}/></span>
                                        </span>
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
                            <th>Description</th>
                            <th>Icone</th>
                            <th></th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {listPartner.map(partner => {
                            return (
                                <tr key={partner.id_partner} className="tab-body">
                                    <td>{partner.name_partner}</td>
                                    <td>{partner.desc_partner}</td>
                                    <td><a href={url+partner.link_image} target="_blank">Lien image</a></td>
                                    <td className="tab-delete-option">
                                        
                                        <span className="tab-icon danger"><BiTrash onClick={() => deletePartner(partner.id_partner)}/></span>
                                    </td>
                                </tr>
                            )
                        })}
                        {addPartnerValue.show &&
                            <tr className="tab-body">
                                <td><input type={"text"} name="name" value={addPartnerValue.name} onChange={handleChange}></input></td>
                                <td><input type={"text"} name="desc" value={addPartnerValue.desc} onChange={handleChange}></input></td>
                                <td><input type={"file"} name="icon" onChange={handleUploadFile}></input></td>
                                <td className="tab-delete-option">
                                    <span className="tab-icon valid"><BiCheck onClick={handleSubmitPartner} /></span>
                                    <span className="tab-icon danger"><BiX onClick={() =>  setAddPartnerValue({...addPartnerValue,
                                        show:false,
                                        name:'',
                                        desc:'',
                                        icon:'',
                                    })}/></span>
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
                }

                
                <div className="container-btn">
                    <span className="btnAddEvent" onClick={addPartner}>Ajouter</span>
                </div>
                
                
                
    
            </div>


        </div>
    )
}