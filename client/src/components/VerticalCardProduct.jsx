import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import displayINRCurrency from "../helpers/displayCurrency"
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { useReducer } from 'react';
import { Link} from "react-router-dom";
import addTocart from '../helpers/addToCart';
import Context from "../context/main";

const VerticalCardProduct = ({ category, heading }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const scrollElement = useRef();

    const loadingList = new Array(13).fill(null);

    const fetchCategoryWaiseProduct = async () => {
        setLoading(true);
        const response = await axios.post("http://localhost:8080/product//categorized-product", { category });
        setLoading(false);

        setData(response.data.data);
    }

    useEffect(() => {
        fetchCategoryWaiseProduct();
    }, [category]);

    const scrollRight = () => {
        scrollElement.current.scrollLeft += 300;
    }

    const scrollLeft = () => {
        scrollElement.current.scrollLeft -= 300;
    }

    const {countCartProduct} = useContext(Context);
    const handleCartCount = async(event,id)=>{
        await addTocart(event, id);
        countCartProduct();
    }

    return (
        <div className='container mx-auto px-4 my-2 relative'>

            <h2 className='text-2xl font-semibold py-4'>{heading}</h2>

            <div className='flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all' ref={scrollElement}>

                <button
                    onClick={scrollLeft}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-md p-1 z-10 hidden md:block"
                >
                    <FaAngleLeft className="text-2xl" />
                </button>
                <button
                    onClick={scrollRight}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-md p-1 z-10 hidden md:block"
                >
                    <FaAngleRight className="text-2xl" />
                </button>

                {
                    loading ? (
                        loadingList.map((product, index) => {
                            return (
                                <div key={index} className='w-full min-w-[280px] md:min-w-[280px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow'>
                                    <div className='bg-slate-200 h-40 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse'>
                                        
                                    </div>
    
                                    <div className='p-4 grid gap-3'>
                                        <h2 className='font-medium text-base md-text-lg text-ellipsis line-clamp-1 text-black p-2 bg-slate-200 animate-pulse rounded-full'></h2>
                                        <p className='capitalize text-slate-500 p-2 bg-slate-200 animate-pulse rounded-full'></p>
    
                                        <div className='flex gap-3'>
                                            <p className='text-red-600 font-medium p-2 bg-slate-200 w-full animate-pulse rounded-full'></p>
                                            <p className='text-slate-500 line-through p-2 bg-slate-200 w-full animate-pulse rounded-full'></p>
                                        </div>
    
                                        <button className='text-white rounded-full px-3 py-2 text-sm bg-slate-200 animate-pulse'></button>
                                    </div>
                                </div>
                            )
                        })
                    ) :
                    (
                        data.map((product, index) => {
                            return (
                                <Link to={"/product-details/"+product?._id} key={index} className='w-full min-w-[280px] md:min-w-[280px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow '>
                                    <div className='bg-slate-200 h-40 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                                        <img src={product.productImage[0]} alt="image" className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply' />
                                    </div>
    
                                    <div className='p-4 grid gap-3'>
                                        <h2 className='font-medium text-base md-text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                                        <p className='capitalize text-slate-500'>{product?.category}</p>
    
                                        <div className='flex gap-3'>
                                            <p className='text-red-600 font-medium'>{displayINRCurrency(product?.sellingPrice)}</p>
                                            <p className='text-slate-500 line-through'>{displayINRCurrency(product?.price)}</p>
                                        </div>
    
                                        <button className='bg-red-500 hover:bg-red-700 text-white rounded-full px-3 py-1.5 text-sm' onClick={(event)=>handleCartCount(event,product?._id)}>Add to Cart</button>
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

export default VerticalCardProduct

