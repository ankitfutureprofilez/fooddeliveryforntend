import React, { useEffect, useState } from 'react'
import CardFeature from './Product'
import Listings from '../Api/Listings';
import NoData from './NoData';
import Heroplet from "../assest/hero-plet.png";
import Product from "./Product"


export default function HomeSlider() {

    const [Loading, setLoading] = useState(true);
    const [content, setContent] = useState([])

    useEffect(() => {
        const main = new Listings();
        const response = main.productlist();
        response.then((res) => {
            const newData = res?.data;
            setContent(newData)
            setLoading(false)
        }).catch((error) => {
            console.log("error", error)
            setLoading(false)
        });
    })
    return (
        <div className='newly-added-sec'>
            <div className="container mx-auto">
                <h2>Newly Added</h2>
                <div className="flex"></div>
                <Product />
            </div>
        </div>

    )
}
