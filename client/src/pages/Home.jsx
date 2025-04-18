import React from 'react'
import ProductCategory from '../components/ProductCategory'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from "../components/HorizontalCardProduct"
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
   <div>
    <ProductCategory/>
    <BannerProduct/>

    <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpodes"}/>

    <HorizontalCardProduct category={"watches"} heading={"Popular Watches"}/>

    <VerticalCardProduct category={"mobiles"} heading={"Trending SmartPhones"}/>
    <VerticalCardProduct category={"mouse"} heading={"Mouse"}/>
    <VerticalCardProduct category={"camera"} heading={"Camera & Phototgraphy"}/>
    <VerticalCardProduct category={"earphones"} heading={"Wired Earphones"}/>
    <VerticalCardProduct category={"speakers"} heading={"Sound & Speaker"}/>
    <VerticalCardProduct category={"refridgerator"} heading={"Refridgerator"}/>
    <VerticalCardProduct category={"printers"} heading={"Printers"}/>
    <VerticalCardProduct category={"processor"} heading={"Processor"}/>
    <VerticalCardProduct category={"trimmers"} heading={"Trimmers"}/>

   </div>
  )
}

export default Home
