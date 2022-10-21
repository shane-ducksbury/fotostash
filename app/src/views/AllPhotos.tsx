import React from 'react'
import ImageAlbum from '../components/ImageAlbum'
import { useQuery } from 'react-query'
import axios from 'axios'
import Loading from './Loading'

const { REACT_APP_API_URL } = process.env
const API_URL = REACT_APP_API_URL

type Props = {}

const AllPhotos = (props: Props) => {

    const getAllPhotos = async () => {
        const res = await axios.get(API_URL + '/images/');
        return res.data;
    }

    const { data, status, refetch } = useQuery('allPhotos', getAllPhotos, {refetchOnWindowFocus: true})

    const refetchData = () => {
        refetch();
    }

    if(status === 'success') {
        return (
            <ImageAlbum imageAlbum={data} refetch={refetchData} />
            )
        }
    return <Loading />

}

export default AllPhotos