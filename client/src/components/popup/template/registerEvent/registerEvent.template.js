import './registerEvent.style.scss';

export const RegisterEventTemplate = ({register, setRegister}) => {



    return (
        <div className="register-container-event">
            {register.err && <div className='error-container'>{register.err}</div>}
            <div className="names-container">
                <div className="input-container">
                    <label>Prénom</label>
                    <input type="text" className="input" name="firstname" value={register.firstname} onChange={setRegister} />
                </div>
                <div className="input-container">
                    <label>Nom</label>
                    <input type="text" className="input" name="lastname" value={register.lastname} onChange={setRegister} />
                </div>
            </div>
            <div className="input-container">
                <label>E-mail</label>
                <input type="text" className="input" name="email" value={register.email} onChange={setRegister} />
            </div>
            <div className="input-container">
                <label>Commentaire</label>
                <textarea name="comment" className="input" value={register.comment} onChange={setRegister} />
            </div>
            
        </div>
    )

}