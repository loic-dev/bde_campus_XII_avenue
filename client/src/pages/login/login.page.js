
import { useEffect, useState } from 'react';
import { loginAPI } from '../../utils/API';
import { Link, useNavigate } from 'react-router-dom';
import './login.style.scss'
import { Spinner } from '../../components/spinner/spinner.component';

export const LoginPage = () => {

    const navigate = useNavigate();

    const [login, setLogin] = useState({
        login: "",
        password: "",
    })

    const [disabled, setDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(null);

    const handleChange = evt => {
        setErr(null)
        const name = evt.target.name;
        const value = evt.target.value;
        setLogin({
          ...login,
          [name]: value
        })
      }

      
    let handleSubmit = async (e) => {
        e.preventDefault();
        if(!disabled){
            setLoading(true)
            try {
                let response = await loginAPI(login)
                console.log(response)
                sessionStorage.setItem('token',response.data.token)
                navigate("/administration")
            } catch (error) {
                console.log(error.response.data.error)
                setErr(error.response.data.error);
            }
            setLoading(false)
            setLogin({
                login: "",
                password: "",
            })
        }
    }

   
    useEffect(() => {
        handleDisabled();
    },[login])

    let handleDisabled = () => {
        setDisabled(!login.login || !login.password);
    }



    return (
            <section className="authPage">
                <div className='wrapper-auth'>
                    <form onSubmit={handleSubmit}>
                        <span className="title-auth">Connexion</span>
                        {err && <div className='error-container'>{err}</div>}
                        {!loading ? 
                            <>
                                <div className='input-container'>
                                    <label>E-mail</label>
                                    <input type="text" name="login" className="input" value={login.login} onChange={handleChange} />
                                </div>
                                <div className='input-container'>
                                    <label>Mot de passe</label>
                                    <input type="password" name="password" className="input" value={login.password} onChange={handleChange} />
                                </div>
                                <button type="submit" className={`button-submit ${disabled ? 'disabled' : ''}`} value="Submit" disabled={disabled}>Se connecter</button>
                                <span className='lowertext'>Pas encore membre ? <Link to="/signup" className='link'>Créez votre compte ici</Link></span>
                            </>
                    
                            :
                            
                            <Spinner/>
                    
                        }
                        
                    </form>

                </div>
                
            </section>
        
    )

}