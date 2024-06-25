import { useState, useContext } from 'react';
import React from 'react';
import AuthContext from '../context/AuthContext';

const MarriageForm = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    wifefullname: '',
    husbandfullname: '',
    wifeid: '',
    husbandid: '',
    wifeaddress: '',
    husbandaddress: '',
    divorcedate: '',
    husbandreligion: '',
    wifereligion: '',
    maazounnfullname: '',
    maazounnid: '',
  });

  const [tempData, setTempData] = useState({
      husbandid: '',
      wifeid: '',
      maazounnid: '',
      husbandaddress: '',
      wifeaddress: '',
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

  const handleArabicAndDigitsInput = (event) => {
    const id = event.target.id;
    const arabicValue = event.target.value;
    const englishValue = arabicValue.replace(/[\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669]/g, function(d) {
        return d.charCodeAt(0) - 1632; // Subtract the unicode value of Arabic numeral '٠'
    });

    // Check if the input contains English letters
    if (/[a-zA-Z]/.test(arabicValue)) {
        alert("يرجى إدخال الحروف العربية فقط.");
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
      const id = event.target.id;
      const value = event.target.value
      setFormData({ ...formData, [id]: value });
  };

  const handleMultiWordArabicInput = (event) => {
      const id = event.target.id;
      const value = event.target.value;
  
      const words = value.trim().split(/\s+/);
      if (words.length < 3) {
          alert("يرجى إدخال أربع كلمات على الأقل.");
      } else {
          setFormData({ ...formData, [id]: value });
      }
  };

  const handleSubmit = async (event) => {
      event.preventDefault();
      console.log('Form data:', formData);
  
      let modifiedFormData = { ...formData };
  
      // Convert necessary fields to integers
      modifiedFormData.wifeid = parseInt(modifiedFormData.wifeid);
      modifiedFormData.husbandid = parseInt(modifiedFormData.husbandid);
      modifiedFormData.maazounnid = parseInt(modifiedFormData.maazounnid);
      
      if(!Object.values(modifiedFormData).every(field => field !== '' && field !== 0)){ 
          alert('رجاء ملئ كل البيانات المطلوبة');
          console.log('Form data:', modifiedFormData)
      }else{
          // Convert formData to JSON and store it in local storage
          localStorage.setItem('formData', JSON.stringify(modifiedFormData));
  
          // Define the document type
          let documentType = 'divorce_certificate';

          // Redirect the user to the payment page with the document type as a query parameter
          window.location.href = `/payment?username=${user.username}&documentType=${documentType}`;
      }
  };
 
    return (
        <div className='flex d-flex justify-content-center align-items-center sec-2  pt-5'>
           <div className='container bg-white mt-5 p-4'>
           <form onSubmit={handleSubmit}>
                  <div className='row'>
                   <div className=' col-6 mt-2'>
                    <label htmlFor='wifefullname'>
اسم الزوجه                    </label>
                    <input onChange={handleArabicInput} onBlur={handleMultiWordArabicInput} value={formData.wifefullname} type="text" className="form-control" id="wifefullname" />
                   </div>
                   <div className='form-group col-6 mt-2'>
                    <label htmlFor='wifeid'>
الرقم القومي للزوجه                   </label>
                    <input onChange={handleDigits} value ={tempData.wifeid} type="text" className="form-control" id="wifeid" placeholder=""/>   
                   </div>
                   <div className='col-2 mt-2'>
                     <label htmlFor='husbandfullname'>
اسم الزوج                    </label>
                     <input onChange={handleArabicInput} onBlur={handleMultiWordArabicInput} value={formData.husbandfullname} type='text' className='form-control' id='husbandfullname' />
                   </div>
                   <div className='col-4 mt-2'>

                   </div>
                   <div className='form-group  col-6 mt-2'>
                    <label htmlFor='husbandid'>
الرقم القومي للزوج                 </label>
                    <input onChange={handleDigits} value={tempData.husbandid} type="text" className="form-control" id="husbandid" placeholder="  "/>   
                   </div>
                   <div className='form-group  col-4 mt-2'>
                    <label htmlFor='wifeaddress'>
محل اقامه الزوجه                </label>
                    <input onChange={handleArabicAndDigitsInput} value={tempData.wifeaddress} type="text" className="form-control" id="wifeaddress" placeholder=" "/>   
                   </div>
                   <div className='form-group  col-4 mt-2'>
                    <label htmlFor='husbandaddress'>
محل اقامه الزوج               </label>
                    <input onChange={handleArabicAndDigitsInput} value={tempData.husbandaddress} type="text" className="form-control" id="husbandaddress" placeholder=" "/>   
                   </div>
                   <div className='col-2 mt-2'>
                    <label htmlFor='husbandreligion'>
                        ديانة الزوج
                    </label>
                    <select onChange={handleChange} value={formData.husbandreligion} className='form-select' id='husbandreligion'>
                    <option selected disabled value="">...اختر</option>
                    <option>مسلم</option>
                    <option>مسيحي</option>
                    <option>يهودي</option>

                    </select>

                   </div>

                   <div className='col-2 mt-2'>
                    <label htmlFor='wifereligion'>
                        ديانة الزوجة
                    </label>
                    <select onChange={handleChange} value={formData.wifereligion} className='form-select' id='wifereligion'>
                    <option selected disabled value="">...اختر</option>
                    <option>مسلم</option>
                    <option>مسيحي</option>
                    <option>يهودي</option>

                    </select>

                   </div>

                   <div className='col-2 mt-2'>
                     <label htmlFor='divorcedate'>
تاريخ الطلاق               </label>
                     <input onChange={handleChange} type='date' className='form-control' id='divorcedate' />
                   </div>
                   
                   <div className='col-2 mt-2'>
                     <label htmlFor='maazounnfullname'>
اسم المأذون                 </label>
                     <input onChange={handleArabicInput} onBlur={handleMultiWordArabicInput} value={formData.maazounnfullname} type='text' className='form-control' id='maazounnfullname' />
                   </div>
                   <div className='form-group  col-6 mt-2'>
                    <label htmlFor='maazounnid'>
الرقم القومي للمأذون             </label>
                    <input onChange={handleDigits} value ={tempData.maazounnid} type="text" className="form-control" id="maazounnid" placeholder="  "/>   
                   </div>
                  </div>
                  
                  <input type="submit" value="تقديم الطلب" className="btn loginButton mt-3 mb-3 "/>
            </form>
           </div>
        </div>
    );
}

export default MarriageForm;