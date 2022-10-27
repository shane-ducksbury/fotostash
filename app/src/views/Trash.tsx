import { Button } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import AlbumImagePreview from '../components/AlbumImagePreview'
import EmptyTrashButton from '../components/EmptyTrashButton'
import ImageAlbum from '../components/ImageAlbum'
import SessionTimeout from '../components/SessionTimeout'
import Image from '../interfaces/Image'
import Loading from './Loading'

type Props = {}

const { REACT_APP_API_URL } = process.env
const API_URL = REACT_APP_API_URL

const Trash = (props: Props) => {

    const getTrash = async () => {
        const res = await axios.get(`${API_URL}/images/trash`);
        return res.data
    }

    const { data, status, refetch } = useQuery('imageTrash', getTrash, {refetchOnMount: true, refetchOnWindowFocus: true});

    const refetchData = () => {
        refetch();
    }

    if(status === 'success') {
        console.log(data)
        if(data.length > 0){
            return (
                    <ImageAlbum imageAlbum={data} refetch={refetchData} albumName={'Trash'} albumAction={<EmptyTrashButton />} />
                )
            }
        return (
            <div className='no-content'>
            <img src="img/trash.svg" alt="" />
            <h2>The trash is empty.</h2>
        </div>
        )
        }
    if(status === 'error') {
        return (
            <SessionTimeout />
        )
    }
    return <Loading />

    // return (
    //     <div>
    //         <h1>Trash</h1>
    //         <Button color="error" onClick={emptyTrashHandler}>Empty Trash</Button>
    //         <div className='album-wrapper'>
    //         {
    //             trashImages ?
    //             trashImages.map(item => {
    //                 return(
    //                     <div className="album-image-card" key={item.id}>
    //                     <div>
    //                         <AlbumImagePreview image={item} />
    //                     </div>
    //                 </div>
    //                 )
    //             })
    //             : "No Trash Images"
    //         }
    //         </div>
    //     </div>
    // )
}

export default Trash