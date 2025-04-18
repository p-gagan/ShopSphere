import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import Context from "../context/main";
import displayINRCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const CartProduct = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const context = useContext(Context);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    
    const loadingProduct = new Array(context.countCart).fill(null);

    const fetchData = async () => {
        setLoading(true);

        const response = await axios.get(`${backendUrl}/cart/showCartProduct`, { withCredentials: true });

        setLoading(false);

        if (response.data.success) {
            setData(response.data.data);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);


    const increaseQunatity = async (id, qty) => {
        const response = await axios.post(`${backendUrl}/cart/update`, { _id: id, qunatity: qty + 1 }, { withCredentials: true });

        if (response.data.success) {
            fetchData();
        }
    }

    const decreaseQunatity = async (id, qty) => {
        if (qty >= 2) {
            const response = await axios.post(`${backendUrl}/cart/update`, { _id: id, qunatity: qty - 1 }, { withCredentials: true });

            if (response.data.success) {
                fetchData();
            }
        }
    }

    // delete cart product
    const handleDeleteProduct = async (id) => {
        const response = await axios.post(`${backendUrl}/cart/remove`, { _id: id }, { withCredentials: true });

        if (response.data.success) {
            toast.success(response.data.message);
            fetchData();
            context.countCartProduct();
        }
    }

    const totalQty = data.reduce((prev,curr)=> prev + curr?.qunatity, 0);
    const totalPrice = data.reduce((prev,curr)=> prev + (curr?.productId?.sellingPrice * curr?.qunatity), 0);

    return (
        <div className='container mx-auto'>
            {/* Empty Cart */}
            <div className='text-center text-lg my-3'>
                {
                    data.length === 0 && !loading && (
                        <p className='bg-white py-5 font-bold text-red-700'>Cart is Empty!</p>
                    )
                }
            </div>

            <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
                {/* Show Cart Product */}
                <div className='w-full max-w-3xl'>
                    {
                        loading ? (
                            // show loading state UI
                            loadingProduct.map((ele, index) => {
                                return (
                                    <div key={ele + index} className='w-full bg-slate-200 h-32 border rounded border-slate-300 animate-pulse my-2'>

                                    </div>
                                )
                            })
                        ) : (
                            data.map((product, index) => {
                                return (
                                    <div key={product?._id + index} className='w-full bg-white h-32 border border-slate-300 my-2 grid grid-cols-[128px,1fr]'>
                                        {/* Cart Product Image */}
                                        <div className='w-32 h-32 p-2 bg-slate-200'>
                                            <img src={product?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply' />
                                        </div>

                                        {/*Cart Product Information  */}
                                        <div className='px-4 py-2 relative'>

                                            <div className='absolute right-0 text-red-600 rounded-full p-1 hover:bg-red-600 hover:text-white cursor-pointer' onClick={() => handleDeleteProduct(product?._id)}>
                                                <MdDelete />
                                            </div>

                                            <h2 className='text-lg text-ellipsis line-clamp-1'>{product.productId?.productName}</h2>
                                            <p className='capitalize text-slate-500'>{product?.productId?.category}</p>

                                            <div className='flex items-center justify-between'>
                                                <p className='text-red-600 font-medium text-lg'>{displayINRCurrency(product?.productId?.sellingPrice)}</p>
                                                <p className='text-slate-600 font-semibold text-lg'>{displayINRCurrency(product?.productId?.sellingPrice * product?.qunatity)}</p>
                                            </div>

                                            <div className='flex items-center gap-3 mt-1'>
                                                <button className='border border-red-600  text-red-600 hover:bg-red-600 hover:text-white rounded w-6 h-6 flex justify-center items-center' onClick={() => { decreaseQunatity(product?._id, product?.qunatity) }}>-</button>
                                                <span>{product?.qunatity}</span>
                                                <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded w-6 h-6 flex justify-center items-center' onClick={() => { increaseQunatity(product?._id, product?.qunatity) }}>+</button>
                                            </div>
                                        </div>

                                    </div>
                                )
                            })
                        )
                    }
                </div>

                <div className='mt-5 lg:mt-2 w-full max-w-sm'>
                    {
                        loading ? (
                            <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'>

                            </div>
                        ) : (
                            <div className='h-36 bg-white'>
                                <h2 className='text-white bg-red-600 px-4 py-1'>Summary</h2>

                                <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                    <p>Quantity</p>
                                    <p>{totalQty}</p>
                                </div>

                                <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                    <p>Total Price</p>
                                    <p>{displayINRCurrency(totalPrice)}</p>
                                </div>

                                <button className='bg-blue-600 p-2 text-white w-full h-12 mt-2'>Payment</button>

                            </div>
                        )
                    }
                </div>

            </div>
        </div>
    )
}

export default CartProduct
