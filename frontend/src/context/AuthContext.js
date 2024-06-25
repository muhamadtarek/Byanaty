import { createContext, useState, useEffect } from 'react';
import React from 'react';
import PropTypes from 'prop-types';
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
    const [profile, setProfile] = useState(null)

    const [user, setUser] = useState(() => {
        return authTokens ? getDecodedToken(authTokens.access) : null;
    });

    let [error, setError] = useState('');

    const [loading, setLoading] = useState(true);

    const isMobileDevice = () => {
        return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    const getApiBaseUrl = () => {
        const computerIp = '192.168.1.140'; // Replace with your computer's IP address
        const localIp = '127.0.0.1';

        return isMobileDevice() ? `http://${computerIp}:8000` : `http://${localIp}:8000`;
    }

    const registerUser = (username, password, email, firstName, lastName, serialNumber) => {
        // Save the user's data in a closure
        const payload = {
            username,
            password,
            email,
            firstname: firstName,
            lastname: lastName,
            serialnumber:serialNumber
        };
    
        // Redirect to face validation page after saving the user's data but before registering
        navigate('/validation', { state: { payload } });
    };
    //TO Do
    const getDocs = async() => {
        let response = await fetch('http://127.0.0.1:8000/api/profile', {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization':'Bearer ' + String(authTokens.access)
        },
        })
        let data = await response.json()
        console.log(data)
        if(response.status === 200){
            setProfile(data)
        }
    }

    const registerUserAfterValidate = async (payload) => {
        try {
            // Send the POST request
            const response = await fetch(`${getApiBaseUrl()}/api/register/`, {
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
                navigate('/login');             
            } else {
                // Handle server-side validation errors, if any
                let errorData = await response.json();
                console.error('Failed to register:', errorData);
                alert(errorData.error)
            }
               
        } catch (error) {
            console.error('Failed to register:', error);
            // Handle network errors or other unexpected issues
        }
    };

    let loginUser = async (username, password) => {
        const response = await fetch(`${getApiBaseUrl()}/api/token/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: username, password: password })
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
        const response = await fetch(`${getApiBaseUrl()}/api/token/refresh/`, {
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
        getDocs,
        profile,
        error,
        authTokens,
        loginUser,
        logoutUser,
        registerUser,
        registerUserAfterValidate,
    };

    return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};