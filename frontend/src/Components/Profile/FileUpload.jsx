import React, { useState} from 'react';

export default function FileUpload(props) {
    const [ imagePreview, setImagePreview ] = useState(props.imageLink);

    const image_preview = event => {
        const reader = new FileReader();
        reader.onload = () => {
            setImagePreview(reader.result);
            }
        reader.readAsDataURL(event.target.files[0]);
    }

    const handleFileInput = event => {
        props.setPicFile(event.target.files[0]);
        image_preview(event);
    }


    return (
        <>
            <div className='g1InputCol col-12 col-sm-6 mb-4'>
                <div className='custom-file'>
                    <input
                        className='custom-file-input'
                        id='fileUpload'
                        type='file'
                        accept='image/*'
                        onInput={handleFileInput}
                        onChange={e => e.target.value = null}
                    />
                    <label className='custom-file-label' htmlFor='fileUpload'>
                        Upload a profile image
                    </label>
                </div>
            </div>

            <div className='g1InputCol col-12 col-sm-6'>
                {imagePreview
                    ? <img
                        className='mx-auto mb-2'
                        src={imagePreview}
                        alt='User profile preview'
                        />
                    : null
                }
            </div>
        </>
    )
}