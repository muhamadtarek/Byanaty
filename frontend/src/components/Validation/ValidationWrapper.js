import { useState, useRef, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FaceValidation from './FaceValidation';
import BlinkDetection from './BlinkDetection';
import AuthContext from '../../context/AuthContext';
import './Face.css';

const ValidationWrapper = () => {
    const { registerUserAfterValidate } = useContext(AuthContext);
    const [cardImgData, setCardImgData] = useState(null);
    const [faceValidated, setFaceValidated] = useState(false);
    const [ocrPerformed, setOcrPerformed] = useState(false);
    const [idVerified, setIdVerified] = useState(false);
    const [cardFileName, setCardFileName] = useState('لم يتم اختيار ملف');
    const [faceImgData, setFaceImgData] = useState(null);
    const [frames, setFrames] = useState([]);
    const [message, setMessage] = useState('');
    const [showBlinkInstruction, setShowBlinkInstruction] = useState(false);
    const [blinkInstructionComplete, setBlinkInstructionComplete] = useState(false);
    const [blinkDetected, setBlinkDetected] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { state: { payload } } = location;
    const webcamRef = useRef(null);

    const startBlinkInstruction = () => {
        setShowBlinkInstruction(true);
    };

    const handleBlinkInstructionClose = () => {
        setShowBlinkInstruction(false);
        setBlinkInstructionComplete(blinkDetected);
    };

    const eraseAllFrames = () => {
        setFrames([]);
    };

    const handleValidation = async () => {
        try {
            setMessage('');

            // First request to fakeid endpoint
            const idVerificationResponse = await fetch('http://127.0.0.1:8000/api/id_verification/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cardimg: cardImgData }),
            });

            let idVerificationData = await idVerificationResponse.json();

            if (idVerificationData.error) {
                setMessage(idVerificationData.error);
                return;
            }

            if (!idVerificationData.passed) {
                setMessage("تعذر التحقق من الهوية. يرجى إعادة تحميل صورة صالحة للجزء الأمامي من بطاقة الهوية.");
                return;
            }
            setIdVerified(true);

            // Second request to facevalidation endpoint
            const faceValidationResponse = await fetch('http://127.0.0.1:8000/api/face_validation/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cardimg: cardImgData,
                    faceimg: faceImgData,
                }),
            });

            let faceValidationData = await faceValidationResponse.json();

            if (faceValidationData.error) {
                setMessage(faceValidationData.error);
                return;
            }

            if (!faceValidationData.card_face_detected) {
                setMessage('لم يتم اكتشاف وجه في صورة البطاقة. يرجى التقاط صورة أكثر وضوحًا في ظروف إضاءة أفضل.');
                return;
            }

            if (faceValidationData.multiple_faces_detected_card) {
                setMessage('تم اكتشاف وجوه متعددة في صورة البطاقة. يرجى تحميل صورة تحتوي على وجه واحد فقط.');
                return;
            }

            if (!faceValidationData.live_face_detected) {
                setMessage('لم يتم اكتشاف وجه من صورة الكاميرا الحية. يرجى التقاط صورة أكثر وضوحًا في ظروف إضاءة أفضل.');
                return;
            }

            if (faceValidationData.multiple_faces_detected_live) {
                setMessage('تم اكتشاف وجوه متعددة في صورة الكاميرا الحية. يرجى التقاط صورة تحتوي على وجه واحد فقط.');
                return;
            }

            if (!faceValidationData.faces_match) {
                setMessage('لم يتم التحقق. الصور ليست لنفس الشخص.');
                return;
            }

            setFaceValidated(true);

            // Third request to ocr-id endpoint
            let ocrResponse = await fetch('http://127.0.0.1:8000/api/ocr_id/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    cardimg: cardImgData,
                    username: payload.username,
                    serial_number: payload.serialnumber.slice(2)
                }),
            });

            let ocrData = await ocrResponse.json();

            if (ocrData.error) {
                setMessage(ocrData.error);
                return;
            }

            if (!ocrData.id_number) {
                setMessage('لم يتم اكتشاف رقم الهوية الوطنية. يرجى التقاط صورة أكثر وضوحًا في ظروف إضاءة أفضل.');
                return;
            }

            if (!ocrData.serial_number) {
                setMessage('لم يتم اكتشاف رقم التسلسلي. يرجى التقاط صورة أكثر وضوحًا في ظروف إضاءة أفضل.');
                return;
            }

            if (ocrData.id_number !== payload.username) {
                setMessage('رقم الهوية الوطنية لا يتطابق مع الرقم الموجود في النظام. يرجى تحديث الرقم الصحيح.');
                return;
            }

            if (ocrData.serial_number !== payload.serialnumber.slice(2)) {
                setMessage('رقم التسلسلي لا يتطابق مع الرقم الموجود في النظام. يرجى تحديث الرقم الصحيح.');
                return;
            }

            setOcrPerformed(true);
            setMessage('تم التحقق بنجاح!');

            if(faceValidated && ocrPerformed && idVerified){
                // Redirect to the registration page
                registerUserAfterValidate(payload);
                navigate('/login');
            }
        } catch (error) {
            console.error('Error during validation:', error);
            setMessage('حدث خطأ أثناء عملية التحقق. يرجى المحاولة مرة أخرى.');
        }
    };

    return (
        <div className="form-container">
            <FaceValidation
                cardFileName={cardFileName}
                faceImgData = {faceImgData}
                setCardImgData={setCardImgData}
                setCardFileName={setCardFileName}
                setFaceImgData={setFaceImgData}
                setFrames={setFrames}
                webcamRef={webcamRef}
                startBlinkInstruction={startBlinkInstruction}
                eraseAllFrames={eraseAllFrames}
            />
            <button className="submit-button" onClick={startBlinkInstruction}>ابدأ تعليمات الوميض</button>
            {showBlinkInstruction && (
                <div>
                    <BlinkDetection setBlinkDetected={setBlinkDetected} />
                    <div className="blink-instruction">
                        <p>يرجى اغلاق احدي عينيك او كلاهما لمدة ثانية</p>
                        {blinkDetected && <p>تم كشف الوميض</p>}
                        <p>رجاء ضغط الزر أدناه اذا ظهرت لك رسالة تقول &quot;تم كشف الوميض&quot; </p>
                        <button onClick={handleBlinkInstructionClose}>اغلق التعليمات</button>
                    </div>
                </div>
            )}
            <p>انقر على الزر أدناه إذا قمت بتحميل صورة وجه بطاقتك الشخصية، وأكملت كشف الوميض، والتقطت صورة لوجهك من خلال الكاميرا الحية في التطبيق</p>
            <button className="submit-button" onClick={handleValidation}>اتمام التحقق</button>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default ValidationWrapper;
