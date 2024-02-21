import React, { useEffect, useState } from "react";
import Listings from "../Api/Listings";
import { formatMultiPrice } from "../hooks/Valuedata";
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem, setNewProduct } from "../redux/productSlide";
import LoadingPage from "../page/LoadingPage";
import NoData from "./NoData";

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

    const handleAddCartProduct = (product) => {
        dispatch(addCartItem(product));
    };

    return (
        <>
            {loading ? (
                <LoadingPage />
            ) : (
                <>
                    {productData.map((product) => (
                        <div key={product._id} className="w-full sm:w-5/12 md:w-3/12  xl:w-2/12 2xl:w-2/12 px-3 mb-6">
                            <div className="bg-white product_box py-3 px-3 cursor-pointer flex flex-col rounded-xl">
                                <div className="flex flex-col justify-center items-center">
                                    <img alt="image" src={product.image} className="rounded-xl w-full h-44 object-cover" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-gray-900 capitalize text-base mt-3 mb-1 whitespace-nowrap overflow-hidden">
                                        {product.name}
                                    </h3>
                                    <div className="flex justify-between mt-3">
                                        <div>
                                            <p className="text-orange-500 text-sm font-bold align-middle">
                                                <span>{formatMultiPrice(product.price)}</span>
                                            </p>
                                            <p className="text-green-500">Free Delivery</p>
                                        </div>
                                        <button className="button bg-blue sm" onClick={() => handleAddCartProduct(product)}>+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    </>
            )}
        </>
    );
}
