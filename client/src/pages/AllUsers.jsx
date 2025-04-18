import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import moment from "moment";
import { MdEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    name: "",
    email: "",
    role: "",
    _id: "",
  })

  const fetchAllUsers = async () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const response = await axios.get(`${backendUrl}/admin-panel/all-users`, { withCredentials: true });

    if (response.data.success) {
      setAllUsers(response.data.data);
    }

    if (response.data.error) {
      toast.error(response.data.message);
    }
  }

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className='bg-white pb-4'>
      <table className='w-full userTable'>
        <thead>
          <tr className='bg-black text-white'>
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Registered at</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {
            allUsers.map((ele, ind) => {
              return (
                <tr>
                  <td>{ind + 1}</td>
                  <td>{ele?.name}</td>
                  <td>{ele?.email}</td>
                  <td>{ele?.role}</td>
                  <td>{moment(ele?.createdAt).format('ll')}</td>
                  <td>
                    <button className='bg-green-200 p-2 rounded-full hover:bg-green-400 hover:text-white'
                     onClick={ 
                      (prev)=>{
                        setUpdateUserDetails(ele);
                        setOpenUpdateRole(true)
                    }}
                     >
                      <MdEdit />
                    </button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>

      </table>

      {
        openUpdateRole && (
          <ChangeUserRole
           handleOnClick={()=>setOpenUpdateRole(false)}
           name={updateUserDetails.name}
           email={updateUserDetails.email}
           role={updateUserDetails.role}
           userId={updateUserDetails._id}
           callFunc={fetchAllUsers}
            />

        )
      }


    </div>
  )
}

export default AllUsers