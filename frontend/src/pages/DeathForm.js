import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';

const DeathForm = () => {
    const { username } = useContext(AuthContext);
    const [formData, setFormData] = useState({
      deceasedname: '',
      deceasedid: '',
      deceasedmotherfullname: '',
      deceasedfatherfullname: '',
      deceasedbirthdate: '',
      deceaseddeathdate: '', 
      placeofdeath: '',
      causeofdeath: '',
      religion: '',
    });
    const [tempData, setTempData] = useState({
        deceasedid: '',
    });

    const handleArabicInput = (event) => {
      const id = event.target.id;
      const value = event.target.value.replace(/[^\u0600-\u06FF\s]/g, '');
      setFormData({ ...formData, [id]: value });
    };

    const handleMultiWordArabicInput = (event) => {
        const id = event.target.id;
        const value = event.target.value;
    
        const words = value.trim().split(/\s+/);
        if (words.length < 4) {
            alert("يرجى إدخال أربع كلمات على الأقل.");
        } else {
            setFormData({ ...formData, [id]: value });
        }
    };

    const handleDigits = (event) => {
        const id = event.target.id;
        const arabicValue = event.target.value;
        const englishValue = arabicValue.replace(/[\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669]/g, function(d) {
            return d.charCodeAt(0) - 1632; // Subtract the unicode value of Arabic numeral '٠'
        });
    
        // Check if the input contains both Arabic and English digits
        if ((/[0-9]/.test(arabicValue) && /[\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669]/.test(arabicValue))) {
            alert("يرجى إدخال الأرقام العربية أو الإنجليزية فقط، وليس كلاهما.");
            return;
        }
    
        setTempData({ ...tempData, [id]: arabicValue });
        setFormData({ ...formData, [id]: englishValue });
    };

    const handleChange = (event) => {
        const {id, value} = event.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        let modifiedFormData = { ...formData };
    
        // Convert necessary fields to integers
        modifiedFormData.deceasedid = parseInt(modifiedFormData.deceasedid);
        
        if(!Object.values(modifiedFormData).every(field => field !== '' && field !== 0)){ 
            alert('رجاء ملئ كل البيانات المطلوبة');
        }else{
            // Convert formData to JSON and store it in local storage
            localStorage.setItem('formData', JSON.stringify(modifiedFormData));
    
            // Define the document type
            let documentType = 'death_certificate'; 

            // Redirect the user to the payment page with the document type as a query parameter
            window.location.href = `/payment?username=${username}&documentType=${documentType}`;
        }
    };


 
    return (
        <div className='flex d-flex justify-content-center align-items-center sec-2  pt-5'>
           <div className='container bg-white mt-5 p-4'>
           <form onSubmit={handleSubmit}>
                  <div className='row'>
                   <div className=' col-6 mt-2'>
                    <label htmlFor='deceasedname'>
اسم المتوفي                  </label>
                    <input onChange={handleArabicInput} value = {formData.deceasedname} type="text" className="form-control" id="deceasedname" />
                   </div>
                   <div className='form-group col-6 mt-2'>
                    <label htmlFor='deceasedId'>
الرقم القومي للمتوفي                  </label>
                    <input onChange={handleDigits} value={tempData.deceasedId} type="text" className="form-control" id="deceasedId" placeholder=""/>   
                   </div>
                   <div className='col-2 mt-2'>
                     <label htmlFor='deceasedmotherfullname'>
اسم ام المتوفي بالكامل                   </label>
                     <input onChange={handleArabicInput} value = {formData.deceasedmotherfullname} type='text' className='form-control' id='deceasedmotherfullname' />
                   </div>
                   <div className='col-2 mt-2'>
                     <label htmlFor='deceasedfatherfullname'>
اسم أب المتوفي بالكامل                   </label>
                     <input onChange={handleArabicInput} value = {formData.deceasedfatherfullname} type='text' className='form-control' id='deceasedfatherfullname' />
                   </div>
                   <div className='col-4 mt-2'>

                   </div>
             
                   <div className='form-group  col-4 mt-2'>
                    <label htmlFor='placeofdeath'>
مكان الوفاه              </label>
                    <input onChange={handleArabicInput} value = {formData.placeofdeath} type="text" className="form-control" id="placeofdeath" placeholder=" "/>   
                   </div>
                   <div className='form-group  col-4 mt-2'>
                    <label htmlFor='causeofdeath'>
سبب الوفاه             </label>
                    <input onChange={handleArabicInput} value = {formData.causeofdeath} type="text" className="form-control" id="causeofdeath" placeholder=" "/>   
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
                    <div className='col-2 mt-2'>
                     <label htmlFor='deceasedbirthdate'>
                        تاريخ الميلاد
                     </label>
                     <input onChange={handleChange} type='date' className='form-control' id='deceasedbirthdate' />
                   </div>
                   <div className='col-2 mt-2'>
                     <label htmlFor='deceaseddeathdate'>
تاريخ الوفاه                     </label>
                     <input onChange={handleChange} type='date' className='form-control' id='deceaseddeathdate' />
                   </div>
                   </div>
                   
         
                  </div>
                  
                  <input type="submit" value="تقديم الطلب" className="btn loginButton mt-3 mb-3 "/>
            </form>
           </div>
        </div>
    );
}

export default DeathForm;