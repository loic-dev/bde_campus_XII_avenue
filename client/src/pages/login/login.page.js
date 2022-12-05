
import { useState } from 'react';
import { loginAPI } from '../../utils/API';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {

    const navigate = useNavigate();

    const [login, setLogin] = useState({
        login: "",
        password: "",
    })
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
        if(login.login && login.password){
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
        }
    }


    return (
        !loading ? 
            <section className="loginPage">
                <form onSubmit={handleSubmit}>
                    {err && <p>{err}</p>}
                    <label>Login:
                        <input type="text" name="login" value={login.login} onChange={handleChange} />
                    </label>
                    <label>Password:
                        <input type="password" name="password" value={login.password} onChange={handleChange} />
                    </label>
                    <button type="submit" className="button-submit" value="Submit" disabled={!login.login || !login.password}>Se connecter</button>
                </form>
            </section>
        :
        <p>loading ...</p>
        
    )

}