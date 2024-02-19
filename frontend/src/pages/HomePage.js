import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';
import hand from '../female-hand-holding-blank-paper-records-white_copy.png'



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
            {/* <p>You are logged in to the homepage!</p>
            <p>Name: {profile.first_name} {profile.last_name}</p>
            <p>Email: {profile.email}</p>

            <p>Get Your Birth Certificate <Link to="/birthcertform">Here</Link></p>
            <p>Get Your National ID <Link to="/nationalidform">Here</Link> </p>
            <p>Get Your Military Status Document <Link to="/militarystatusform">Here</Link></p>  */}
            <div className='row vh-100 d-flex align-items-center  '>
                <div className='container d-flex '>
                <div className='col-6 d-flex flex-column justify-content-center p-5'>
                    <h1 className='fi-02 ' >
                        Your Municipality registration at Home
                    </h1>
                    <p className='fi-03'> We help the citizen to obtain important documents from home, such as the ID card and birth certificate.</p>
                </div>
                
                <div className='col-6'>
                <img src={hand} alt="Logo" className='w-100'/>
                </div>
                </div>
                
            </div>
            <div className='sec-2'>
            <div className="about position-relative text-center">
                <h2 className="opacity-25 shsize text-uppercase org ">service</h2>
                <h2 className="position-absolute top-50 start-50 translate-middle text-uppercase org ">service</h2>
                
            </div>
            <div className="text-center">
            <p>All the services we provide to you to help you finish your paper</p>
        </div>
        <div className="container mt-5">
        <div className="row ">
        <div className="col-md-4   position-relative p-2">
              
               <div className=" bg-white text-center  d-flex flex-column justify-content-center user-cards p-3">
                <h3 className="text-uppercase lh-lg mt-4 line position-relative line"> National ID </h3> 
                
             <ul className="text-end text-center m-3" >
             <li>
                    Renew Standard License/ID Online
                </li>
                <li> 
                    Upgrade Probationary License
                </li>
                
             </ul>
             <Link to="/nationalidform" className='link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover ms-auto'> GO</Link>
               </div>
               
            </div> 
            
            <div className="col-md-4   position-relative p-2">
              
              <div className=" bg-white text-center  d-flex flex-column justify-content-center user-cards p-3">
               <h3 className="text-uppercase lh-lg mt-4 line position-relative line">  Birth Certificate </h3> 
               
            <ul className="text-end text-center m-3" >
            <li>
                   Application for Birth Certificate  Online
               </li>
               <li> 
               Modify Birth Certificate
               </li>
               
            </ul>
            <Link to="/birthcertform" className='link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover ms-auto'> GO</Link>
              </div>
              
           </div> 
           <div className="col-md-4   position-relative p-2">
              
              <div className=" bg-white text-center  d-flex flex-column justify-content-center user-cards p-3">
               <h3 className="text-uppercase lh-lg mt-4 line position-relative line"> Military Status </h3> 
               
            <ul className="text-end text-center m-3" >
            <li>
            Manage Applications and Exemptions
               </li>
               <li> 
               Modify Military Status
               </li>
               
            </ul>
            <Link to="/militarystatusform" className='link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover ms-auto'> GO</Link>
              </div>
              
           </div> 
           
           <div className="col-md-4   position-relative p-2">
              
              <div className=" bg-white text-center  d-flex flex-column justify-content-center user-cards p-3">
               <h3 className="text-uppercase lh-lg mt-4 line position-relative line">Marriage Document</h3> 
               
            <ul className="text-end text-center m-3" >
            <li>
                Obtain official documentation confirming marriage status online.
               </li>
               <li> 
               Verify marital status for legal purposes
               </li>
               
            </ul>
            <Link to="/nationalidform" className='link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover ms-auto'> GO</Link>
              </div>
              
           </div> 
           <div className="col-md-4   position-relative p-2">
              
              <div className=" bg-white text-center  d-flex flex-column justify-content-center user-cards p-3">
               <h3 className="text-uppercase lh-lg mt-4 line position-relative line"> Divorce Certificate  </h3> 
               
            <ul className="text-end text-center m-3" >
            <li>
            Obtain official documentation confirming the dissolution of marriage
               </li>
               <li> 
               Verify divorce status for legal and administrative purposes
               </li>
               
            </ul>
            <Link to="/nationalidform" className='link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover ms-auto'> GO</Link>
              </div>
              
           </div> 
           <div className="col-md-4   position-relative p-2">
              
              <div className=" bg-white text-center  d-flex flex-column justify-content-center user-cards p-3">
               <h3 className="text-uppercase lh-lg mt-4 line position-relative line"> Death Certificate </h3> 
               
            <ul className="text-end text-center m-3" >
            <li>
            Obtain official documentation confirming the death of an individual
               </li>
               <li> 
               Provides proof of death for administrative procedures
               </li>
               
            </ul>
            <Link to="/nationalidform" className='link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover ms-auto'> GO</Link>
              </div>
              
           </div> 
        </div>
        </div>
            </div>
            
        </div>
    )
}

export default HomePage