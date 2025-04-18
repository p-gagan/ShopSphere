import React, { useContext, useState } from 'react'
import loginIcon from "../assest/signin.gif"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from 'axios';
import Context from '../context/main';


const Login = () => {
    let [showPassword, setShowPassword] = useState(true);
    let [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    let handleOnChange = (event) => {
        setFormData((prevData) => {
            return { ...prevData, [event.target.name]: event.target.value };
        });
    };

    const navigate = useNavigate();
    const {userInfo,countCartProduct} = useContext(Context);


    let handleOnSubmit = async(event) => {
        event.preventDefault();
       
        setFormData({
            email: "",
            password: "",
        });

        const dataResponse = await axios.post("http://localhost:8080/login",formData,{withCredentials:true});

        if (dataResponse.data.success) {
            toast.success(dataResponse.data.message);
            navigate("/");
            userInfo();
            countCartProduct();
        }

        if (dataResponse.data.error) {
            toast.error(dataResponse.data.message);
        }


    };

    let handleSetShowPassword = () => {
        setShowPassword((prev) => !prev);
    }

    return (
        <section id='login'>
            <div className='mx-auto p-4 container'>

                <div className='bg-white mx-auto p-5 max-w-sm'>

                    <div className='w-20 h-20 mx-auto'>
                        <img src={loginIcon} alt="loginIcon" />
                    </div>

                    <form className='pt-6 flex flex-col gap-2 ' onSubmit={handleOnSubmit}>

                        <div className=' grid'>
                            <label htmlFor="">Email : </label>
                            <div className='bg-slate-100 p-2'>
                                <input type="email" placeholder='Enter Email' required onChange={handleOnChange} value={formData.email} name='email' className='w-full h-full outline-none bg-transparent' />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="">Password : </label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input type={showPassword ? "password" : "text"} required placeholder='Enter Password' onChange={handleOnChange} value={formData.password} name='password' className='w-full h-full outline-none bg-transparent' />
                                <div className='text-xl cursor-pointer' onClick={handleSetShowPassword}>
                                    <span>
                                        {
                                            showPassword ? (
                                                <FaEyeSlash />
                                            ) :
                                                (
                                                    <FaEye />
                                                )
                                        }
                                    </span>
                                </div>
                            </div >

                            <Link to="/forgot-password" className='ml-auto w-fit block hover:text-red-600 hover:underline text-sm my-1'>Forgot Password ?</Link>

                        </div>

                        <div>
                            <button className='bg-red-500 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6 hover:bg-red-600'>Login</button>
                        </div>

                    </form>
                    <p className='my-5 text-sm'>Don't have account ? <Link to="/signup" className=' text-red-500 text-sm hover:text-red-700 hover:underline '>Sign up</Link></p>
                </div>


            </div>
        </section>
    )
}

export default Login