import Image from "../interfaces/Image"

type Props = {
    image: Image
}

const AlbumLightbox = ({ image }: Props) => {

    return(
        <div className="lightbox-image-container">
            <img src={image.imageUrl} alt="" />
        </div>
    )

}

export default AlbumLightbox