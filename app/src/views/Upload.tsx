import React, { useEffect, useState } from 'react'

import { Button } from '@mui/material'
import axios from 'axios';

type Props = {}

interface PostData {
  image: File | null;
}

const Upload: React.FunctionComponent = (props: Props) => {

  const [formValues, setFormValues] =  useState<PostData>({image: null})
  const [uploadProgress, setUploadProgress] = useState<Number>(0)

  useEffect(() => {
    if(formValues.image) handleSubmit()
  },[formValues.image])

  const handleSubmit = async () => {
    const formData = new FormData();
    formValues.image && formData.append("file", formValues.image);

    const response = await axios.post("http://localhost:5050/images/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      onUploadProgress: (progressEvent: ProgressEvent) => {
        // This is ready for the upload progress thing
        const progress = (progressEvent.loaded / progressEvent.total) * 50
        setUploadProgress(progress)
      }
    })

    setFormValues({image: null})

    return response.data
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues(() => ({
      image: event.target.files ? event.target.files[0] : null
    }))
  }

  return (
    <div className='upload-container'>
      <h1>Upload</h1>
      <p>{formValues.image?.name ? formValues.image?.name : "Select File to Upload"}</p>
      <Button component="label">
        <input onChange={handleImageChange} type="file" hidden />
        {formValues.image?.name ? "" : "Select"}
      </Button>
      <Button onClick={handleSubmit}>
        Submit
      </Button>
    </div>

  )
}

export default Upload