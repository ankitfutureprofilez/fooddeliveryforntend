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
    
    const [deliveryStatus, setDeliveryStatus] = useState('In Transit');


    useEffect(() => {
        const interval = setInterval(() => {
            navigator.geolocation.getCurrentPosition(position => {
                setLongitude(position.coords.longitude);
                setLatitude(position.coords.latitude);
    
                if (Math.abs(position.coords.latitude - 26.922070) < 0.01 && Math.abs(position.coords.longitude - 75.778885) < 0.01) {
                    setDeliveryStatus('Delivered');
                    clearInterval(interval); 
                }
            });
        }, 5000); 
    
        return () => clearInterval(interval); 
    }, []);
    
    return (
        <div>
        <h1>Current Location</h1>
        {deliveryStatus === 'In Transit' ? (
            <button onClick={handleuser}>Get User Address</button>
        ) : (
            <h2>Delivery Successful!</h2>
        )}
        {userdata && <p>Address: {userdata}</p>}
    </div>
    )
}
