// import React, { useState } from 'react';
// import axios from 'axios';
// import * as tf from '@tensorflow/tfjs';

// const App = () => {
//   const [image, setImage] = useState(null);
//   const [result, setResult] = useState('');

//   const takePicture = async () => {
//     const mediaDevices = navigator.mediaDevices;
//     if (mediaDevices && mediaDevices.getUserMedia) {
//       const stream = await mediaDevices.getUserMedia({ video: true });
//       const video = document.querySelector('video');
//       video.srcObject = stream;
//       video.play();
//     }
//   };

//   const uploadImage = (files) => {
//     const file = files[0];
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = async () => {
//       setImage(reader.result);
//       const img = new Image();
//       img.src = reader.result;
//       img.onload = async () => {
//         const tensor = tf.browser.fromPixels(img).resizeNearestNeighbor([224, 224]).toFloat();
//         const offset = tf.scalar(255);
//         const normalized = tensor.div(offset);
//         const batched = normalized.expandDims(0);
//         const formData = new FormData();
//         formData.append('image', batched.arraySync());
//         const response = await axios.post('http://localhost:5000/predict', formData);
//         setResult(response.data);
//       };
//     };
//   };

//   const predict = async () => {
//     setResult('Predicting...');
//     const img = new Image();
//     img.src = image;
//     img.onload = async () => {
//       const tensor = tf.browser.fromPixels(img).resizeNearestNeighbor([224, 224]).toFloat();
//       const offset = tf.scalar(255);
//       const normalized = tensor.div(offset);
//       const batched = normalized.expandDims(0);
//       const formData = new FormData();
//       formData.append('image', batched.arraySync());
//       const response = await axios.post('http://localhost:5000/predict', formData);
//       setResult(response.data);
//     };
//   };

//   return (
//     <div>
//       <h1>Image Classification Web App</h1>
//       <div>
//         <h3>Take a Picture</h3>
//         <video autoPlay={true}></video>
//         <button onClick={takePicture}>Capture</button>
//       </div>
//       <div>
//         <h3>Upload an Image</h3>
//         <input type="file" accept="image/*" onChange={(e) => uploadImage(e.target.files)} />
//       </div>
//       <div>
//         <h3>Predict</h3>
//         {image && <img src={image} alt="Selected" width="200" height="200" />}
//         <button onClick={predict}>Predict</button>
//         <p>{result}</p>
//       </div>
//     </div>
//   );
// };

// export default App;


// import React, { useState } from 'react';
// import axios from 'axios';
// import * as tf from '@tensorflow/tfjs';

// import './App.css';

// const App = () => {
//   const [image, setImage] = useState(null);
//   const [result, setResult] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);

//   const takePicture = async () => {
//     const mediaDevices = navigator.mediaDevices;
//     if (mediaDevices && mediaDevices.getUserMedia) {
//       const stream = await mediaDevices.getUserMedia({ video: true });
//       const video = document.querySelector('video');
//       video.srcObject = stream;
//       video.play();
//     }
//   };

//   const uploadImage = (files) => {
//     const file = files[0];
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = async () => {
//       setImage(reader.result);
//       const img = new Image();
//       img.src = reader.result;
//       img.onload = async () => {
//         const tensor = tf.browser.fromPixels(img).resizeNearestNeighbor([224, 224]).toFloat();
//         const offset = tf.scalar(255);
//         const normalized = tensor.div(offset);
//         const batched = normalized.expandDims(0);
//         const formData = new FormData();
//         formData.append('file', batched.arraySync());
//         const response = await axios.post('http://localhost:5000/predict', formData);
//         setResult(response.data);
//       };
//     };
//   };

//   const predict = async () => {
//     setLoading(true);
//     setError(false);
//     setResult(null);

//     setResult('Predicting...');
//     const img = new Image();
//     img.src = image;
//     img.onload = async () => {
//       const tensor = tf.browser.fromPixels(img).resizeNearestNeighbor([224, 224]).toFloat();
//       const offset = tf.scalar(255);
//       const normalized = tensor.div(offset);
//       const batched = normalized.expandDims(0);
//       const formData = new FormData();
//       formData.append("file", image)

//       try {
//         const response = await axios.post("http://localhost:5000/predict", formData, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         });
//         setResult(response.data.result);
//       } catch (error) {
//         setError(true);
//       }
  
//       setLoading(false);


      
//       // formData.append('image', batched.arraySync());
//       // const response = await axios.post('http://localhost:5000/predict', formData);
//       // setResult(response.data);
//     };
//   };

//   return (
//     <div className="App">
//       <h1 className="App-title">Image Classification Web App</h1>
//       <div className="App-section">
//         <h2>Take a Picture</h2>
//         <div className="App-camera">
//           <video autoPlay={true}></video>
//           <button className="App-button" onClick={takePicture}>Capture</button>
//         </div>
//       </div>
//       <div className="App-section">
//         <h2>Upload an Image</h2>
//         <div className="App-file">
//           <input type="file" accept="image/*" onChange={(e) => uploadImage(e.target.files)} />
//         </div>
//       </div>
//       <div className="App-section">
//         <h2>Predict</h2>
//         {image && <img src={image} alt="Selected" width="200" height="200" />}
//         <button className="App-button" onClick={predict}>Predict</button>
//         <p className="App-result">{result}</p>
//       </div>
//     </div>
//   );
// };

// export default App;


// import React, { useState } from "react";
// import axios from "axios";
// import "./App.css";

// function App() {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const [result, setResult] = useState(null);
//   const [imageFile, setImageFile] = useState(null);

//   async function handlePredict() {
//     setLoading(true);
//     setError(false);
//     setResult(null);

//     const formData = new FormData();
//     formData.append("file", imageFile);

//     try {
//       const response = await axios.post("http://localhost:5000/predict", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       setResult(response.data.result);
//     } catch (error) {
//       setError(true);
//     }

//     setLoading(false);
//   }

//   function handleFileUpload(event) {
//     const file = event.target.files[0];
//     setImageFile(file);
//   }

//   return (
//     <div className="App">
//       <h1>Image Classifier</h1>
//       <div className="Upload">
//         <input type="file" onChange={handleFileUpload} />
//         <button onClick={handlePredict}>Predict</button>
//       </div>
//       {loading && <p>Loading...</p>}
//       {error && <p>Error occurred.</p>}
//       {result && (
//         <div className="Result">
//           <img src={URL.createObjectURL(imageFile)} alt="uploaded" />
//           <p>Predicted class: {result}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;




import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState("");

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleUploadClick = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  const handlePredict = async () => {
    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await axios.post("http://localhost:5000/predict", formData);
      console.log(response.data);
      setPrediction(response.data.prediction);
      console.log(response.data.prediction);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>Image Classification App</h1>
      <div>
        <input id="imageInput" type="file" onChange={handleImageChange} hidden />
        <button onClick={handleUploadClick}>Upload Image</button>
      </div>
      {image && (
        <div>
          <img src={URL.createObjectURL(image)} alt="Uploaded" />
          <button onClick={handlePredict}>Predict</button>
        </div>
      )}
      {prediction && <h2>Prediction: {prediction}</h2>}
    </div>
  );
};

export default App;












// import React, { useState } from "react";
// import axios from "axios";

// function App() {
//   const [file, setFile] = useState(null);
//   const [prediction, setPrediction] = useState("");

//   const handleFileInputChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handlePredict = () => {
//     const formData = new FormData();
//     formData.append("file", file);
//     axios
//       .post("http://localhost:5000/predict", formData)
//       .then((response) => {
//         //console.log(response.data.prediction);
//         console.log(response.data);
//         setPrediction(response.data.prediction);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   return (
//     <div>
//       <h1>Image Classifier</h1>
//       <input type="file" onChange={handleFileInputChange} />
//       <button onClick={handlePredict}>Predict</button>
//       {prediction && prediction !== "" ? (
//         <p>Predicted class: {prediction}</p>
//       ) : (
//         <p>No prediction yet</p>
//       )}
//     </div>
//   );
// }

// export default App;
