import React, { useState } from 'react'
import loginIcon from "../assest/signin.gif"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, Outlet, useNavigate } from "react-router-dom";
import imageTobase64 from '../helpers/imageTobase64';
import axios from 'axios';
import { toast } from 'react-toastify';

const signUp = () => {
    let [showPassword, setShowPassword] = useState(true);
    let [showConfirmPassword, setShowConfirmPassword] = useState(true);
    let [error, setError] = useState('');

    let [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        profilePic: ""
    });

    let handleOnChange = (event) => {
        setFormData((prevData) => {
            return { ...prevData, [event.target.name]: event.target.value };
        });
    };

    let navigate = useNavigate();

    let handleOnSubmit = async (event) => {
        event.preventDefault();

        setError(" ");

        if (formData.password != formData.confirmPassword) {
            setError("Password not match!, Try again...");
            return;
        }

        try {
            // const { confirmPassword, ...dataToSend } = formData;
            // console.log(dataToSend);
            const getUser = await axios.post("http://localhost:8080/signup", formData);

            // console.log(getUser.data);

            setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                profilePic: ""
            });

            if (getUser.data.success) {
                toast.success(getUser.data.message);
                navigate("/login");
            }

            if (getUser.data.error) {
                toast.error(getUser.data.message);
            }
            
        } catch (error) {
            setError(error.getuser?.data?.message || "Failed to sign up. Please try again..");
            toast.error(getUser.data.message);
        }

    };

    let handlePicChange = async (event) => {
        const file = event.target.files[0];

        try {
            const compressedImage = await imageTobase64(file);

            setFormData((prev) => {
                return { ...prev, profilePic: compressedImage };
            });

            console.log("file:", compressedImage);
        } catch (error) {
            console.error("Error compressing and converting image:", error);
        }

    };

    let handleSetShowPassword = () => {
        setShowPassword((prev) => !prev);
    }

    let handleSetShowConfirmPassword = () => {
        setShowConfirmPassword((prev) => !prev);
    }

    return (
        <section id='login'>
            <div className='mx-auto p-4 container'>

                <div className='bg-white mx-auto p-5 max-w-sm'>

                    <div className='w-20 h-20 mx-auto relative rounded-full overflow-hidden '>
                        <div>
                            <img src={formData.profilePic || loginIcon} alt="loginIcon" />
                        </div>

                        <form>
                            <label >
                                <input className='hidden' type="file" onChange={handlePicChange} />
                                <div className='text-xs bg-slate-200 bg-opacity-80 pt-2 pb-4 cursor-pointer w-full text-center absolute bottom-0 '>
                                    Upload Photo
                                </div>
                            </label>
                        </form>
                    </div>

                    <form className='pt-6 flex flex-col gap-2 ' onSubmit={handleOnSubmit}>

                        <div className=' grid'>
                            <label htmlFor="">Name : </label>
                            <div className='bg-slate-100 p-2'>
                                <input type="text" placeholder='Enter Name' id='Name' required onChange={handleOnChange} value={formData.name} name='name' className='w-full h-full outline-none bg-transparent' />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="">Email : </label>
                            <div className='bg-slate-100 p-2'>
                                <input type="email" placeholder='Enter Email' id='Email' required onChange={handleOnChange} value={formData.email} name='email' className='w-full h-full outline-none bg-transparent' />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="">Password : </label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input type={showPassword ? "password" : "text"} id='Password' required placeholder='Enter Password' onChange={handleOnChange} value={formData.password} name='password' className='w-full h-full outline-none bg-transparent' />
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
                        </div>

                        <div>
                            <label htmlFor="">Confirm Password : </label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input type={showConfirmPassword ? "password" : "text"} id='Confirm Password' required placeholder='Enter Confirm Password' onChange={handleOnChange} value={formData.confirmPassword} name='confirmPassword' className='w-full h-full outline-none bg-transparent' />
                                <div className='text-xl cursor-pointer' onClick={handleSetShowConfirmPassword}>
                                    <span>
                                        {
                                            showConfirmPassword ? (
                                                <FaEyeSlash />
                                            ) :
                                                (
                                                    <FaEye />
                                                )
                                        }
                                    </span>
                                </div>
                            </div >

                        </div>

                        <div>
                            <button className='bg-red-500 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6 hover:bg-red-600'>Sign Up</button>
                        </div>

                    </form>
                    <p className='my-5 text-sm'>Already have account ? <Link to="/login" className=' text-red-500 text-sm hover:text-red-700 hover:underline '>Login</Link></p>
                </div>


            </div>
        </section>
    )
}

export default signUp