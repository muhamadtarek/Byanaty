import React from 'react';

const MarriageForm = () => {
    const [name, setName] = React.useState('');

    const handleChange = (event) => {
        setName(event.target.value);
    };
    
    const handleSubmit = (e) => {
      e.preventDefault();
    };

 
    return (
        <div className='flex d-flex justify-content-center align-items-center sec-2  pt-5'>
           <div className='container bg-white mt-5 p-4'>
           <form onSubmit={handleSubmit}>
                  <div className='row'>
                   <div className=' col-6 mt-2'>
                    <label htmlFor='firstName'>
اسم الزوجه                    </label>
                    <input onChange={handleChange} type="text" className="form-control" id="firstName" />
                   </div>
                   <div className='form-group col-6 mt-2'>
                    <label htmlFor='dadName'>
الرقم القومي للزوجه                   </label>
                    <input onChange={handleChange} type="number" className="form-control" id="dadName" placeholder=""/>   
                   </div>
                   <div className='col-2 mt-2'>
                     <label htmlFor='birthdaydate'>
اسم الزوج                    </label>
                     <input onChange={handleChange} type='date' className='form-control' id='birthdaydate' />
                   </div>
                   <div className='col-4 mt-2'>

                   </div>
                   <div className='form-group  col-6 mt-2'>
                    <label htmlFor='momName'>
الرقم القومي للزوج                 </label>
                    <input onChange={handleChange} type="text" className="form-control" id="momName" placeholder="  "/>   
                   </div>
                   <div className='form-group  col-4 mt-2'>
                    <label htmlFor='city'>
محل اقامه الزوجه                </label>
                    <input onChange={handleChange} type="text" className="form-control" id="city" placeholder=" "/>   
                   </div>
                   <div className='form-group  col-4 mt-2'>
                    <label htmlFor='city'>
محل اقامه الزوج               </label>
                    <input onChange={handleChange} type="text" className="form-control" id="city" placeholder=" "/>   
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
                     <label htmlFor='birthdaydate'>
اسم المأذون                 </label>
                     <input onChange={handleChange} type='date' className='form-control' id='birthdaydate' />
                   </div>
                   <div className='form-group  col-6 mt-2'>
                    <label htmlFor='momName'>
الرقم القومي للمأذون             </label>
                    <input onChange={handleChange} type="text" className="form-control" id="momName" placeholder="  "/>   
                   </div>
                  </div>
                  
                  <input type="submit" value="Submit" className="btn loginButton mt-3 mb-3 "/>
            </form>
           </div>
        </div>
    );
}

export default MarriageForm;