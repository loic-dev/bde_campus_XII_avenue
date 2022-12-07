import { useEffect, useState } from 'react';
import './alert.style.scss';

export const Alert = ({message, status})  => {;

    let [show, setShow] = useState(false)


    useEffect(() => {
        if(message !== ""){
            setTimeout(() => {
                setShow(true)
            }, 300);
            
        } else {
            setShow(false)
        }
    }, [message])

    return (
        <div className={`container-alert ${show ? 'active' : 'not-active'}`}>
            <div className={`alert ${status}`}>
                <span>{message}</span>
            </div>
            
        </div>
    )

}