import axios from 'axios';
const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME_CLOUDINARY}/image/upload`;

const uploadImage = async(image) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset","mern_products");

    const response = await axios.post(url,formData);

    return response.data;
}

export default uploadImage