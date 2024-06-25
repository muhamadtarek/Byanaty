import { useState, useContext } from 'react';
import React from 'react';
import AuthContext from '../context/AuthContext';


const BirthCertificateForm = () => {
    const { user } = useContext(AuthContext);
    const [formData, setFormData] = useState({
         firstname: '',
         fatherid: '',
         motherid: '',
         birthdate: '',
         governorate: '', 
         gender: '',
         religion: '',
         copies: ''
    });

    const [tempData, setTempData] = useState({
        fatherid: '',
        motherid: '',
        copies: ''
    });

    const handleDigits = (event) => {
        const id = event.target.id;
        const arabicValue = event.target.value;
        const englishValue = arabicValue.replace(/[\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669]/g, function(d) {
            return d.charCodeAt(0) - 1632; // Subtract the unicode value of Arabic numeral '٠'
        });
    
        // Check if the input contains non-numeric characters
        if (/[^0-9\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669]/.test(arabicValue)) {
            alert("يرجى إدخال الأرقام العربية أو الإنجليزية فقط.");
            return;
        }
    
        // Check if the input contains both Arabic and English digits
        if ((/[0-9]/.test(arabicValue) && /[\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669]/.test(arabicValue))) {
            alert("يرجى إدخال الأرقام العربية أو الإنجليزية فقط، وليس كلاهما.");
            return;
        }
    
        setTempData({ ...tempData, [id]: arabicValue });
        setFormData({ ...formData, [id]: englishValue });
    };

    const handleArabicInput = (event) => {
        const id = event.target.id;
        const value = event.target.value.replace(/[^\u0600-\u06FF\s]/g, '');
        setFormData({ ...formData, [id]: value });
    };

    const handleChange = (event) => {
        const {id, value} = event.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        tempData.copies = tempData.copies === '' ? '1' : tempData.copies;
        
        let modifiedFormData = { ...formData };
        
        // Convert necessary fields to integers
        modifiedFormData.fatherid = parseInt(modifiedFormData.fatherid);
        modifiedFormData.motherid = parseInt(modifiedFormData.motherid);
        modifiedFormData.copies = parseInt(modifiedFormData.copies);

        
        if(!Object.values(modifiedFormData).every(field => field !== '' && field !== 0)){ 
            alert('رجاء ملئ كل البيانات المطلوبة');
        }else{
            // Convert formData to JSON and store it in local storage
            localStorage.setItem('formData', JSON.stringify(modifiedFormData));
    
            // Define the document type
            let documentType = 'birth_certificate'; // Replace 'national_id' with the actual document type

            // Redirect the user to the payment page with the document type as a query parameter
            window.location.href = `/payment?username=${user.username}&documentType=${documentType}&copies=${modifiedFormData.copies}`;
        }
    };

    return (
        <div className='flex d-flex justify-content-center align-items-center sec-2  pt-5'>
           <div className='container bg-white mt-5 p-4'>
           <form onSubmit={handleSubmit}>
                  <div className='row'>
                   <div className=' col-6 mt-2'>
                    <label htmlFor='firstname'>
                        الاسم 
                    </label>
                    <input onChange={handleArabicInput} value={formData.firstname} type="text" className="form-control" id="firstname" />
                   </div>
                   {/* <div className='form-group col-6 mt-2'>
                    <label htmlFor='dadName'>
الرقم القومي                    
                    </label>
                    <input onChange={handleUsername} value={username} type="text" className="form-control" id="father" placeholder=""/>   
                   </div> */}
                   <div className='form-group col-6 mt-2'>
                    <label htmlFor='fatherid'>
الرقم القومي للاب                    </label>
                    <input onChange={handleDigits} value={tempData.fatherid} type="text" className="form-control" id="fatherid" placeholder=""/>   
                   </div>
                   <div className='col-2 mt-2'>
                     <label htmlFor='birthdate'>
                        تاريخ الميلاد
                     </label>
                     <input onChange={handleChange} type='date' className='form-control' id='birthdate' />
                   </div>
                   <div className='col-4 mt-2'>

                   </div>
                   <div className='form-group  col-6 mt-2'>
                    <label htmlFor='motherid'>
رقم القومي للام                   </label>
                    <input onChange={handleDigits} value={tempData.motherid} type="text" className="form-control" id="motherid" placeholder="  "/>   
                   </div>
                   <div className='form-group  col-4 mt-2'>
                    <label htmlFor='governorate'>
المحافظة                   </label>
                    <input onChange={handleArabicInput} value={formData.governorate} type="text" className="form-control" id="governorate" placeholder=" "/>   
                   </div>
                   <div className='col-2 mt-2'>
                    <label htmlFor='religion'>
                        الديانة
                    </label>
                    <select onChange={handleChange} className='form-select' id='religion'>
                    <option selected disabled value="">Choose...</option>
                    <option>مسلم</option>
                    <option>مسيحي</option>
                    <option>يهودي</option>

                    </select>

                   </div>
                   <div className='col-2 mt-2'>
                    <label htmlFor='gender'>
                        النوع
                    </label>
                    <select onChange={handleChange} className='form-select' id='gender'>
                    <option selected disabled value="">Choose...</option>
                    <option>ذكر</option>
                    <option>انثي</option>

                    </select>

                    <div className='form-group  col-6 mt-2'>
                        <label htmlFor='copies'>
                        عدد النسخ المطلوبه
                        </label>
                        <input onChange={handleDigits} value={tempData.copies} type="text" className="form-control" id="copies" placeholder=" "/>   
                    </div>
                    
                <input type="submit" value="تقديم الطلب" className="btn loginButton mt-3 mb-3 "/>

                   </div>
                  </div>
                  
                  
            </form>
           </div>
        </div>
    );
}

export default BirthCertificateForm;