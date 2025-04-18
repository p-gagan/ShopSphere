import React, { useEffect, useState } from 'react'
import UploadComponent from '../components/uploadComponent'
import axios from 'axios';
import AdminProductCard from '../components/AdminProductCard';

const Products = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async()=>{
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const response = await axios.get(`${backendUrl}/product/show`);
    setAllProduct(response?.data.data || []);
  }

  useEffect(()=>{
    fetchAllProduct();
  },[])

  return (
    <div>
      
        <div className='flex justify-between py-2 px-4 items-center bg-white'>
          <h2 className='font-bold text-lg'>All Products</h2>
          <button className='border-2 rounded-full py-1 px-3 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all' onClick={()=>setOpenUploadProduct(true)}>Add Product</button>
        </div>
      
      {/* show all products */}
      <div className='flex items-center gap-5 py-4 flex-wrap h-[calc(100vh-190px)] overflow-y-scroll'>
        {
          allProduct.map((product,index)=>{
            return(
              <AdminProductCard data = {product} key={index + "allProducts"} fetchData={fetchAllProduct}/>
            )
          })
        }
      </div>

      {/* upload product component */}
      {
        openUploadProduct && (
         <UploadComponent onClose={()=>setOpenUploadProduct(false)} fetchData={fetchAllProduct}/>
        )
      }
    </div>
  )
}

export default Products