import React, { useState } from 'react';
import axios from 'axios';

export default function ImageUpload({ setImage }) {
    const imagekey = process.env.REACT_APP_IMAGE_KEY
    const [image, setLocalImage] = useState("");
    const uploadfile = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        try {
            const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                params: {
                    key: imagekey,
                    name: new Date().toISOString()
                }
            });
            setLocalImage(response.data.data.display_url);
            setImage(response.data.data.display_url);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    }

    return (

        <div class="w-full  px-3 mb-6 md:mb-0">
            <label
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                for="file"
            >
                Upload image
            </label>
            <label htmlFor="file" className="file-upload-label">
                <div className="file-upload-design w-100">
                    <svg viewBox="0 0 640 512" height="0.1em">
                        <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
                    </svg>
                    <span className="browse-button">Browse file</span>
                </div>
                <input id="file" type="file" onChange={uploadfile} />
            </label>
        </div>
    );
}
