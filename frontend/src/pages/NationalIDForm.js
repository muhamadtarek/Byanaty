import React from 'react';

const NationalIDForm = () => {
    const [name, setName] = React.useState('');

    const handleChange = (event) => {
        setName(event.target.value);
    };

    return (
        <form style={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center' }}>
            <label htmlFor="arabicName" style={{ marginLeft: '10px' }}>الاسم</label>
            <input
                type="text"
                id="arabicName"
                name="arabicName"
                value={name}
                onChange={handleChange}
                placeholder="أدخل اسمك هنا"
                pattern="[\u0600-\u06FF]+"
            />
        </form>
    );
}

export default NationalIDForm;