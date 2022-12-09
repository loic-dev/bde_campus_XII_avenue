
import { useEffect, useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { signupAPI } from '../../utils/API';
import '../login/login.style.scss';
import { Spinner } from '../../components/spinner/spinner.component';

export const SignupPage = () => {

    const navigate = useNavigate();


    const [disabled, setDisabled] = useState(true);

    const [signup, setSignup] = useState({
        email: "",
        firstname:"",
        lastname: "",
        password: "",
        confirmPassword:"",
    })
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(null);

    const handleChange = evt => {
        
        const name = evt.target.name;
        const value = evt.target.value;
        setSignup({
          ...signup,
          [name]: value
        })
       
      }

      
    let handleSubmit = async (e) => {
        setErr(null)
        e.preventDefault();
        if(!disabled){
            setLoading(true)
            try {
                await signupAPI(signup);
                return navigate('/login');
            } catch (error) {
                console.log(error.response.data.error)
                setErr(error.response.data.error);
            }
            setLoading(false)
        }
    }

    let handleDisabled = () => {
        setDisabled(!signup.lastname || !signup.firstname || !signup.email || !signup.password || !signup.confirmPassword || signup.confirmPassword !== signup.password);
    }


    useEffect(() => {
        handleDisabled();
    },[signup])

    

    return (
        <section className="authPage">
        <div className='wrapper-auth'>
            <form onSubmit={handleSubmit}>
                <span className="title-auth">Créer un compte</span>
                {err && <div className='error-container'>{err}</div>}
                {!loading ? 
                    <>
                        <div className='input-container'>
                            <label>Prénom</label>
                            <input type="text" name="firstname" className="input" value={signup.firstname} onChange={handleChange} />
                        </div>
                        <div className='input-container'>
                            <label>Nom</label>
                            <input type="text" name="lastname" className="input" value={signup.lastname} onChange={handleChange} />
                        </div>
                        <div className='input-container'>
                            <label>E-mail</label>
                            <input type="text" name="email" className="input" value={signup.email} onChange={handleChange} />
                        </div>
                        <div className='input-container'>
                            <label>Mot de passe</label>
                            <input type="password" name="password" className="input" value={signup.password} onChange={handleChange} />
                        </div>
                        <div className='input-container'>
                            <label>Confirmer le mot de passe</label>
                            <input type="password" name="confirmPassword" className="input" value={signup.confirmPassword} onChange={handleChange} />
                        </div>
                        <button type="submit" className={`button-submit ${disabled ? 'disabled' : ''}`} value="Submit" disabled={disabled}>S'inscrire</button>
                        <span className='lowertext'>Déja membre ? <Link to="/login" className='link'>Connectez-vous ici</Link></span>
                    </>
            
                    :
                    
                    <Spinner/>
            
                }
                
            </form>

        </div>
        
    </section>
        
    )

}