    import React, { useState, useContext,useEffect } from 'react';
    import AuthContext from '../context/AuthContext';

    const SignupPage = () => {
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
        const [email, setEmail] = useState('');
        const [firstName, setFirstName] = useState('');
        const [serialNumber, setSerialNumber] = useState('');
        const [lastName, setLastName] = useState('');
        
        const { registerUser } = useContext(AuthContext);

        const handleChange = (event) => {
            // Remove non-numeric characters and limit to 14 digits
            const newValue = event.target.value.replace(/[^0-9]/g, '').slice(0, 14);
            setUsername(newValue)
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            if(username.length == 14) { 
                await registerUser(username, password, email, firstName, lastName, serialNumber);
                setSerialNumber('');
                setUsername('');
                setPassword('');
                setEmail('');
                setFirstName('');
                setLastName('');

                // Clear the form fields after successful registration

            }else {
                alert('يجب أن يكون الرقم القومي 14 رقمًا')
            }
        };

    return (
       <div>
         <div className=' d-flex   align-content-center loginCont'>
            <div className='loginArea col-12 '>
        <div className='col-12 loginDiv'>
        <h3 className='org mb-4 mt-2'> تسجيل اشتراك</h3>
            <form onSubmit={handleSubmit} className='form-horizontal'>
            <label className='font-weight-light d-block '>الاسم الأول</label>
                <input 
                className="form-control d-block font-weight-light text-right border border-1 border-opacity-75 border-black mb-3"
                    type="text"
                    placeholder="الاسم الأول"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <label className='font-weight-light d-block '> الاسم الأخير</label>
                <input 
                className="form-control d-block font-weight-light text-right border border-1 border-opacity-75 border-black mb-3"
                    type="text"
                    placeholder="الاسم الأخير"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            <label className='font-weight-light d-block '> الرقم القومي</label>
                <input 
                className="form-control d-block font-weight-light text-right border border-1 border-opacity-75 border-black mb-3"
                    type="text"
                    placeholder="أدخل الرقم القومي"
                    maxLength={14}
                    value={username}
                    onChange={handleChange}
                />
                <label className='font-weight-light d-block '>الرقم التسلسلي</label>
                <input 
                className="form-control d-block font-weight-light text-right border border-1 border-opacity-75 border-black mb-3"
                    type="text"
                    placeholder="الحروف و الأرقام الانجليزية يسار اسفل البطاقة"
                    value={serialNumber}
                    onChange={(e) => setSerialNumber(e.target.value)}
                />
            
                  <label className='font-weight-light d-block '>البريد الالكتروني</label>
                <input 
                className="form-control d-block font-weight-light text-right border border-1 border-opacity-75 border-black mb-3"
                    type="email"
                    placeholder="البريد الالكتروني"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label className='font-weight-light d-block '>كلمة السر</label>
                <input 
                className="form-control d-block font-weight-light text-right border border-1 border-opacity-75 border-black mb-3"
                    type="password"
                    placeholder="أدخل كلمة السر"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

              
                
                <button type="submit" className="btn loginButton mt-3 mb-3 "> ابدأ التحقق</button>
            </form>
        </div>


        </div>
        </div>
       </div>

        
    );
};

export default SignupPage;