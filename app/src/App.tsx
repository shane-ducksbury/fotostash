import React from 'react';
import 'normalize.css';
import './style.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AllPhotos from './views/AllPhotos';
import Upload from './views/Upload';
import Navigation from './components/Navigation';
import Albums from './views/Albums';
import SingleAlbum from './views/SingleAlbum';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navigation />
        <Routes>
          <Route path="/" element={<AllPhotos />} />
          <Route path="/albums" element={<Albums />} />
          <Route path="/albums/:albumId" element={<SingleAlbum />} />
          <Route path="/upload" element={<Upload />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
