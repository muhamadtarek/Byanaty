import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Webcam from 'react-webcam';

const BlinkDetection = ({ setBlinkDetected }) => {
    const [error, setError] = useState(null);
    const webcamRef = useRef(null);
    const [intervalId, setIntervalId] = useState(null);

    useEffect(() => {
        startRealTimeBlinkDetection();
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, []);

    const startRealTimeBlinkDetection = () => {
        const id = setInterval(() => {
            captureFrameAndSend();
        }, 5000);
        setIntervalId(id);
    };

    const captureFrameAndSend = async () => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            if (imageSrc) {
                try {
                    const response = await fetch('http://127.0.0.1:8000/api/detect_blink_realtime/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ frames: [imageSrc.split(',')[1]] }),
                    });

                    const data = await response.json();
                    if (response.ok) {
                        setBlinkDetected(data.blink_detected);
                    } else {
                        setError(data.error || 'Unknown error occurred');
                    }
                } catch (error) {
                    console.error('Error sending frames for detection:', error);
                    setError('Error sending frames for detection');
                }
            } else {
                console.error('Unable to capture screenshot from webcam.');
                setError('Unable to capture screenshot from webcam.');
            }
        } else {
            console.error('Webcam not initialized.');
            setError('Webcam not initialized.');
        }
    };

    return (
        <div className="blink-detection-container">
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width="100%"
            />
            {error && <p>Error: {error}</p>}
        </div>
    );
};

BlinkDetection.propTypes = {
    setBlinkDetected: PropTypes.func.isRequired,
};

export default BlinkDetection;