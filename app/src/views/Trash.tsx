import { Button } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AlbumImagePreview from '../components/AlbumImagePreview'
import Image from '../interfaces/Image'

type Props = {}

const API_ENDPOINT = "http://localhost:5050"

const Trash = (props: Props) => {
    const [trashImages, setTrashImages] = useState<Image[]>([])
    const [rerender, setRerender] = useState<boolean>(true);

    useEffect(() => {
        if(rerender){
            setTrashImages([]);
            axios.get(API_ENDPOINT + "/images/trash")
            .then(response => setTrashImages(response.data));

            setRerender(false);
        }
    },[rerender])

    const rerenderPage = () => {
        setRerender(true);
    }

    const emptyTrashHandler = () => {
        emptyTrash();
        rerenderPage();
    }

    const emptyTrash = async () => {
        await axios.delete(API_ENDPOINT + "/images/trash");
    }

    return (
        <div>
            <h1>Trash</h1>
            <Button color="error" onClick={emptyTrashHandler}>Empty Trash</Button>
            <div className='album-wrapper'>
            {
                trashImages ?
                trashImages.map(item => {
                    return(
                        <div className="album-image-card" key={item.id}>
                        <div>
                            <AlbumImagePreview image={item} />
                        </div>
                    </div>
                    )
                })
                : "No Trash Images"
            }
            </div>
        </div>
    )
}

export default Trash