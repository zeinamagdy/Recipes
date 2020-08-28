import React from 'react'
import ImageUploader from 'react-images-upload'

// https://www.npmjs.com/package/react-images-upload
const ImgUploader = (props) => {
    return (
        <ImageUploader
            withIcon={true}
            singleImage={true}
            buttonText='Choose images'
            withPreview={true}
            defaultImages={props.src}
            onChange={props.uplodHandler}
            imgExtension={['.jpg', '.gif', '.png', '.gif']}
            maxFileSize={5242880}
            className='from_imgUploader'
        />
    )
}


export default ImgUploader;