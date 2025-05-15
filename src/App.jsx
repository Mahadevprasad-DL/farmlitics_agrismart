import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Homepage from './pages/Homepage.jsx';
import About from './pages/About.jsx';
import Charts from './pages/Charts.jsx';
import DisasterAlerts from './pages/DisasterAlerts.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import Irrigation from './pages/Irrigation.jsx';
import Contact from './pages/Contact.jsx';
import CropSuggestion from './pages/CropSuggestion.jsx';
import CropsData from './pages/CropsData.jsx';
import Connect from './pages/Connect.jsx';
import WaterManagement from './pages/WaterConservation.jsx';
import Disease from './pages/Disease.jsx';

// Optional future routes
import Chatbot from './pages/Chatbot.jsx';
import Gallery from './pages/Gallery.jsx';
// import Header from './components/Header';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* <Header /> */}

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/charts" element={<Charts />} />
        <Route path="/disasteralerts" element={<DisasterAlerts />} />
        <Route path="/irrigation" element={<Irrigation />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cropsuggestion" element={<CropSuggestion />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/cropdata" element={<CropsData />} />
        <Route path="/expert" element={<Connect />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/watermanagement" element={<WaterManagement />} />
        <Route path="/disease-detection" element={<Disease />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}
