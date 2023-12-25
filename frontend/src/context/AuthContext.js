import { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode'; // Ensure this import is correct
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const getDecodedToken = (token) => {
        try {
            return jwtDecode(token);
        } catch (error) {
            console.error('Token decode failed:', error);
            return null;
        }
    };

    const [authTokens, setAuthTokens] = useState(() => {
        const tokenString = localStorage.getItem('authTokens');
        return tokenString ? JSON.parse(tokenString) : null;
    });

    const [user, setUser] = useState(() => {
        return authTokens ? getDecodedToken(authTokens.access) : null;
    });

    const [loading, setLoading] = useState(true);

    const registerUser = async (username, password, email, firstName, lastName) => {
        // Construct the payload
        const payload = {
            username,
            password,
            email,
            first_name: firstName,
            last_name: lastName,
        };
    
        try {
            // Send the POST request
            const response = await fetch('http://127.0.0.1:8000/api/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
    
            if (response.ok) {
                const data = await response.json();
                // Assuming the server responds with the auth tokens upon successful registration
                localStorage.setItem('authTokens', JSON.stringify(data));
                setAuthTokens(data);
                setUser(jwtDecode(data.access));
                navigate('/');
            } else {
                // Handle server-side validation errors, if any
                const errorData = await response.json();
                console.error('Failed to register:', errorData);
                // You might want to update your state with these errors to display them in the UI
            }
        } catch (error) {
            console.error('Failed to register:', error);
            // Handle network errors or other unexpected issues
        }
    };

    let loginUser = async (e) => {
        e.preventDefault()
        const response = await fetch('http://127.0.0.1:8000/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: e.target.username.value, password: e.target.password.value })
        });

        let data = await response.json();

        if(data){
            localStorage.setItem('authTokens', JSON.stringify(data));
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            navigate('/')
        } else {
            alert('Something went wrong while logging in the user!')
        }
    }

    let logoutUser = (e) => {
        localStorage.removeItem('authTokens')
        setAuthTokens(null)
        setUser(null)
        navigate('/login')
    }

    const updateToken = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({refresh:authTokens?.refresh})
        })
       
        const data = await response.json()
        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('authTokens',JSON.stringify(data))
        } else {
            logoutUser()
        }

        if(loading){
            setLoading(false)
        }
    }

    useEffect(() => {
        const REFRESH_INTERVAL = 1000 * 60 * 4; // 4 minutes
        if (loading) {
            updateToken();
        }
        const interval = setInterval(() => {
            if (authTokens) {
                updateToken();
            }
        }, REFRESH_INTERVAL);
        return () => clearInterval(interval);
    }, [authTokens, loading]);

    let contextData = {
        user,
        authTokens,
        loginUser,
        logoutUser,
        registerUser,
    };

    return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
};