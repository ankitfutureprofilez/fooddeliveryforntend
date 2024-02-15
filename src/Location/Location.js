import React, { useEffect, useState } from 'react'

export default function Location() {

    const [longitde, setLongitude] = useState()
    const [Latitude, setLatitude] = useState()

    const [userdata, setuserdata] = useState()
    
    useEffect(()=>{ 
        const geo = navigator.geolocation;
        try {
            if (geo) {
                geo.getCurrentPosition((position) => {
                    setLongitude(position.coords.longitude);
                    setLatitude(position.coords.latitude);

                   
                });
            } else {
                console.error("Geolocation is not supported");
            }
        } catch (error) {
            console.error("Error retrieving geolocation:", error.message);
        }
    },[]);

    useEffect(()=>{ 
        console.log("longitde", longitde);
        console.log("Latitude", Latitude);
    },[longitde, Latitude]);

    const getuser = async () => {
        let user = ` https://api.opencagedata.com/geocode/v1/json?key=1f4194a9d4f54eec9bca1633b35e3bf0&q=${Latitude}%2C+${longitde}&pretty=1&no_annotations=1`
        const loc = await fetch(user);
        const data = await loc.json();
        setuserdata(data?.results[0]?.formatted)
        console.log("data", data?.results[0].components)
    }

    const handleuser = async () => {
        await getuser();
    }
    
    return (
        <div>
            <h1>current  loadint </h1>
            <button onClick={handleuser}>get user</button>

        </div>
    )
}
