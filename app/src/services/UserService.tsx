import axios from 'axios';
import React from 'react'
import authHeader from './HeaderService';

const { REACT_APP_API_URL } = process.env

const API_URL = REACT_APP_API_URL

const getUserImages = () => {
        return axios.get(API_URL + '/images/')
        .then(response => { return response.data });
    };

const UserService = {
        getUserImages
    };

export default UserService