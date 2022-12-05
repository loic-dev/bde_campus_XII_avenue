
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupAPI } from '../../utils/API';

export const SignupPage = () => {

    const navigate = useNavigate();

    const [signup, setSignup] = useState({
        email: "",
        firstname:"",
        lastname: "",
        password: "",
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
        if(signup.firstname && signup.lastname && signup.email && signup.password){
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


    return (
        !loading ? 
            <section className="signupPage">
                <form onSubmit={handleSubmit}>
                    {err && <p>{err}</p>}
                    <label>firstname:
                        <input type="text" name="firstname" value={signup.firstname} onChange={handleChange} />
                    </label>
                    <label>lastname:
                        <input type="text" name="lastname" value={signup.lastname} onChange={handleChange} />
                    </label>
                    <label>email:
                        <input type="text" name="email" value={signup.email} onChange={handleChange} />
                    </label>
                    <label>Password:
                        <input type="password" name="password" value={signup.password} onChange={handleChange} />
                    </label>
                    <button type="submit" className="button-submit" value="Submit" disabled={!signup.lastname || !signup.firstname || !signup.email || !signup.password}>S'inscrire'</button>
                </form>
            </section>
        :
        <p>loading ...</p>
        
    )

}