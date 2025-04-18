import axios from 'axios';
import {toast} from 'react-toastify'

const addTocart = async(event,id)=>{
    event?.stopPropagation();
    event?.preventDefault();

    const response = await axios.post("http://localhost:8080/cart/add",{productId: id},{withCredentials: true});

    if(response.data.success){
        toast.success(response.data.message);
    }

    if(response.data.error){
        toast.error(response.data.message);
    }

}

export default addTocart