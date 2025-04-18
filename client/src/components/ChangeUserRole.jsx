import React, { useState } from 'react';
import ROLE from '../helpers/role';
import { IoClose } from "react-icons/io5";
import axios from 'axios';
import { toast } from 'react-toastify';

const ChangeUserRole = ({name,email,role,handleOnClick,userId,callFunc}) => {
    const [userRole, setUserRole] = useState(role);

    const handleOnChange = (e)=>{
        setUserRole(e.target.value);
    }

    const updateUserRole = async()=>{
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            const response = await axios.post(`${backendUrl}/admin-panel/update-user`,{role:userRole,userId:userId},{withCredentials:true});

            if(response.data.success){
                toast.success(response.data.message);
                handleOnClick();
                callFunc();
            }

            console.log(response.data);
    }

    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-40 flex justify-between items-center bg-slate-200 bg-opacity-50'>
            <div className='bg-white mx-auto shadow-md p-4 w-full max-w-sm'>
                <button className='block ml-auto' onClick={handleOnClick}>
                    <IoClose />
                </button>

                <h1 className='pb-4 text-lg font-medium'>Change User Role</h1>

                <p>Name: {name}</p>
                <p>Email: {email}</p>

                <div className='flex items-center justify-between my-4'>
                    <p>Role:</p>
                    <select className='border px-4 py-1' value={userRole} onChange={handleOnChange}>
                        {
                            Object.values(ROLE).map(el => {
                                return (
                                    <option value={el} key={el}>{el}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <button className='w-fit mx-auto block py-1 px-3 rounded-full bg-red-600 text-white hover:bg-red-700 ' onClick={updateUserRole}>Change Role</button>
            </div>

        </div>
    )
}

export default ChangeUserRole