import React, { useState } from 'react';
import axios from 'axios';

export default function ImageUpload({ setImage }) {
    const [image, setLocalImage] = useState("");
    const imagekey = process.env.REACT_APP_IMAGE_KEY;

    const uploadfile = async (e) => { 
        const file = e.target.files[0];
        try {
            const response = await axios.post(
                'https://api.imgbb.com/1/upload',
                file,
                {
                    headers: {
                        'Content-Type': 'image/*'
                    },
                    params: {
                        key: imagekey,
                        name: new Date().toISOString() 
                    }
                }
            );
            setLocalImage(response.data.data.display_url);
            setImage(response.data.data.display_url);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    }

    return (
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="user_avatar">Upload image</label>
            <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file" accept="image/*" onChange={uploadfile} />
        </div>
    );
}
