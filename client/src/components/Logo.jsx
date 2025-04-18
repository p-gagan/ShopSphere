import React from 'react'
import { Link, Outlet } from "react-router-dom";
import logoIcon from "../assest/Screenshot 2024-09-18 015852.png"


const Logo = () => {
  return (
    <Link to="/">
   <img className="rounded-full" src={logoIcon} alt="No image" height={60} width={140} />
   </Link>
  )
}

export default Logo



