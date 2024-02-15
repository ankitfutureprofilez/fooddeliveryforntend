import React, { useState } from 'react'

export default function Location() {

    const [longitde, setLongitude] = useState()

    const [Latitude, setLatitude] = useState()


    const [Loading, setLoading] = useState(true);
    const [userdata, setuserdata] = useState()

    const [Gpslongitde, setGpsLongitude] = useState()

    const [GpsLatitude, setGpsLatitude] = useState()

    console.log("longitde", longitde)
    console.log("Latitude", Latitude)

    console.log("Gpslongitde", Gpslongitde)
    console.log("GpsLatitude", GpsLatitude)
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


    function getLocation() {
        const geo = navigator.geolocation;
        try {
            if (geo) {
                geo.watchPosition((position) => {
                    setGpsLongitude(position.coords.longitude);
                    setGpsLatitude(position.coords.latitude);
                });
            } else {
                console.error("Geolocation is not supported");
            }
        } catch (error) {
            console.error("Error retrieving geolocation:", error.message);
        }
    }

    getLocation(); // Call the function to start watching the position



    const getuser = async () => {
        let user = ` https://api.opencagedata.com/geocode/v1/json?key=1f4194a9d4f54eec9bca1633b35e3bf0&q=${Latitude}%2C+${longitde}&pretty=1&no_annotations=1`
        const loc = await fetch(user);
        const data = await loc.json();
        setuserdata(data?.results[0]?.formatted)
        console.log("data", data?.results[0].components.
            city
        )
    }
    const handleuser = async () => {
        await getuser();
    }


    const stop = () => {
        geo.clearWatch(getLocation())
        console.log("stop watch")
    }

    console.log("userdata", userdata)
    return (
        <div>
            <h1>current  loadint </h1>
            <button onClick={handleuser}>get user</button>
            <button onClick={stop}>get stop</button>

        </div>
    )
}
