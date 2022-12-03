import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/API';

export { PrivateRoute };

function PrivateRoute({ children }) {
    

    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn ] = useState(false);


    const checkUserToken = async () => {
        try {
            let authenticated = await auth();
            if (!authenticated) {
                setIsLoggedIn(false);
                return navigate('/login');
            }
            setIsLoggedIn(true);
        } catch (error) {
            setIsLoggedIn(false);
            return navigate('/login');
        }
    }

    useEffect(() => {
        checkUserToken();
    }, [isLoggedIn]);


    return isLoggedIn ? children : <p>loading ...</p>;
}