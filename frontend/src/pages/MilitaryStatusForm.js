import React, { useState, useContext } from "react";
import AuthContext from '../context/AuthContext';

const MilitaryStatusForm = () => {
  const { username } = useContext(AuthContext);
  const [selectedImages, setSelectedImages] = useState([null, null, null]); // Initialize selectedImages with three null values

  const handleChange = (event, index) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImages = [...selectedImages];
        newImages[index] = e.target.result;
        setSelectedImages(newImages);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Check if all images are uploaded
    if (selectedImages.some(image => image === null)) {
      alert('رجاء ملئ كل البيانات المطلوبة بما في ذلك تحميل جميع الصور الثلاث');
      return;
    }

    // Convert formData to JSON and store it in local storage
    localStorage.setItem('selectedImages', JSON.stringify(selectedImages));

    // Define the document type
    let documentType = 'military_status';

    // Redirect the user to the payment page with the document type as a query parameter
    window.location.href = `/payment?username=${username}&documentType=${documentType}`;

  };

  const labels = [
    "صورة البطاقة الخلفية",
    "صورة اخر شهادة تعليمية",
    "صورة شهادة الميلاد"
  ];

  return (
    <form onSubmit={handleSubmit}>
      {[0, 1, 2].map((index) => (
        <div key={index} className="photo-input-container">
          <label htmlFor={`photoInput${index}`} className="custom-label">
            {selectedImages[index] ? (
              <img src={selectedImages[index]} alt="Selected" className="preview-image" />
            ) : (
              <div className="placeholder-text">{labels[index]}</div>
            )}
          </label>
          <input
            type="file"
            id={`photoInput${index}`}
            accept="image/*"
            onChange={(event) => handleChange(event, index)}
            className="hidden-input"
          />
        </div>
      ))}
      <input type="submit" value="تقديم الطلب" className="btn loginButton mt-3 mb-3" />
    </form>
  );
};

export default MilitaryStatusForm;