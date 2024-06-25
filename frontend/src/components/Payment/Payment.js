import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
    const { authTokens } = useContext(AuthContext);
    const [objectID, setObjectID] = useState('');
    const navigate = useNavigate(); 
    const [username, setUsername] = useState('')
    const [orderDetails, setOrderDetails] = useState({
        deliverymethod: '',
        deliveryaddress: '',
        paymethod: 'cash',
        parties: 1,
        fees: 200,
        partyAddresses: [{ address: '' }]
    });
    const [documentType, setDocumentType] = useState(null);

    // Mapping document types to Arabic values
    const documentTypeMap = {
        'national_id': 'البطاقة الشخصية',
        'birth_certificate': 'شهادة ميلاد',
        'marriage_certificate': 'شهادة زواج',
        'military_status': 'حالة العسكرية',
        'divorce_certificate': 'شهادة الطلاق',
        'death_certificate': 'شهادة الوفاة',
    };

    // Retrieve the document type when the component mounts
    useEffect(() => {
        let params = new URLSearchParams(window.location.search);
        let docType = params.get('documentType');
        let username = params.get('username')
        setDocumentType(docType);
        setUsername(username)
    }, []);

    const handleChange = (e, index = null) => {
        const { name, value } = e.target;
        if (name === 'parties') {
            const num = parseInt(value);
            const partyAddresses = Array.from({ length: num }, () => ({ address: '' }));
            setOrderDetails({
                ...orderDetails,
                parties: num,
                addresses: partyAddresses
            });
        } else if (index !== null) {
            const newPartyAddresses = [...orderDetails.partyAddresses];
            newPartyAddresses[index].address = value;
            setOrderDetails({ ...orderDetails, adresses: newPartyAddresses });
        } else {
            setOrderDetails({ ...orderDetails, [name]: value });
        }
    };

    const handlePayment = async () => {
        if(orderDetails.deliverymethod === ''){
            alert('يرجى ملء كل البيانات المطلوبة');
            return;
        }
        if (orderDetails.deliverymethod == 'delivery' && orderDetails.parties == 1 && orderDetails.deliveryaddress ==''){
            alert('يرجى إدخال عنوان التسليم');
            return;
        } else if(orderDetails.deliverymethod == 'delivery' && orderDetails.parties == 2 && orderDetails.partyAddresses.some(partyAddress => partyAddress.address === '')){
            alert('يرجى إدخال جميع العناوين');
            return;
        }
        try {
            const formData = JSON.parse(localStorage.getItem('formData'));
            const response = await fetch(`http://127.0.0.1:8000/api/documents/${documentType}/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${authTokens.access}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    formData: formData,
                    username: username
                })
            });
    
            if (response.ok) {
                const responseData = await response.json();
                // Instead of setting the state and waiting for it to update, use responseData directly
                const objectID = responseData; // Assuming responseData contains an objectID field
                console.log('response: ', responseData);
                alert('تم إرسال الطلب بنجاح');
    
                const orderDataResponse = await fetch(`http://127.0.0.1:8000/api/order/`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${authTokens.access}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        orderDetails: orderDetails,
                        objectId: objectID,
                        username: username,
                        documentType: documentType
                    })
                });
    
                if (!orderDataResponse.ok) {
                    alert('لم يتم إرسال الطلب بنجاح');
                    return;
                }
    
                alert('تم تقديم الطلب بنجاح');
                localStorage.removeItem('formData');
                navigate('/');
            } else {
                alert('لم يتم إرسال الطلب بنجاح');
            }
        } catch (error) {
            alert('خطأ في إرسال الطلب');
        }
    };

    return (
        <div style={styles.container}>
            <h2>تفاصيل الطلب</h2>
            <div style={styles.orderDetails}>
                <p><strong>نوع المستند:</strong> {documentTypeMap[documentType]}</p>
                <p><strong>المبلغ الإجمالي:</strong> 200 جنيه</p>
                <p><strong>طريقة الدفع:</strong> الدفع عند الاستلام</p>

                <label>
                    <strong>طريقة التسليم:</strong>
                    <select name="deliverymethod" value={orderDetails.deliverymethod} onChange={handleChange} style={styles.select}>
                        <option value="">اختر طريقة التسليم</option>
                        <option value="delivery">التوصيل</option>
                        <option value="pickup">الاستلام من الفرع</option>
                    </select>
                </label>
                {orderDetails.deliverymethod === 'delivery' && orderDetails.parties === 1 && (
                    <label>
                        <strong>عنوان التسليم:</strong>
                        <input
                            type="text"
                            name="deliveryaddress"
                            value={orderDetails.deliveryaddress}
                            onChange={handleChange}
                            style={styles.input}
                        />
                    </label>
                )}
                <label>
                    <strong>:عدد الأطراف</strong>
                    <select
                        name="parties"
                        value={orderDetails.parties}
                        onChange={handleChange}
                        style={styles.select}
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                </label>
                {orderDetails.deliverymethod === 'delivery' && orderDetails.parties === 2 && orderDetails.partyAddresses.map((_, index) => (
                    <label key={index}>
                        <strong>عنوان الطرف {index + 1}</strong>
                        <input
                            type="text"
                            name={`party${index}Address`}
                            value={orderDetails.partyAddresses[index].address}
                            onChange={(e) => handleChange(e, index)}
                            style={styles.input}
                        />
                    </label>
                ))}
            </div>
            <button style={styles.payButton} onClick={handlePayment}>إتمام الطلب</button>
        </div>
    );
};

export default Payment;

const styles = {
    container: {
        backgroundColor: '#ffffff', // White background
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
        maxWidth: '800px',
        margin: '20px auto',
        textAlign: 'center',
    },
    orderDetails: {
        backgroundColor: '#fff3cd', // Light orange background
        padding: '20px',
        borderRadius: '10px',
        marginBottom: '20px',
        textAlign: 'left'
    },
    payButton: {
        backgroundColor: '#ff9800', // Bright orange button
        color: '#fff',
        border: 'none',
        padding: '15px 30px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '18px',
    },
    input: {
        display: 'block',
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    select: {
        display: 'block',
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '5px',
        border: '1px solid #ccc',
    }
};
