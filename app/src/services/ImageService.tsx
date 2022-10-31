import axios from "axios";

const { REACT_APP_API_URL } = process.env
const API_URL = REACT_APP_API_URL


const getAllImages = async () => {
    const res = await axios.get(API_URL + '/images/');
    return res.data;
}

const ImageService = {
    getAllImages
}

export default ImageService