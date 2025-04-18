import React, { useContext, useEffect, useState } from 'react'
import Logo from './Logo'
import { Link, Outlet, useNavigate } from "react-router-dom";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setUserDetails } from '../features/user/userSlice';
import ROLE from '../helpers/role';
import Context from "../context/main";

const Header = () => {

  const [menu, setMenu] = useState(false);

  const handleOnClick = () => {
    return setMenu((prev) => !prev);
  }

  const user = useSelector(state => state?.user?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Context
  const context = useContext(Context);

  const handleLogout = async () => {

    const response = await axios.get("http://localhost:8080/logout", { withCredentials: true });

    if (response.data.success) {
      toast.success(response.data.message);
      dispatch(setUserDetails(null));
    }
    if (response.data.error) {
      toast.error(response.data.message);
    }
  };

  useEffect(()=>{
    context.countCartProduct();
  },[]);

  const handleSearch = async(event)=>{
    const {value} = event.target;

    if(value){
      navigate(`/search?q=${value}`);
    }else{
      navigate("/search")
    }
  }

  return (
    <header className='h-16 shadow-md bg-white w-full fixed z-40'>

      <div className='h-full container mx-auto flex items-center px-2 justify-between'>

        <div className=''>
          <Logo />
        </div>

        <div className='hidden lg:flex items-center w-full justify-between max-w-sm pl-4 border rounded-full focus-within:shadow'>
          <input className='w-full outline-none' type="text" placeholder='search product here..' onChange={handleSearch}/>
          <div className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white'><GrSearch /></div>
        </div>

        <div className='flex items-center gap-7'>

          <div className='relative flex justify-center' >

            {
              user?._id && (
                <div className='text-3xl cursor-pointer relative flex justify-center' onClick={handleOnClick}>
                  {
                    user?.profilePic ? (
                      <img src={user?.profilePic} className='w-10 h-10 rounded-full ' alt={user?.name} />
                    ) : (
                      <FaRegCircleUser />
                    )
                  }
                </div>
              )
            }


            {
              menu && (
                <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded hidden md:block'>
                  <nav>

                    {
                      user?.role == ROLE.ADMIN && (
                        <Link to="/admin-panel/all-products" className=' whitespace-nowrap hover:bg-slate-100 p-2' onClick={handleOnClick}>Admin Panel</Link>

                      )
                    }

                  </nav>
                </div>
              )
            }
          </div>

          {
            user?._id && (
              <Link to={"/cart-products"} className='text-2xl cursor-pointer relative'>

                <span><FaShoppingCart /></span>

                <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                  <p className='text-sm'>{context.countCart}</p>
                </div>

              </Link>
            )
          }

          <div>
            {
              user?._id ? (
                <button onClick={handleLogout} className='bg-red-600 px-3 py-1 rounded-full text-white hover:bg-red-700'>Logout</button>
              ) : (
                <Link to="/login">
                  <button className='bg-red-600 px-3 py-1 rounded-full text-white hover:bg-red-700'>Login</button>
                </Link>
              )
            }

          </div>

        </div>

      </div>
    </header>
  )
}

export default Header
