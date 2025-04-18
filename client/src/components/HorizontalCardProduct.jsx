import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import displayINRCurrency from "../helpers/displayCurrency"
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { useReducer } from 'react';
import { Link } from "react-router-dom";
import addTocart from '../helpers/addToCart';
import Context from "../context/main";

const HorizontalCardProduct = ({ category, heading }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const scrollElement = useRef();

    const loadingList = new Array(13).fill(null);

    const fetchCategoryWaiseProduct = async () => {
        setLoading(true);
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const response = await axios.post(`${backendUrl}/product//categorized-product`, { category });
        setLoading(false);

        setData(response.data.data);
    }


    useEffect(() => {
        fetchCategoryWaiseProduct();
    }, []);

    const scrollRight = () => {
        scrollElement.current.scrollLeft += 300;
    }

    const scrollLeft = () => {
        scrollElement.current.scrollLeft -= 300;
    }

    const { countCartProduct } = useContext(Context);
    const handleCartCount = async (event, id) => {
        await addTocart(event, id);
        countCartProduct();
    }

    return (
        <div className='container mx-auto px-4 my-2 relative'>

            <h2 className='text-2xl font-semibold py-4'>{heading}</h2>

            <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all' ref={scrollElement}>

                <button
                    onClick={scrollLeft}
                    className="absolute left-0 transform -translate-y-1/2 bg-white rounded-full shadow-md p-1 z-10 hidden md:block"
                >
                    <FaAngleLeft className="text-xl" />
                </button>
                <button
                    onClick={scrollRight}
                    className="absolute right-0 transform -translate-y-1/2 bg-white rounded-full shadow-md p-1 z-10 hidden md:block"
                >
                    <FaAngleRight className="text-xl" />
                </button>

                {
                    loading ? (
                        loadingList.map((product, index) => {
                            return (
                                <div key={index} className='w-full min-w-[300px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>
                                    <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse'>

                                    </div>

                                    <div className='p-4 grid w-full gap-2'>
                                        <h2 className='font-medium text-base md-text-lg text-ellipsis line-clamp-1 text-black p-1 bg-slate-200 animate-pulse rounded-full'></h2>
                                        <p className='capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full'></p>

                                        <div className='flex gap-3'>
                                            <p className='text-red-600 font-medium p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                                            <p className='text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                                        </div>

                                        <button className='text-white rounded-full px-3 py-0.5 text-sm w-full bg-slate-200 animate-pulse'></button>
                                    </div>
                                </div>
                            )
                        })

                    ) : (
                        data.map((product, index) => {
                            return (
                                <Link to={"/product-details/" + product?._id} key={index} className='w-full min-w-[300px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>
                                    <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]'>
                                        <img src={product.productImage[0]} alt="image" className='object-scale-down h-full hover:scale-110 transition-all' />
                                    </div>

                                    <div className='p-4 grid'>
                                        <h2 className='font-medium text-base md-text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                                        <p className='capitalize text-slate-500'>{product?.category}</p>

                                        <div className='flex gap-3'>
                                            <p className='text-red-600 font-medium'>{displayINRCurrency(product?.sellingPrice)}</p>
                                            <p className='text-slate-500 line-through'>{displayINRCurrency(product?.price)}</p>
                                        </div>

                                        <button className='bg-red-500 hover:bg-red-700 text-white rounded-full px-3 py-0.5 text-sm' onClick={(event) => handleCartCount(event, product?._id)}>Add to Cart</button>
                                    </div>
                                </Link>
                            )
                        })
                    )
                }
            </div>

        </div>
    )
}

export default HorizontalCardProduct