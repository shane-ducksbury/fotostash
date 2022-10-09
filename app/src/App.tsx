import React, { useEffect, useState } from 'react';
import 'normalize.css';
import './style.css';

import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import AllPhotos from './views/AllPhotos';
import Upload from './views/Upload';
import Navigation from './components/Navigation';
import Albums from './views/Albums';
import SingleAlbum from './views/SingleAlbum';
import Trash from './views/Trash';
import Login from './views/Login';
import AuthService from './services/AuthService';

function App() {
  const [userValid, setUserValid] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    validateUser();
  },[])

  const validateUser = async () => {
    const auth = await AuthService.checkExistingAuth();
    if(!auth) navigate('/login');
    if(auth) setUserValid(true);
  }

  return (
    <div className="App">
      <Navigation />
        <Routes>
            <Route path="/" element={userValid ? <AllPhotos /> : null} />
            <Route path="/albums" element={<Albums />} />
            <Route path="/albums/:albumId" element={<SingleAlbum />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/trash" element={<Trash />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    </div>
  );
}

export default App;
