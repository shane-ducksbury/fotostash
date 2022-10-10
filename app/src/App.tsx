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
import Register from './views/Register';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [userValid, setUserValid] = useState<boolean>(false);
  const [authChecked, setAuthChecked] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if(!userValid){
      validateUser();
    }
  },[])

  const validateUser = async () => {
    const auth = await AuthService.checkExistingAuth();
    console.log(auth)
    if(auth) setUserValid(true);
    setAuthChecked(true);
  }

  if(authChecked){
  return (
    <div className="App">
      <Navigation />
        <Routes>
            <Route path="/" element={<ProtectedRoute user={userValid} />}>
                <Route path="/" element={<AllPhotos />} />
                <Route path="/albums" element={<Albums />} />
                <Route path="/albums/:albumId" element={<SingleAlbum />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/trash" element={<Trash />} />
            </Route>
            <Route path="/login" element={<Login validateUser={validateUser} />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    </div>
  );
  } else {
    return(<p>Loading</p>)
  }
}

export default App;
