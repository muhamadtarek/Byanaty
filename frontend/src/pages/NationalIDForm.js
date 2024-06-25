import { useState, useContext } from 'react';
import React from 'react';


const NationalIDForm = () => {
    const [socialStatus, setSocialStatus] = useState('مطلق'); 
    const [nationalIdRequestType, setNationalIdRequestType] = useState('تجديد'); 
    const [workType, setWorkType] = useState('أخري'); 
    const [workStatus, setWorkStatus] = useState('يعمل'); 
    const [formData, setFormData] = useState({
        firstname: '',
        fatherfullname: '',
        socialstatus: 'أعزب',
        renewal: true,
        replacement: false,
        birthdate: '',
        motherfullname: '',
        city: '',
        city2: '',
        city3: '',
        religion: 'مسلم',
        gender: 'ذكر',
        street: '',
        buildingnumber: '',
        residentialgroup: '',
        phone: '',
        appartment: '',
        floor: '',
        workstatus: 'يعمل',
        yearofwork: '',
        job: '',
        worktype: '',
        workplace: '',
        tradeofficenumber: '',
        tradeoffice: ''
    });

    const [tempData, setTempData] = useState({
        buildingnumber: '',
        phone: '',
        appartment: '',
        yearofwork: '',
        floor: '',
        street: '',
        tradeofficenumber: '',
        tradeoffice: '',
        workplace: ''
    });

    const handleNationalIdRequestType = (event) => {
        setNationalIdRequestType(event.target.value);
        if (nationalIdRequestType === 'تجديد') {
            setFormData({ ...formData, renewal: true, replacement: false });
        } else {
            setFormData({ ...formData, renewal: false, replacement: true });
        }
    };

    const handleSocialStatusChange = (event) => {
        setSocialStatus(event.target.value);
        setFormData({ ...formData, socialstatus: socialStatus });
    };
    const handleWorkTypeChange = (event) => {
        setWorkType(event.target.value);
        setFormData({ ...formData, worktype: workType });
    };

    const handleWorkStatusChange = (event) => {
        setWorkStatus(event.target.value);
        setFormData({ ...formData, workstatus: workStatus });
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Form data:', formData);
    
        let modifiedFormData = { ...formData };
    
        // Convert necessary fields to integers
        modifiedFormData.phone = parseInt(modifiedFormData.phone);
        modifiedFormData.buildingnumber = parseInt(modifiedFormData.buildingnumber);
        modifiedFormData.appartment = parseInt(modifiedFormData.appartment);
        modifiedFormData.tradeofficenumber = parseInt(modifiedFormData.tradeofficenumber);
        modifiedFormData.yearofwork = parseInt(modifiedFormData.yearofwork);
        
        if(!Object.values(modifiedFormData).every(field => field !== '' && field !== 0)){ 
            alert('رجاء ملئ كل البيانات المطلوبة');
        }else{
            // Convert formData to JSON and store it in local storage
            localStorage.setItem('formData', JSON.stringify(modifiedFormData));
    
            // Define the document type
            let documentType = 'national_id'; // Replace 'national_id' with the actual document type

            // Redirect the user to the payment page with the document type as a query parameter
            window.location.href = `/payment?documentType=${documentType}`;
        }
    };

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     console.log('Form data:', formData);

    //     let modifiedFormData = { ...formData };

    //         // Convert necessary fields to integers
    //     modifiedFormData.phone = parseInt(modifiedFormData.phone);
    //     modifiedFormData.buildingnumber = parseInt(modifiedFormData.buildingnumber);
    //     modifiedFormData.appartment = parseInt(modifiedFormData.appartment);
    //     modifiedFormData.tradeofficenumber = parseInt(modifiedFormData.tradeofficenumber);
    //     modifiedFormData.yearofwork = parseInt(modifiedFormData.yearofwork);
        
    //     if(!Object.values(formData).every(field => field !== '' && field !== 0)){ 
    //         alert('رجاء ملئ كل البيانات المطلوبة');
    //     }else{
    //         try {
    //             const response = await fetch('http://127.0.0.1:8000/api/documents/national_id/', {
    //                 method: 'POST',
    //                 headers: {
    //                     'Authorization': `Bearer ${authTokens.access}`,
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify(formData),
    //             });

    //             if (response.ok) {
    //                 // Handle success
    //                 alert('تم إرسال الطلب بنجاح');
    //             } else {
    //                 // Handle errors
    //                 alert('لم يتم إرسال الطلب بنجاح');
    //             }
    //         } catch (error) {
    //             alert('خطأ في إرسال الطلب');
    //         }
    //     };
    // }

    return (
        <div className='flex d-flex justify-content-center align-items-center sec-2  pt-5'>
           <div className='container bg-white mt-5 p-4'>
           <form onSubmit={handleSubmit}>
                  <div className='row'>
                   <div className=' col-6 mt-2'>
                    <label htmlFor='firstname'>
                         الاسم الاول
                    </label>
                    <input onChange={handleArabicInput} value={formData.firstname} type="text" className="form-control" id="firstname" />
                   </div>
                   <div className='form-group col-6 mt-2'>
                    <label htmlFor='fatherfullname'>
                        اسم الاب بالكامل
                    </label>
                    <input onChange={handleArabicInput} onBlur={handleMultiWordArabicInput} value={formData.fatherfullname} type="text" className="form-control" id="fatherfullname" placeholder=""/>   
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
                    <label htmlFor='motherfullname'>
 اسم الأم بالكامل                    </label>
                    <input onChange={handleArabicInput} onBlur={handleMultiWordArabicInput} value={formData.motherfullname} type="text" className="form-control" id="motherfullname" placeholder=""/>   
                   </div>
                   <div className='form-group  col-4 mt-2'>
                    <label htmlFor='city'>
المحافظة                   </label>
                    <input onChange={handleArabicInput} value={formData.city} type="text" className="form-control" id="city" placeholder=" "/>   
                   </div><div className='form-group  col-4 mt-2'>
                    <label htmlFor='city2'>
                        قسم
                     </label>
                    <input onChange={handleArabicInput} value={formData.city2} type="text" className="form-control" id="city2" placeholder="  "/>   
                   </div><div className='form-group  col-4 mt-2'>
                    <label htmlFor='city3'>
                        قرية
                     </label>
                    <input onChange={handleArabicInput} value={formData.city3} type="text" className="form-control" id="city3" placeholder="  "/>   
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

                   </div>
                      <div className='col-8 mt-2' id='flex-radio-1'>
                         <input onChange= {handleSocialStatusChange} type='radio' value="أعزب" checked={socialStatus === 'أعزب'} className="form-check-input col-3 mt-4" id="validationFormCheck2" name="socialstatus" />
                         <label htmlFor='validationFormCheck2' className='form-check-label col-3 mt-4 ms-2' id='validationFormCheck2-label'> اعزب</label>
                         <input onChange= {handleSocialStatusChange} type='radio' value="متزوج" checked={socialStatus === 'متزوج'} className="form-check-input col-3 mt-4" id="validationFormCheck3" name="socialstatus" />
                         <label htmlFor='validationFormCheck3' className='form-check-label col-3 mt-4 ms-2' id='validationFormCheck3-label'> متزوج</label>
                         <input onChange= {handleSocialStatusChange} type='radio' value="مطلق" checked={socialStatus === 'مطلق'} className="form-check-input col-3 mt-4" id="validationFormCheck4" name="socialstatus" />
                         <label htmlFor='validationFormCheck4' className='form-check-label col-3 mt-4 ms-2' id='validationFormCheck4-label'> مطلق</label>
                         <input onChange= {handleSocialStatusChange} type='radio' value="أرمل" checked={socialStatus === 'أرمل'} className="form-check-input col-3 mt-4" id="validationFormCheck5" name="socialstatus" />
                         <label htmlFor='validationFormCheck5' className='form-check-label mt-4 ms-2 ' id='validationFormCheck5-label'> ارمل</label>
                      </div>

<div className='col-12 mt-2'>
<label htmlFor='workplace'>
                          مكان العمل
                    </label>
                    <input onChange={handleArabicAndDigitsInput} value={tempData.workplace} type="text" className="form-control" id="workplace" />
</div>

<div className='col-9 mt-2'>
    <input onChange={handleArabicAndDigitsInput} value={tempData.street} type='text' className='inp col-10' id='street' />
    <label htmlFor='street' className='form-check-label mt-4 ms-2' > الشارع</label>
</div>
<div className='col-3 mt-2'>
    <input onChange={handleDigits} value= {tempData.buildingnumber} type='text' className='inp col-8' id='buildingnumber' />
    <label htmlFor='buildingnumber' className='form-check-label mt-4 ms-2' > رقم العقار</label>
</div>

<div className='col-3 mt-2'>
    <input onChange={handleArabicInput} value={formData.residentialgroup} type='text' className='inp col-6' id='residentialgroup' />
    <label htmlFor='residentialgroup' className='form-check-label mt-4 ms-2' > تجمع سكني</label>
</div>

<div className='col-3 mt-2'>
    <input onChange={handleDigits} value={tempData.phone} type='text' className='inp col-8' id='phone' />
    <label htmlFor='phone' className='form-check-label mt-4 ms-2' > التليفون</label>
</div>
<div className='col-3 mt-2'>
    <input onChange={handleDigits} value={tempData.appartment} type='text' className='inp col-8' id='appartment' />
    <label htmlFor='appartment' className='form-check-label mt-4 ms-2' > شقة</label>
</div>
<div className='col-3 mt-2'>
    <input onChange={handleArabicInput} value={formData.floor} type='text' className='inp col-8' id='floor' />
    <label htmlFor='floor' className='form-check-label mt-4 ms-2' > دور</label>
</div>
<div className='col-12 mt-2' id='flex-radio-3'>

 <input onChange= {handleWorkStatusChange} type='radio' value="يعمل" checked={workStatus === 'يعمل'} className="form-check-input  mt-4 col-6" id="working" name="working"/>
                         <label htmlFor='workstatus' className='form-check-label  mt-4 ms-2' id='work-label'> يعمل</label>
                         <input onChange= {handleWorkStatusChange} type='radio' value="لا يعمل" checked={workStatus === 'لا يعمل'} className="form-check-input m-3 mt-4" id="notworking" name="work"/>
                         <label htmlFor='notworking' className='form-check-label  mt-4 ' id='notworking-label'> لا يعمل</label>
</div>
<div className='col-4 mt-2'>
    <input onChange={handleDigits} value={tempData.yearofwork} type='text' className='inp col-6' id='yearofwork' />
    <label htmlFor='yearofwork' className='form-check-label mt-4 ms-2' > سنه شغل الوظيفة</label>
</div>
<div className='col-8 mt-2'>
    <input onChange={handleArabicInput} value={formData.job} type='text' className='inp col-10' id='job' />
    <label htmlFor='job' className='form-check-label mt-4 ms-2' > الوظيفة</label>
</div>
<div className='col-12 mt-2'>
    <label htmlFor='nationalidrequesttype'>
    نوع الطلب (تجديد ام بدل فاقد)
                            </label>
                    <select onChange={handleNationalIdRequestType} className='form-select' id='nationalidrequesttype'>
                        <option selected disabled value="">اختر...</option>
                        <option>تجديد</option>
                        <option>بدل فاقد</option>

                    </select>
</div>
<div className='col-12 mt-2' id='flex-radio-2'>
                           
                        <label htmlFor='validationFormCheck10' className='form-check-label col-2 mt-4 ms-2' id='validationFormCheck10-label'> اخري</label>
                        <input onChange={handleWorkTypeChange} type='radio' value="اخري" checked={workType === 'اخري'} className="form-check-input mt-4" id="validationFormCheck10" name="worktype"/>

                        <label htmlFor='validationFormCheck6' className='form-check-label col-2 mt-4 ms-2' id='validationFormCheck6-label'> قطاع خاص</label>
                        <input onChange={handleWorkTypeChange} type='radio' value="قطاع خاص" checked={workType === 'قطاع خاص'} className="form-check-input mt-4" id="validationFormCheck6" name="worktype"/>

                        <label htmlFor='validationFormCheck7' className='form-check-label col-2 mt-4 ms-2' id='validationFormCheck7-label'> قطاع اعمال</label>
                        <input onChange={handleWorkTypeChange} type='radio' value="قطاع اعمال" checked={workType === 'قطاع اعمال'} className="form-check-input mt-4" id="validationFormCheck7" name="worktype"/>

                        <label htmlFor='validationFormCheck8' className='form-check-label col-2 mt-4 ms-2' id='validationFormCheck8-label'> قطاع عام</label>
                        <input onChange={handleWorkTypeChange} type='radio' value="قطاع عام" checked={workType === 'قطاع عام'} className="form-check-input mt-4" id="validationFormCheck8" name="worktype"/>

                        <label htmlFor='validationFormCheck9' className='form-check-label mt-4 ms-2 col-2' id='validationFormCheck9-label'> حكومه</label>
                        <input onChange={handleWorkTypeChange} type='radio' value="حكومه" checked={workType === 'حكومه'} className="form-check-input mt-4" id="validationFormCheck9" name="worktype"/>


                      </div>
                      <div className='col-4 mt-2'>
                        <input onChange={handleDigits} value={tempData.tradeofficenumber} type='text' className='inp col-8' id='tradeofficenumber' />
                         <label htmlFor='tradeofficenumber' className='form-check-label mt-4 ms-2 ' > رقم السجل</label>
                           </div>

                      <div className='col-8 mt-2'>
                        <input onChange={handleArabicAndDigitsInput} value={tempData.tradeoffice} type='text' className='inp col-8' id='tradeoffice' />
                         <label htmlFor='tradeoffice' className='form-check-label mt-4 ms-2 ' >  مكتب السجل التجاري</label>
                           </div>
                           <div className="col-12 text-center mt-3 p-3">
                <input type="submit" value="تقديم الطلب" className="btn loginButton mt-3 mb-3 "/>
                 </div>
                  </div>
                  
                  
            </form>
           </div>
        </div>
    );
}

export default NationalIDForm;