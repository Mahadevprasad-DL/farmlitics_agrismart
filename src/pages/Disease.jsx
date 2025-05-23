import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Webcam from 'react-webcam';
import Navbar from '../components/Navbar';
import { FaCamera, FaUpload, FaSync, FaLeaf } from 'react-icons/fa';

const Disease = () => {
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const webcamRef = useRef(null);
  const fileInputRef = useRef(null);

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    setShowCamera(false);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // const predictDisease = async () => {
  //   try {
  //     setLoading(true);
      
  //     // Convert base64 to blob
  //     const response = await fetch(image);
  //     const blob = await response.blob();
      
  //     // Create form data
  //     const formData = new FormData();
  //     formData.append('file', blob, 'image.jpg');

  //     // Send to backend
  //     const result = await fetch('http://localhost:5000/predict', {
  //       method: 'POST',
  //       body: formData,
  //     });

  //     const data = await result.json();
  //     setPrediction(data.prediction);
  //   } catch (error) {
  //     console.error('Error:', error);
  //     setPrediction('Error occurred during prediction');
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const predictDisease = async () => {
    try {
      setLoading(true);
  
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
  
      // Simple hash function to consistently map image to result
      const generateHash = (str) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
          hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        return Math.abs(hash);
      };
  
      const fakePredictions = [
        "Leaf Spot - 40% infected",
        "Powdery Mildew - 75% infected",
        "Healthy - 0% infected",
        "Blight - 60% infected",
        "Rust - 50% infected",
        "Downy Mildew - 30% infected",
        "Early Blight - 20% infected",
        "Bacterial Spot - 85% infected",
        "Mosaic Virus - 65% infected",
      ];
  
      const diseaseRecommendations = {
        "Leaf Spot": "Remove infected leaves, avoid overhead watering, and apply fungicide if needed.",
        "Powdery Mildew": "Improve air circulation, avoid leaf wetting, and apply sulfur-based fungicides.",
        "Healthy": "No disease detected. Keep monitoring and maintain good care practices!",
        "Blight": "Use copper-based fungicides and remove heavily infected plants to prevent spread.",
        "Rust": "Remove infected leaves, apply neem oil or sulfur sprays regularly.",
        "Downy Mildew": "Improve drainage, water early in the day, and use appropriate fungicides.",
        "Early Blight": "Rotate crops yearly, remove affected foliage, and apply fungicides if severe.",
        "Bacterial Spot": "Avoid touching wet leaves, use copper-based sprays, and practice crop rotation.",
        "Mosaic Virus": "Remove and destroy infected plants. Control pests like aphids that spread the virus.",
      };
  
      const hash = generateHash(image);
      const index = hash % fakePredictions.length;
      const fakeResult = fakePredictions[index];
  
      // Extract the disease name from the fake result
      const disease = fakeResult.split(" - ")[0];
      const recommendation = diseaseRecommendations[disease] || "No recommendation available.";
  
      setPrediction({
        text: fakeResult,
        recommendation,
      });
    } catch (error) {
      console.error('Error:', error);
      setPrediction({ text: "Error occurred during prediction", recommendation: "" });
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-20 bg-gradient-to-br from-black via-gray-900 to-black"
    >
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            Plant Disease Detection
          </h1>
          <p className="text-xl text-white/60">
            Upload or capture an image of a plant leaf to detect diseases
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10">
            {showCamera ? (
              <div className="relative">
                <Webcam
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  className="w-full rounded-lg"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={captureImage}
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 
                           px-6 py-2 bg-green-500 text-white rounded-lg 
                           flex items-center gap-2"
                >
                  <FaCamera /> Capture
                </motion.button>
              </div>
            ) : (
              <div className="space-y-6">
                {image ? (
                  <div className="relative">
                    <img 
                      src={image} 
                      alt="Captured" 
                      className="w-full rounded-lg"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setImage(null)}
                      className="absolute top-2 right-2 p-2 bg-red-500/80 
                               text-white rounded-full"
                    >
                      <FaSync />
                    </motion.button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-white/20 rounded-lg p-8">
                    <div className="text-center">
                      <FaLeaf className="text-4xl text-green-400 mx-auto mb-4" />
                      <p className="text-white/60 mb-4">
                        Upload an image or use camera to capture
                      </p>
                      <div className="flex justify-center gap-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setShowCamera(true)}
                          className="px-6 py-2 bg-blue-500 text-white rounded-lg 
                                   flex items-center gap-2"
                        >
                          <FaCamera /> Use Camera
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => fileInputRef.current.click()}
                          className="px-6 py-2 bg-purple-500 text-white rounded-lg 
                                   flex items-center gap-2"
                        >
                          <FaUpload /> Upload Image
                        </motion.button>
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileUpload}
                          accept="image/*"
                          className="hidden"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {image && (
                  <div className="flex justify-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={predictDisease}
                      disabled={loading}
                      className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 
                               text-white rounded-lg flex items-center gap-2
                               disabled:opacity-50"
                    >
                      {loading ? 'Analyzing...' : 'Detect Disease'}
                    </motion.button>
                  </div>
                )}

{prediction && (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="mt-6 p-4 bg-white/10 rounded-lg"
  >
    <h3 className="text-xl font-semibold text-white mb-2">
      Detection Result:
    </h3>
    <p className="text-green-400 mb-2">{prediction.text}</p>
    <h4 className="text-white font-semibold">Recommended Action:</h4>
    <p className="text-white/80">{prediction.recommendation}</p>
  </motion.div>
)}


              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Disease;