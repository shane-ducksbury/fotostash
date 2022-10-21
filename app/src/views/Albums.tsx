import { Button } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { Link } from "react-router-dom"
import AlbumPreview from "../components/AlbumPreview"
import CreateNewAlbumButton from "../components/CreateNewAlbumButton"

import Album from '../interfaces/Album'
import Loading from "./Loading"

type Props = {

}

const { REACT_APP_API_URL } = process.env
const API_URL = REACT_APP_API_URL

const Albums = (props: Props) => {

    const [albums, setAlbums] = useState<Album[]>([]);
    // const [staleAlbums, setStaleAlbums] = useState<boolean>(true);

    const getAlbums = async () => {
        const res = await axios.get(`${API_URL}/albums`);
        return res.data;
    }

    const { data, status } = useQuery('albums', getAlbums, {onSuccess: setAlbums, refetchOnMount: true});

    // useEffect(() => {
    //     if(staleAlbums) {
    //         getAlbums();
    //         setStaleAlbums(false);
    //     }
    // },[staleAlbums])

    const forceAlbumRefresh = () => {
        // setStaleAlbums(true);
    }
    
    if(status === 'success'){
        return(
            <div className="albums-page-wrapper">
                <div className="album-title-bar">
                    <h1>Albums</h1>
                    <CreateNewAlbumButton setParentToStaleCallback={forceAlbumRefresh} />
                </div>
                <section className='albums-container'>
                {albums ? albums.map(album => {
                    return(
                        <div>
                            <AlbumPreview albumId={album.id} />
                            <Link key={album.id} to={`/albums/${album.id}`}>{album.name}</Link>
                        </div>
                    )
                })
                : <h1>No Albums Yet</h1>}
                </section>
            </div>
        )
    }
    return <Loading />
}

export default Albums