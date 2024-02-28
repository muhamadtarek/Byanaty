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
                    تسجيلك السهل بالمنزل
                    </h1>
                    <p className='fi-03'> نساعد المواطن في الحصول على الوثائق المهمة من المنزل مثل بطاقة الهوية وشهادة الميلاد.</p>
                </div>
                
                <div className='col-6'>
                <img src={hand} alt="Logo" className='w-100'/>
                </div>
                </div>
                
            </div>
            <div className='sec-2'>
            <div className="about position-relative text-center">
                <h2 className="opacity-25 shsize text-uppercase org ">خدمة</h2>
                <h2 className="position-absolute top-50 start-50 translate-middle text-uppercase org ">خدمة</h2>
                
            </div>
            <div className="text-center">
            <p>جميع الخدمات التي نقدمها لك لمساعدتك في إنهاء أوراقك</p>
        </div>
        <div className="container mt-5">
        <div className="row ">
        <div className="col-md-4   position-relative p-2">
              
               <div className=" bg-white text-center  d-flex flex-column justify-content-center user-cards p-3">
                <h3 className="text-uppercase lh-lg mt-4 line position-relative line"> بطاقة الهوية </h3> 
                
             <ul className="text-end text-center m-3" >
             <li>
             تجديد بطاقة الهوية عبر الإنترنت
                </li>
                <li> 
                تعديل بطاقة الهوية 
                </li>
                
             </ul>
             <Link to="/nationalidform" className='link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover ms-auto'> اذهب</Link>
               </div>
               
            </div> 
            
            <div className="col-md-4  position-relative p-2">
  <div className="bg-white text-center  d-flex flex-column justify-content-center user-cards p-3">
    <h3 className="text-uppercase lh-lg mt-4 line position-relative line"> شهادة الميلاد </h3>
    <ul className="text-end text-center m-3">
      <li>
        طلب شهادة الميلاد عبر الإنترنت
      </li>
      <li>
        تعديل شهادة الميلاد
      </li>
    </ul>
    <Link to="/birthcertform" className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover ms-auto"> اذهب </Link>
  </div>
</div>

<div className="col-md-4  position-relative p-2">
  <div className="bg-white text-center  d-flex flex-column justify-content-center user-cards p-3">
    <h3 className="text-uppercase lh-lg mt-4 line position-relative line"> الحالة العسكرية </h3>
    <ul className="text-end text-center m-3">
      <li>
        إدارة الطلبات والإعفاءات
      </li>
      <li>
        تعديل الحالة العسكرية
      </li>
    </ul>
    <Link to="/militarystatusform" className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover ms-auto"> اذهب </Link>
  </div>
</div>

<div className="col-md-4  position-relative p-2">
  <div className="bg-white text-center  d-flex flex-column justify-content-center user-cards p-3">
    <h3 className="text-uppercase lh-lg mt-4 line position-relative line"> وثيقة الزواج </h3>
    <ul className="text-end text-center m-3">
      <li>
        الحصول على وثائق رسمية تؤكد الحالة الزوجية عبر الإنترنت.
      </li>
      <li>
        التحقق من الحالة الزوجية لأغراض قانونية
      </li>
    </ul>
    <Link to="/marriageform" className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover ms-auto"> اذهب </Link>
  </div>
</div>

<div className="col-md-4  position-relative p-2">
  <div className="bg-white text-center  d-flex flex-column justify-content-center user-cards p-3">
    <h3 className="text-uppercase lh-lg mt-4 line position-relative line"> شهادة الطلاق </h3>
    <ul className="text-end text-center m-3">
      <li>
        الحصول على وثائق رسمية تؤكد إنهاء الزواج
      </li>
      <li>
        التحقق من حالة الطلاق لأغراض قانونية وإدارية
      </li>
    </ul>
    <Link to="/divorceform" className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover ms-auto"> اذهب </Link>
  </div>
</div>

<div className="col-md-4  position-relative p-2">
  <div className="bg-white text-center  d-flex flex-column justify-content-center user-cards p-3">
    <h3 className="text-uppercase lh-lg mt-4 line position-relative line"> شهادة الوفاة </h3>
    <ul className="text-end text-center m-3">
      <li>
        الحصول على وثائق رسمية تؤكد وفاة الفرد
      </li>
      <li>
        تقديم إثبات الوفاة للإجراءات القانونية و الإدارية
      </li>
    </ul>
    <Link to="/deathform" className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover ms-auto"> GO</Link>
              </div>
              
           </div> 
        </div>
        </div>
            </div>
            
        </div>
    )
}

export default HomePage