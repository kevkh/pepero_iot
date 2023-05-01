import React, { useState, useRef } from "react";
import axios from "axios";

const App = () => {
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [cameraError, setCameraError] = useState(false);
  const videoRef = useRef(null);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  // Upload images from desktop/files
  const handleUploadClick = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  // Enable webcam preview for taking pic
  const handleCameraClick = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setCameraError(false);
    } catch (error) {
      console.error(error);
      setCameraError(true);
    }
  };

  // Capture the pic from webcam
  const handleCaptureClick = () => {
    if (!videoRef.current.srcObject) {
      setCameraError(true);
      return;
    }
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const context = canvas.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      setImage(blob);
    }, "image/jpeg", 0.5);
    videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
  };

  const handlePredict = async () => {
    const formData = new FormData();
    formData.append("file", image);

    try {
      // const response = await axios.post("http://localhost:5000/predict", formData);
      const response = await axios.post("http://192.168.18.25:5000/predict", formData);
      console.log(response.data);
      setPrediction(response.data.prediction);
      console.log(response.data.prediction);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>Pepero Image Classification App</h1>
      <div>
        <input id="imageInput" type="file" onChange={handleImageChange} hidden />
        <button onClick={handleUploadClick}>Upload Image</button>
        <button onClick={handleCameraClick}>Take Picture</button>
        <button onClick={handleCaptureClick}>Capture</button>
      </div>
      <div>
        {image ? (
          <div>
            <img src={URL.createObjectURL(image)} alt="Uploaded" style={{ width: "400px", height: "400px" }} />
            <br></br>
            <button onClick={handlePredict}>Predict</button>
          </div>
        ) : (
          <div>
            <video ref={videoRef} style={{ width: "65%" }} autoPlay playsInline></video>
            {cameraError && <p>Error: Unable to access camera.</p>}
          </div>
        )}
      </div>
      {prediction && <h2>Prediction: {prediction}</h2>}
    </div>
  );
};

export default App;