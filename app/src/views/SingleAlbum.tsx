import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AlbumImagePreview from "../components/AlbumImagePreview";
import Album from "../interfaces/Album";
import Image from "../interfaces/Image"

type Props = {}

const API_ENDPOINT = "http://localhost:5050"

const SingleAlbum = (props: Props) => {

    const [albumDetails, setAlbumDetails] = useState<Album>();

    const { albumId } = useParams();

    useEffect(() => {
        axios.get(API_ENDPOINT + "/albums/" + albumId )
        .then(response => setAlbumDetails(response.data))
    },[albumId])

    return (
        <div>SingleAlbum
            {albumDetails?.images ?
            albumDetails.images?.map((item: Image) => {
                return(
                    <div className="album-image-card" key={item.id}>
                        <div>
                            <AlbumImagePreview image={item} />
                        </div>
                        <Button>Add to Album</Button>
                    </div>
                    )
            })
            : "Nothing Here"  
            }
        </div>
    )
}

export default SingleAlbum