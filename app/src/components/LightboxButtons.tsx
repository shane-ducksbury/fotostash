import React from 'react'
import AddToAlbum from './AddToAlbum'
import SendToTrashButton from './SendToTrashButton'
import Image from "../interfaces/Image"
import CloseLightboxButton from './CloseLightboxButton'


type Props = {
    image: Image;
    handleForceParentRerender: () => void;
    handleCloseModal: () => void;
}

const LightboxButtons = ({image, handleForceParentRerender, handleCloseModal}: Props) => {
    return (
        <>
            <div className="lightbox-controls">
                <CloseLightboxButton handleCloseModal={handleCloseModal} />
                <div>
                    <SendToTrashButton imageId={image.id} handleForceParentRerender={handleForceParentRerender} />
                    <AddToAlbum imageId={image.id} />
                </div>
            </div>
        </>
    )
}

export default LightboxButtons