import React, { useEffect, useState } from 'react'

type Props = {}

const AllPhotos = (props: Props) => {

    const [allPhotos, setAllPhotos] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5050/images')
        .then(res => res.json())
        .then(data => setAllPhotos(data)) 
    }, [])


    return (
        <>
            <h1>All Photos</h1>
            {allPhotos ? 
            allPhotos.map((item: any) => {
                return (
                    <div key={item.id} className="all-photos-holder">
                        <img src={"http://" + item.imageUrl} alt="" />
                    </div>
                )}) 
            : `<h1>No Data</h1>`}
        </>
    )
}

export default AllPhotos