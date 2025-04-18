import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom';
import displayINRCurrency from "../helpers/displayCurrency";
import addTocart from '../helpers/addToCart';
import Context from '../context/main';

const Search = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadingList = new Array(data.length).fill(null);

    const query = useLocation();

    const fetchData = async()=>{
        setLoading(true);

        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const response = await axios.get(`${backendUrl}/product/search`+query.search);
        setLoading(false);

        setData(response.data.data);
    }

    const {countCartProduct} = useContext(Context);
    const handleCartCount = async(event,id)=>{
        await addTocart(event, id);
        countCartProduct();
    }

    useEffect(()=>{
        fetchData();
    },[query]);

  return (
    <div className='container mx-auto p-4'>

      {
        loading && (
            <p className='text-lg text-center'>Loading...</p>
        )
      }

      <p className='text-lg font-semibold my-3'>Search Result : {data.length}</p>

      {
        data.length === 0 && !loading && (
          <p className='text-lg text-center bg-white p-4'>No Result Found</p>
        )
      }

      {
        data.length !== 0 && !loading && (
          <div className='grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-center md:justify-between gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all'>

          {
              loading ? (
                  loadingList.map((product, index) => {
                      return (
                          <div key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow'>
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
        )
      }

    </div>
  )
}

export default Search