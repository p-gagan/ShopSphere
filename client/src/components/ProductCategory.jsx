import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const ProductCategory = () => {
    const [productCategory, setproductCategory] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadingCategory = new Array(13).fill(null);

    const fetchProductCategory = async () => {
        setLoading(true);

        const response = await axios.get("http://localhost:8080/product/get-category");

        setLoading(false);

        if (response.data.success) {
            setproductCategory(response.data.data);
        }


    }

    useEffect(() => {
        fetchProductCategory();
    }, []);

    return (
        <div className='p-2 container mx-auto'>
            <div className='flex items-center justify-between gap-5 overflow-scroll scrollbar-none'>
                {
                    loading ? (
                        loadingCategory.map((ele, index) => {
                            return (
                                <div className='w-8 h-8 md:w-16 md:h-16 bg-slate-200 rounded-full flex justify-center items-center overflow-hidden p-3 animate-pulse'key={index}></div>
                            )
                        })
                    ) : (
                        productCategory.map((product, index) => {
                            return (
                                <Link to={"product-category/" + product?.category} className='cursor-pointer' key={index}>

                                    <div className='w-12 h-12 md:w-16 md:h-16 bg-slate-200 rounded-full flex justify-center items-center overflow-hidden p-3'>
                                        <img src={product?.productImage[0]} alt={product?.category} className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all' />
                                    </div>

                                    <p className='text-center text-sm md:text-sm capitalize '>{product?.category}</p>
                                </Link>
                            )
                        })
                    )
                }
            </div>
        </div>
    )
}

export default ProductCategory