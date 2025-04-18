import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import ProductCategory from "../helpers/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminEditProduct = ({ onClose, data, fetchData }) => {
    //usestate for product info
    const [productData, setProductData] = useState({
        _id: data?._id,
        productName: data?.productName,
        brandName: data?.brandName,
        category: data?.category,
        productImage: data?.productImage || [],
        description: data?.description,
        price: data?.price,
        sellingPrice: data?.sellingPrice,
    });

    //usestate for displaying a large
    const [openDisplayImage, setOpenDisplayImage] = useState(false);
    const [displayFullImage, setDisplayFullImage] = useState("");

    //onChange functionality for product info
    const handleOnChange = (event) => {
        setProductData((prev) => {
            return { ...prev, [event.target.name]: event.target.value };
        })
    };

    //functionality to uplaod a image on cloudinary and get it from to show 
    const handleProductUpload = async (event) => {
        const file = event.target.files[0];

        const uploadCloudinaryImage = await uploadImage(file);

        setProductData((prev) => {
            return {
                ...prev,
                productImage: [...prev.productImage, uploadCloudinaryImage.url]
            };
        })
    };

    //delete a particular image
    const handleDelete = async (index) => {
        const updatedProductImage = [...productData.productImage];
        updatedProductImage.splice(index, 1);

        setProductData((prev) => {
            return {
                ...prev,
                productImage: [...updatedProductImage]
            };
        })
    };

    //handle submit functionality of form
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(productData);
        const response = await axios.post("http://localhost:8080/product/update", productData, { withCredentials: true });

        console.log(response.data);
        if (response.data.success) {
            toast.success(response.data.message);
            onClose();
            fetchData();
        }

        if (response.data.error) {
            toast.error(response.data.error);
        }

        console.log(response.data.data);


        setProductData({
            productName: "",
            brandName: "",
            category: "",
            productImage: [],
            description: "",
            price: "",
            sellingPrice: "",
        })
    }
    return (
        <div className='w-full h-full bg-slate-500 bg-opacity-50 top-0 bottom-0 left-0 right-0 fixed flex justify-center items-center'>

            <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>

                <div className='flex justify-between items-center pb-3'>
                    <h2 className='font-bold text-lg'>Edit Product</h2>
                    <button className='text-2xl block ml-auto hover:text-red-600 cursor-pointer' onClick={onClose}><IoClose /></button>
                </div>


                <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
                    <label htmlFor="productName">Product Name :</label>
                    <input
                        type="text"
                        id='productName'
                        placeholder='Enter Product Name'
                        name='productName'
                        value={productData.productName}
                        onChange={handleOnChange}
                        required
                        className='p-2 bg-slate-100 border rounded'
                    />


                    <label htmlFor="brandName" className='mt-3'>Brand Name :</label>
                    <input
                        type="text"
                        id='brandName'
                        placeholder='Enter Brand Name'
                        name='brandName'
                        value={productData.brandName}
                        required
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded' category
                    />

                    <label htmlFor="category" className='mt-3'>Category :</label>
                    <select
                        value={productData.category}
                        className='p-2 bg-slate-100 border rounded'
                        id="category"
                        name='category'
                        required
                        onChange={handleOnChange}
                    >
                        <option value=" " >Select Category</option>
                        {
                            ProductCategory.map((ele, ind) => {
                                return (
                                    <option value={ele.value} key={ele.value + ind}>{ele.label}</option>
                                )
                            })
                        }
                    </select>

                    <label htmlFor="productImage" className='mt-3'>Product Image :</label>

                    <label htmlFor="uploadProductImage">

                        <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                            <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                                <span className='text-4xl'><FaCloudUploadAlt /></span>
                                <p className='text-sm'>Upload Product Image</p>
                                <input
                                    type="file"
                                    className='hidden'
                                    id='uploadProductImage'
                                    name='productImage'

                                    onChange={handleProductUpload}
                                />
                            </div>
                        </div>

                    </label>

                    <div>
                        {
                            productData?.productImage[0] ? (
                                <div className='flex items-center gap-2'>
                                    {
                                        productData.productImage.map((ele, index) => {
                                            return (

                                                <div className='relative group'>
                                                    <img src={ele} alt='ele' width={80} height={80} className='bg-slate-100 border cursor-pointer ' onClick={() => {
                                                        setOpenDisplayImage(true)
                                                        setDisplayFullImage(ele)
                                                    }} />

                                                    <div className=' absolute bottom-0 right-0 text-red-500 p-[2px] hover:text-red-700 hidden group-hover:block' onClick={() => { handleDelete(index) }}>
                                                        <MdDelete />
                                                    </div>

                                                </div>


                                            )
                                        })
                                    }
                                </div>
                            ) : (
                                <p className='text-red-600 text-xs'>*Please upload product Image</p>
                            )
                        }
                    </div>

                    <label htmlFor="price" className='mt-3'>Price :</label>
                    <input
                        type="number"
                        id='price'
                        placeholder='Enter Price'
                        name='price'
                        value={productData.price}
                        onChange={handleOnChange}
                        required
                        className='p-2 bg-slate-100 border rounded' category
                    />

                    <label htmlFor="sellingPrice" className='mt-3'>Selling Price :</label>
                    <input
                        type="number"
                        id='sellingPrice'
                        placeholder='Enter Selling Price'
                        name='sellingPrice'
                        required
                        value={productData.sellingPrice}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded' category
                    />

                    <label htmlFor="description" className='mt-3'>Description :</label>
                    <textarea
                        name="description"
                        id="description"
                        value={productData.description}
                        onChange={handleOnChange}
                        required
                        rows={3}
                        placeholder='Enter description of Product'
                        className='bg-slate-100 border resize-none h-28 p-1'>

                    </textarea>


                    <button className='px-3 py-2 bg-red-600 mb-10 text-white hover:bg-red-700'>Update Product</button>


                </form>
            </div>

            {/* display full image */}
            {
                openDisplayImage && (

                    <DisplayImage onClose={() => { setOpenDisplayImage(false) }} imgUrl={displayFullImage} />
                )

            }
        </div>
    )
}

export default AdminEditProduct