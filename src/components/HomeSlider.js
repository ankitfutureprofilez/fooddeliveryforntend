import React, { useEffect, useState } from 'react';
import Product from './Product';

export default function HomeSlider() {
    return (
       <>

<div className='newly-added-sec'>
            <div className="container mx-auto">
                <h2>Newly Added</h2>
                <div className="flex">
                   <Product/>
                </div>
            </div>
        </div>
       </>
    );
}
