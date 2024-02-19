import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';

const NationalIDForm = () => {
    const { authTokens } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        firstName: '',
        dadName: '',
        socialStatus: 'أعزب',
        birthdaydate: '2000-01-01',
        momName: '',
        city: '',
        city2: '',
        city3: '',
        religion: 'مسلم',
        gender: 'ذكر',
        idCard: 44444444444444,
        street: '',
        buildingNumber: 0,
        group: '',
        phone: 0,
        appartment: 0,
        floor: '',
        work: 'يعمل',
        workyear: 0,
        job: '',
        waywork: 'أخري',
        workPlace: '',
        tradeofficeNum: 0,
        tradeoffice: ''
    });
    // const [selectedOption, setSelectedOption] = useState('أعزب');

    // const handleRadioChange = (event) => {
    //     const { name, value } = event.target;
    //     setSelectedOption(value);
    //     setFormData({ ...formData, [name]: value });
    // };

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Form data:', formData);
        try {
            const response = await fetch('http://127.0.0.1:8000/api/documents/national_id/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${authTokens.access}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Handle success
                alert('Form submitted successfully');
            } else {
                // Handle errors
                alert('Form submitted successfully');
            }
        } catch (error) {
            alert('Error submitting form:', error);
        }
    };

    return (
        <div className='flex d-flex justify-content-center align-items-center sec-2  pt-5'>
           <div className='container bg-white mt-5 p-4'>
           <form onSubmit={handleSubmit}>
                  <div className='row'>
                   <div className=' col-6 mt-2'>
                    <label htmlFor='firstName'>
                         الاسم الاول
                    </label>
                    <input onChange={handleChange} type="text" className="form-control" id="firstName" />
                   </div>
                   <div className='form-group col-6 mt-2'>
                    <label htmlFor='dadName'>
                        اسم الاب بالكامل
                    </label>
                    <input onChange={handleChange} type="text" className="form-control" id="dadName" placeholder=""/>   
                   </div>
                   <div className='col-2 mt-2'>
                     <label htmlFor='birthdaydate'>
                        تاريخ الميلاد
                     </label>
                     <input onChange={handleChange} type='date' className='form-control' id='birthdaydate' />
                   </div>
                   <div className='col-4 mt-2'>

                   </div>
                   <div className='form-group  col-6 mt-2'>
                    <label htmlFor='momName'>
اسم الام                    </label>
                    <input onChange={handleChange} type="text" className="form-control" id="momName" placeholder="  "/>   
                   </div>
                   <div className='form-group  col-4 mt-2'>
                    <label htmlFor='city'>
المحافظة                   </label>
                    <input onChange={handleChange} type="text" className="form-control" id="city" placeholder=" "/>   
                   </div><div className='form-group  col-4 mt-2'>
                    <label htmlFor='city2'>
                        قسم
                     </label>
                    <input onChange={handleChange} type="text" className="form-control" id="city2" placeholder="  "/>   
                   </div><div className='form-group  col-4 mt-2'>
                    <label htmlFor='city3'>
                        قرية
                     </label>
                    <input onChange={handleChange} type="text" className="form-control" id="city3" placeholder="  "/>   
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
                      <div className='col-8 mt-2'>
                         <input type='radio' className="form-check-input col-3 mt-4" id="validationFormCheck2" name="socialStatus" />
                         <label htmlFor='validationFormCheck2' className='form-check-label col-3 mt-4 ms-2'> اعزب</label>
                         <input type='radio' className="form-check-input col-3 mt-4" id="validationFormCheck3" name="socialStatus" />
                         <label htmlFor='validationFormCheck3' className='form-check-label col-3 mt-4 ms-2'> متزوج</label>
                         <input type='radio' className="form-check-input col-3 mt-4" id="validationFormCheck4" name="socialStatus" />
                         <label htmlFor='validationFormCheck4' className='form-check-label col-3 mt-4 ms-2' > مطلق</label>
                         <input type='radio' className="form-check-input col-3 mt-4" id="validationFormCheck5" name="socialStatus" />
                         <label htmlFor='validationFormCheck5' className='form-check-label mt-4 ms-2 '> ارمل</label>
                      </div>

<div className='col-12 mt-2'>
<label htmlFor='idCard'>
                         الرقم القومي
                    </label>
                    <input onChange={handleChange} type="number" className="form-control" id="idCard" />
</div>

<div className='col-9 mt-2'>
    <input onChange={handleChange} type='text' className='inp col-10' id='street' />
    <label htmlFor='street' className='form-check-label mt-4 ms-2' > الشارع</label>
</div>
<div className='col-3 mt-2'>
    <input onChange={handleChange} type='number' className='inp col-8' id='buildingNumber' />
    <label htmlFor='buildingNumber' className='form-check-label mt-4 ms-2' > رقم العقار</label>
</div>

<div className='col-3 mt-2'>
    <input onChange={handleChange} type='text' className='inp col-6' id='group' />
    <label htmlFor='group' className='form-check-label mt-4 ms-2' > تجمع سكني</label>
</div>

<div className='col-3 mt-2'>
    <input onChange={handleChange} type='number' className='inp col-8' id='phone' />
    <label htmlFor='phone' className='form-check-label mt-4 ms-2' > التليفون</label>
</div>
<div className='col-3 mt-2'>
    <input onChange={handleChange} type='number' className='inp col-8' id='appartment' />
    <label htmlFor='appartment' className='form-check-label mt-4 ms-2' > شقة</label>
</div>
<div className='col-3 mt-2'>
    <input onChange={handleChange} type='text' className='inp col-8' id='floor' />
    <label htmlFor='floor' className='form-check-label mt-4 ms-2' > دور</label>
</div>
<div className='col-12 mt-2'>

 <input type='radio' className="form-check-input  mt-4 col-6" id="work" name="working"/>
                         <label htmlFor='work' className='form-check-label  mt-4 ms-2'> يعمل </label>
                         <input type='radio' className="form-check-input m-3 mt-4" id="notworking" name="working"/>
                         <label htmlFor='notworking' className='form-check-label  mt-4 '> لا يعمل </label>
</div>
<div className='col-4 mt-2'>
    <input onChange={handleChange} type='number' className='inp col-6' id='workyear' />
    <label htmlFor='workyear' className='form-check-label mt-4 ms-2' > سنه شغل الوظيفة</label>
</div>
<div className='col-8 mt-2'>
    <input onChange={handleChange} type='text' className='inp col-10' id='job' />
    <label htmlFor='job' className='form-check-label mt-4 ms-2' > الوظيفة</label>
</div>
<div className='col-12 mt-2'>
    <input onChange={handleChange} type='text' className='inp col-11' id='waywork' />
    <label htmlFor='waywork' className='form-check-label mt-4 ms-2 ' > جهه العمل</label>
</div>
<div className='col-12 mt-2'>
                         <input type='radio' className="form-check-input  mt-4" id="validationFormCheck10" name="workPlace"/>
                         <label htmlFor='validationFormCheck10' className='form-check-label col-2 mt-4 ms-2'> اخري</label>
                         <input type='radio' className="form-check-input  mt-4" id="validationFormCheck6" name="workPlace"/>
                         <label htmlFor='validationFormCheck6' className='form-check-label col-2 mt-4 ms-2'> قطاع خاص</label>
                         <input type='radio' className="form-check-input  mt-4" id="validationFormCheck7" name="workPlace"/>
                         <label htmlFor='validationFormCheck7' className='form-check-label col-2 mt-4 ms-2'> قطاع اعمال</label>
                         <input type='radio' className="form-check-input  mt-4" id="validationFormCheck8" name="workPlace"/>
                         <label htmlFor='validationFormCheck8' className='form-check-label col-2 mt-4 ms-2' > قطاع عام</label>
                         <input type='radio' className="form-check-input  mt-4" id="validationFormCheck9" name="workPlace"/>
                         <label htmlFor='validationFormCheck9' className='form-check-label mt-4 ms-2 col-2'> حكومه</label>
                      </div>
                      <div className='col-4 mt-2'>
                        <input onChange={handleChange} type='number' className='inp col-8' id='tradeofficeNum' />
                         <label htmlFor='tradeofficeNum' className='form-check-label mt-4 ms-2 ' > رقم السجل</label>
                           </div>

                      <div className='col-8 mt-2'>
                        <input onChange={handleChange} type='text' className='inp col-8' id='tradeoffice' />
                         <label htmlFor='tradeoffice' className='form-check-label mt-4 ms-2 ' >  مكتب السجل التجاري</label>
                           </div>
                           <div className="col-12 text-center mt-3 p-3">
                <input type="submit" value="Submit" className="btn loginButton mt-3 mb-3 "/>
                 </div>
                  </div>
                  
                  
            </form>
           </div>
        </div>
    );
}

export default NationalIDForm;