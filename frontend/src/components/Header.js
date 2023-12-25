import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Header = () => {
    let { user, logoutUser } = useContext(AuthContext);

    return (
        <div>
            <Link to="/">Home</Link>
            <span> | </span>
            {!user && (
                <>
                    <Link to="/login">Login</Link>
                    <span> | </span>
                    <Link to="/signup">Sign Up</Link>
                </>
            )}
            {user && (
                <>
                    <button onClick={(e) => {e.preventDefault(); logoutUser();}}>Logout</button>
                    <p>Hello {user.username}!</p>
                </>
            )}
        </div>
    );
}

export default Header;