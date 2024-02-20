import React, { useEffect, useState } from 'react';
import CardFeature from './Product';
import Listings from '../Api/Listings';
import NoData from './NoData';
import Heroplet from "../assest/hero-plet.png";
import { useDispatch } from 'react-redux';
import { addCartItem } from '../redux/productSlide';
import { formatMultiPrice } from '../hooks/Valuedata';

export default function HomeSlider() {
    return (
       <>

<div className='newly-added-sec'>
            <div className="container mx-auto">
                <h2>Newly Added</h2>
                <div className="flex">
                     <CardFeature />
                </div>
            </div>
        </div>
       </>
    );
}
