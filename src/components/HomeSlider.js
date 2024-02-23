import React, { useEffect, useState } from "react";
import Listings from "../Api/Listings";
import { useDispatch, useSelector } from 'react-redux';
import {  setNewProduct } from "../redux/productSlide";
import LoadingPage from "../page/LoadingPage";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Product from "./Product";

export default function HomeSlider() {

    const productData = useSelector((state) => state.product.record);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const main = new Listings();
                const response = await main.newproduct();
                dispatch(setNewProduct(response.data.data));
                setLoading(false);
            } catch (error) {
                console.log("error", error);
                setLoading(false);
            }
        };
        fetchData();
    }, [dispatch]);

   
    return (
        <>
            {loading ? (
                <LoadingPage />
            ) : (
                <>
                    {productData[0] ? ( productData.map((el) => {
                        return (
                            <Product
                                key={el._id}
                                id={el._id}
                                image={el.image}
                                name={el.name}
                                category={el.category}
                                price={el.price}
                                description={el.description}
                            />
                        );
                    })
                    ) : (
                    <Product loading="Loading..." key={"allProduct"} />
                    )}
                    </>
            )}
        </>
    );
}
