import React from 'react';
import Webcam from 'react-webcam';
import PropTypes from 'prop-types';
import './Face.css';

const FaceValidation = ({
    setCardImgData,
    cardFileName,
    faceImgData,
    setCardFileName,
    setFaceImgData,
    setFrames,
    webcamRef,
    eraseAllFrames
}) => {
    const handleImageUpload = (type) => (event) => {
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.onloadend = () => {
            if (type === 'card') {
                setCardImgData(reader.result);
                setCardFileName(file.name || 'لم يتم اختيار ملف');
            }
        };
        reader.readAsDataURL(file);
    };

    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setFaceImgData(imageSrc);
        setFrames(prevFrames => {
            const newFrames = [...prevFrames, imageSrc];
            if (newFrames.length >= 10) {
                return newFrames.slice(1);
            }
            return newFrames;
        });
    }, [webcamRef, setFrames, setFaceImgData]);

    return (
        <div className="form-container">
            <div className="input-container">
                <label className="file-input-label">
                    تحميل صورة البطاقة
                    <input type="file" onChange={handleImageUpload('card')} />
                </label>
                <p className="file-name">{cardFileName}</p>
            </div>
            <div className="input-container">
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width="100%"
                />
                <button className="submit-button" onClick={capture}>التقاط صورة الوجه</button>
                {faceImgData && <img src={faceImgData} alt="Face Preview" />}
            </div>
            <button className="submit-button" onClick={eraseAllFrames}>Erase All Frames</button>
        </div>
    );
};

FaceValidation.propTypes = {
    setCardImgData: PropTypes.func.isRequired,
    cardFileName: PropTypes.string.isRequired,
    faceImgData: PropTypes.any, // Use specific type if possible
    setCardFileName: PropTypes.func.isRequired,
    setFaceImgData: PropTypes.func.isRequired,
    setFrames: PropTypes.func.isRequired,
    webcamRef: PropTypes.shape({
      current: PropTypes.any // Use specific type if possible, e.g., PropTypes.object if it's an object
    }).isRequired,
    eraseAllFrames: PropTypes.func.isRequired,
  };

export default FaceValidation;
