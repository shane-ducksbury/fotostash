import React, { useEffect, useState } from 'react';
import 'normalize.css';
import './style.css';

import { Routes, Route } from 'react-router-dom';
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
import DrawerNavigation from './components/DrawerNavigation';
import Logout from './views/Logout';
import MultiFileUpload from './components/MultiFileUpload';

const App = () => {
    const [userValid, setUserValid] = useState<boolean>(false);
    const [authChecked, setAuthChecked] = useState<boolean>(false);

    useEffect(() => {
        if(!userValid){
            validateUser();
        }
    },[])

    const validateUser = async () => {
        const auth = await AuthService.checkExistingAuth();
        if(auth) setUserValid(true);
        setAuthChecked(true);
    }


    return (
        <div className="App">
        {/* <Navigation /> */}
        {userValid ? <DrawerNavigation /> : null}
            <main>
                <Routes>
                    <Route path="/" element={<ProtectedRoute user={userValid} authChecked={authChecked}/>}>
                        <Route path="/" element={<AllPhotos />} />
                        <Route path="/albums" element={<Albums />} />
                        <Route path="/albums/:albumId" element={<SingleAlbum />} />
                        <Route path="/upload" element={<Upload />} />
                        <Route path="/dev-upload" element={<MultiFileUpload />} />
                        <Route path="/trash" element={<Trash />} />
                    </Route>
                    <Route path="/login" element={<Login validateUser={validateUser} />} />
                    <Route path="/logout" element={<Logout />}></Route>
                    <Route path="/register" element={<Register />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
