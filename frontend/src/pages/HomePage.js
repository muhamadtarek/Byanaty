import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';


const HomePage = () => {
    const { authTokens, logoutUser } = useContext(AuthContext);
    let [profile, setProfile] = useState([])

    useEffect(() => {
        getProfile()
    },[])

    const getProfile = async() => {
        let response = await fetch('http://127.0.0.1:8000/api/profile', {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization':'Bearer ' + String(authTokens.access)
        }
        })
        let data = await response.json()
        console.log(data)
        if(response.status === 200){
            setProfile(data)
        } else if(response.statusText === 'Unauthorized'){
            logoutUser()
        }
    }

    return (
        <div>
            <p>You are logged in to the homepage!</p>
            <p>Name: {profile.first_name} {profile.last_name}</p>
            <p>Email: {profile.email}</p>

            <p>Get Your Birth Certificate <Link to="/birthcertform">Here</Link></p>
            <p>Get Your National ID <Link to="/nationalidform">Here</Link> </p>
            <p>Get Your Military Status Document <Link to="/militarystatusform">Here</Link></p>
        </div>
    )
}

export default HomePage