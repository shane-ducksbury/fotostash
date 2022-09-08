import React from 'react'

const AlbumImagePreview = ({image}: any) => {
    return (
        <div key={image.id} className="album-image-wrapper">
            <img src={"http://" + image.imageUrl} alt="" />
            <p>{image.imageUrl}</p>
        </div>
    )
}

export default AlbumImagePreview