import React, { useState } from "react";

const MilitaryStatusForm = () => {
  const [name, setName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // Initialize selectedImage

  const handleChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => setSelectedImage(e.target.result);
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Image: ", selectedImage);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="photo-input-container">
        <label htmlFor="photoInput" className="custom-label">
          {selectedImage ? (
            <img src={selectedImage} alt="Selected" className="preview-image" />
          ) : (
            <div className="placeholder-text">اختر الصورة</div>
          )}
        </label>
        <input
          type="file"
          id="photoInput"
          accept="image/*"
          onChange={handleChange}
          className="hidden-input"
        />
      </div>
            <input type="submit" value="Submit" className="btn loginButton mt-3 mb-3 "/>
    </form>
  );
};

export default MilitaryStatusForm;