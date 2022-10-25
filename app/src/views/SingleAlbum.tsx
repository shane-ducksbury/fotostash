import { Button } from "@mui/material";
import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import ImageAlbum from "../components/ImageAlbum";
import Loading from "./Loading";

const { REACT_APP_API_URL } = process.env
const API_URL = REACT_APP_API_URL

const SingleAlbum = () => {

    const { albumId } = useParams();

    const getAlbumImages = async () => {
        const res = await axios.get(`${API_URL}/albums/${albumId}`);
        return res.data
    }

    const { data, status, refetch } = useQuery('albumImages', getAlbumImages, {refetchOnMount: true});

    const refetchData = () => {
        refetch();
    }

    if(status === 'success') {
        return (
                <ImageAlbum imageAlbum={data.images} refetch={refetchData} albumName={data.name} />
            )
        }
    return <Loading />

}

export default SingleAlbum