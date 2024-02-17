import axios from 'axios';
import { useState } from 'react';

export default function FileUpload( {setImage } ) {
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

    return <>
         <label htmlFor="profileImage">
          <div className="absolute bottom-0 h-1/3  bg-slate-500 bg-opacity-50 w-full text-center cursor-pointer">
            <p className="text-sm p-1 text-white">Upload</p>
          </div>
          <input
          required
            type={"file"}
            id="profileImage"
            accept="image/*"
            className="hidden"
            onChange={uploadfile}
            
          />
        </label>
    </>

}