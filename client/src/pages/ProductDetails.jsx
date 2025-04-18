import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { BsStarFill } from "react-icons/bs";
import { BsStarHalf } from "react-icons/bs";
import displayINRCurrency from '../helpers/displayCurrency';
import HorizontalCardProduct from '../components/HorizontalCardProduct';
import VerticalCardProduct from '../components/VerticalCardProduct';
import { Link} from "react-router-dom";

const ProductDetails = () => {
  const [details, setDetails] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });

  const params = useParams();
  const [loading, setLoading] = useState(false);
  const imageLoadingList = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");
  const [zoomImageCoordinates, setZoomImageCoordinates] = useState({
    x: 0,
    y: 0
  });
  const [zoomImage, setZoomImage] = useState(false);

  const fetchproductDetails = async () => {
    setLoading(true);
    const response = await axios.post("http://localhost:8080/product/product-details", { userId: params.id });
    setLoading(false);

    setDetails(response.data.data);
    setActiveImage(response?.data.data.productImage[0]);
  }

  useEffect(() => {
    fetchproductDetails();
  }, [params]);

  const handleOnMouseEnterImage = (imgURL) => {
    setActiveImage(imgURL);
  }
  
  const handleZoomImage = (event) => {
    const { left, top, width, height } = event.target.getBoundingClientRect();
    
    const x = (event.clientX - left) / width;
    const y = (event.clientY - top) / height;
    
    setZoomImageCoordinates({
      x,
      y
    })
  }
  
  const handleMouseEnter = () => {
    setZoomImage(true);
  }
  
  const handleOnMouseOut = ()=>{
    setZoomImage(false);
  }

  return (
    <div className='container mx-auto p-4'>

      <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>

        <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>

          {/* Active image of product */}
          <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2'>
            <img src={activeImage} alt="image" className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' onMouseMove={handleZoomImage} onMouseEnter={handleMouseEnter} onMouseLeave={handleOnMouseOut} />

            {/* Zoom functionality of active image */}
            {
              zoomImage && (
                <div className='hidden lg:block p-1 absolute min-w-[500px] min-h-[400px] overflow-hidden bg-slate-200 top-0 -right-[510px]'>
                  <div className='w-full h-full mix-blend-multiply scale-125 min-w-[500px] min-h-[400px]'
                    style={{
                      backgroundImage: `url(${activeImage})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: `${zoomImageCoordinates.x * 100}% ${zoomImageCoordinates.y * 100}%`
                    }}
                  >

                  </div>
                </div>
              )
            }

          </div>

          {/* loading images of product */}
          <div className='h-full'>
            {
              loading ? (
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    imageLoadingList.map((ele, index) => {
                      return (
                        <div key={index} className='w-20 h-20 bg-slate-200 rounded animate-pulse'>

                        </div>
                      )
                    })
                  }
                </div>

                // product images
              ) : (
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    details?.productImage.map((imgURL, index) => {
                      return (
                        <div key={index} className='w-20 h-20 bg-slate-200 rounded p-1'>
                          <img src={imgURL} alt="image" className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' onClick={() => { handleOnMouseEnterImage(imgURL) }} onMouseEnter={() => { handleOnMouseEnterImage(imgURL) }} />
                        </div>
                      )
                    })
                  }
                </div>
              )
            }
          </div>

        </div>


        {/* ?Loading Description of product */}
        {
          loading ? (
            <div className='grid w-full'>
              <p className='bg-slate-200 h-6 lg:h-8 w-full rounded-full animate-pulse'></p>
              <h2 className='text-xl lg:text-2xl bg-slate-200 font-medium h-6 lg:h-8 w-full rounded-full animate-pulse'></h2>
              <p className='capitalize text-slate-400 bg-slate-200 h-6 lg:h-8 w-full rounded-full lg:text-lg animate-pulse'></p>

              <div className='bg-slate-200 h-6 lg:h-8 w-full rounded-full flex items-center gap-1 lg:text-xl text-base animate-pulse my-2'>

              </div>

              <div className='flex items-center font-medium bg-slate-200 h-6 lg:h-8 w-full rounded-full'>
                <p className=' bg-slate-200 h-6 lg:h-8 w-full rounded-full animate-pulse'></p>
                <p className=' bg-slate-200 h-6 lg:h-8 w-full rounded-full animate-pulse'></p>
              </div>

              <div className='flex items-center gap-3 my-2'>
                <button className='bg-slate-200 h-6 lg:h-8 w-full rounded-full min-w-[120px] animate-pulse '></button>
                <button className='bg-slate-200 h-6 lg:h-8 w-full rounded-full min-w-[120px] animate-pulse '></button>
              </div>

              <div>
                <p className='bg-slate-200 h-6 lg:h-8 w-full rounded-full animate-pulse'></p>
                <p></p>
              </div>

            </div>
          ) : (

            // Description block of product
            <div>
              <p className='bg-red-200 text-red-600 rounded-full px-2 w-fit'>{details?.brandName}</p>
              <h2 className='text-xl lg:text-2xl font-medium my-1'>{details?.productName}</h2>
              <p className='capitalize text-slate-400 my-1 lg:text-lg'>{details?.category}</p>

              <div className='text-red-600 flex items-center gap-1 lg:text-xl text-base my-2'>
                <BsStarFill />
                <BsStarFill />
                <BsStarFill />
                <BsStarFill />
                <BsStarHalf />
              </div>

              <div className='flex items-center text-xl lg:text-xl font-medium gap-2'>
                <p className='text-red-600'>{displayINRCurrency(details?.sellingPrice)}</p>
                <p className='text-slate-400 line-through'>{displayINRCurrency(details?.price)}</p>
              </div>

              <div className='flex items-center gap-3 my-2'>
                <button className='border-2 border-red-600 px-3 py-1 rounded text-red-600 min-w-[120px] font-medium hover:bg-red-600 hover:text-white'>Buy</button>
                <button className='border-2 border-red-600 px-3 py-1 rounded min-w-[120px] font-medium bg-red-600 text-white hover:bg-white hover:text-red-600'>Add to Cart</button>
              </div>

              <div>
                <p className='text-slate-400 font-medium my-1'>Description:</p>
                <p className='text-ellipsis line-clamp-6'>{details?.description}</p>
              </div>

            </div>
          )
        }

      </div>
      
    <VerticalCardProduct category={details.category} heading={"Similar Products"}/>



    </div>
  )
}

export default ProductDetails