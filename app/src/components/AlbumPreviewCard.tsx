import { Button } from '@mui/material';
import Image from '../interfaces/Image'
import AddToAlbum from './AddToAlbum';
import AlbumImagePreview from './AlbumImagePreview';

interface Props {
    image: Image;
    modalHandler: (params: Image) => void;
}

const AlbumPreviewCard = ({image, modalHandler}: Props) => {
  return (
    <div key={image.id} className="album-image-card">
        <div onClick={() => modalHandler(image)}>
            <AlbumImagePreview image={image} />
        </div>
        <AddToAlbum imageId={image.id} />
    </div>
  )
}

export default AlbumPreviewCard