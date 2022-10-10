import React from 'react'
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';

const { REACT_APP_API_URL } = process.env

const API_URL = REACT_APP_API_URL

const checkExistingAuth = async () => {

    const lsUser = localStorage.getItem('user');
    if(!lsUser) return null;
    if(lsUser){
        const user = JSON.parse(lsUser)
        const res = await axios.get(API_URL + '/auth/validate/', {headers: {Authorization: `Bearer ` + user.access_token}})
        if(res.status === 200){
            console.log(res)
            if(user.access_token){
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.access_token;
                return user;
            }
        }
    }
}

const register = ( data: {email: string, password: string, firstName: string, lastName: string} ) => {
    return axios.post(`${API_URL}/users/register/`, data);
};

const login = async (data: {username: string, password: string}) => {
    const response = await axios.post(`${API_URL}/auth/login`, data);
    if (response.data.access_token) {
        localStorage.setItem('user', JSON.stringify(response.data));
        await checkExistingAuth();
    }
    return await response;
};

const logout = () => {
    localStorage.removeItem('user');
    axios.defaults.headers.common['Authorization'] = false;
};

const getCurrentUser = () => {
    const user = localStorage.getItem("user")
    if(user) return JSON.parse(user);
    return null;
};

const AuthService = {
    checkExistingAuth,
    register,
    login,
    logout,
    getCurrentUser,
};

export default AuthService