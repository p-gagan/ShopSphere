import React, { useEffect, useState } from 'react';
import image1 from "../assest/banner/img1.webp"
import image2 from "../assest/banner/img2.webp"
import image3 from "../assest/banner/img3.jpg"
import image4 from "../assest/banner/img4.jpg"
import image5 from "../assest/banner/img5.webp"
import mobileImage1 from "../assest/banner/img1_mobile.jpg"
import mobileImage2 from "../assest/banner/img2_mobile.webp"
import mobileImage3 from "../assest/banner/img3_mobile.jpg"
import mobileImage4 from "../assest/banner/img4_mobile.jpg"
import mobileImage5 from "../assest/banner/img5_mobile.png"
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

const BannerProduct = () => {

    const [currentImage, setCurrentImage] = useState(0);

    const desktopBanner = [
        image1,
        image2,
        image3,
        image4,
        image5,
    ];

    const mobileBanner = [
        mobileImage1,
        mobileImage2,
        mobileImage3,
        mobileImage4,
        mobileImage5,
    ];

    const nextImage = ()=>{
        if(desktopBanner.length -1 > currentImage){
            setCurrentImage(prev => (prev < desktopBanner.length - 1 ? prev + 1 : 0));
        }
    }

    const prevImage = ()=>{
        if(currentImage != 0){
            setCurrentImage(prev => (prev > 0 ? prev - 1 : desktopBanner.length - 1));
        }
    }

    useEffect(()=>{
        const interval = setInterval(()=>{
            if(desktopBanner.length -1 > currentImage){
                nextImage();
            }else{
                setCurrentImage(0);
            }
        },5000);

        return ()=>clearInterval(interval);
    },[currentImage]);

    return (
        <div className='container mx-auto px-4 overflow-hidden mt-4'>
            <div className='w-full h-48 md:h-72 bg-slate-200 rounded relative'>

                <div className='w-full h-full z-10 md:flex items-center absolute hidden'>
                    <div className='flex justify-between text-3xl w-full'>
                       <FaAngleLeft onClick={prevImage} className='bg-white rounded-full shadow-md p-1'/>
                       <FaAngleRight onClick={nextImage} className='bg-white rounded-full shadow-md p-1'/>
                    </div>
                </div>

                {/* Desktop or tablet purpose */}
                <div className='md:flex hidden h-full w-full overflow-hidden'>
                    {
                        desktopBanner.map((imageUrl, index) => {
                            return (
                                <div className='w-full h-full min-w-full min-h-full' key={index} style={{transform: `translate(-${currentImage * 100}%)`}}>
                                    <img src={imageUrl} alt={imageUrl} key={imageUrl} className='w-full h-full' />
                                </div>
                            )
                        })
                    }
                </div>

                {/* Mobile purpose */}
                <div className='md:hidden flex h-full w-full overflow-hidden'>
                    {
                        mobileBanner.map((imageUrl, index) => {
                            return (
                                <div className='w-full h-full min-w-full min-h-full' key={index} style={{transform: `translate(-${currentImage * 100}%)`}}>
                                    <img src={imageUrl} alt={imageUrl} key={imageUrl} className='w-full h-full object-center' />
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default BannerProduct