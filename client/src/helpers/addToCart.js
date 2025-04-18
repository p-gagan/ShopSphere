import axios from 'axios';
import {toast} from 'react-toastify'

const addTocart = async(event,id)=>{
    event?.stopPropagation();
    event?.preventDefault();

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const response = await axios.post(`${backendUrl}/cart/add`,{productId: id},{withCredentials: true});

    if(response.data.success){
        toast.success(response.data.message);
    }

    if(response.data.error){
        toast.error(response.data.message);
    }

}

export default addTocart