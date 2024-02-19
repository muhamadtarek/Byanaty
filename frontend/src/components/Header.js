// import React, { useContext } from 'react';
// import { Link } from 'react-router-dom';
// import AuthContext from '../context/AuthContext';
// import '../components/style.css'
// const Header = () => {
//     let { user, logoutUser } = useContext(AuthContext);

//     return (
        
        
//         <div>
//         <nav className="navbar navbar-expand-lg bg-white fixed-top opacity-  ">
//             <div className="container-fluid">
//                 <Link to="/" className="navbar-brand text-black h1 fw-bolder ms-4 nav-bayabaty">Bayanaty</Link>
//                 <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
//                     data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
//                     aria-label="Toggle navigation">
//                     <span className="navbar-toggler-icon"></span>
//                 </button>
//                 <div className="collapse navbar-collapse text-white " id="navbarSupportedContent">
//                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
//                     <li className='nav-item'>
//                     {!user && (
//                 <>
//                     <Link to="/login" className="nav-link active ">Login</Link>
//                 </>
//             )}
//                     </li>
//                     <li className='nav-item'>
//                     {!user && (
//                 <>
//                     <Link to="/signup" className="nav-link active ">Sign Up</Link>
//                 </>
//             )}
//                     </li>
//                     <li>
//                     {user && (
//                 <>
//                     <button onClick={(e) => {e.preventDefault(); logoutUser();}}>Logout</button>
//                     <p>Hello {user.username}!</p>
//                 </>
//             )}
//                     </li>
//                    </ul>
//                 </div>
//             </div>
//         </nav>
           
          
//         </div>
//     );
// }

// export default Header;

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import '../components/style.css'

const Header = () => {
    let { user, logoutUser } = useContext(AuthContext);

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-white fixed-top opacity-  ">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand text-black h1 fw-bolder ms-4 nav-bayabaty">Bayanaty</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse text-white " id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            {!user && (
                                <>
                                    <li className='nav-item'>
                                        <Link to="/login" className="nav-link active">Login</Link>
                                    </li>
                                    <li className='nav-item'>
                                        <Link to="/signup" className="nav-link active">Sign Up</Link>
                                    </li>
                                </>
                            )}
                            {user && (
                                <li className='nav-item d-flex align-items-center'>
                                    <p className="nav-link active mb-0">{user.username}</p>
                                    <button onClick={(e) => { e.preventDefault(); logoutUser(); }} className="btn btn-link nav-link active">Logout</button>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;