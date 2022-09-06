import React from 'react';
import 'normalize.css';
import './style.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AllPhotos from './views/AllPhotos';
import Upload from './views/Upload';
import Navigation from './components/Navigation';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navigation />
        <Routes>
          <Route path="/" element={<AllPhotos />} />
          <Route path="/upload" element={<Upload />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
