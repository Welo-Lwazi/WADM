import React, { useState } from 'react'
import users from "../../Assets/Image/corporate/user.png"
import { useNavigate } from 'react-router-dom'

function CorporateForm() {
    const navigate = useNavigate()
    const [image, setImage] = useState("")
    const [img, setImg] = useState("")
    const [images, setImages] = useState("")
    const [imgs, setImgs] = useState("")

    const handleFile = (e) => {
        setImage(e.target.files[0])
        let imageData = URL.createObjectURL(e.target.files[0])
        setImg(imageData)
    }

    const handleFiles = (e) => {
        setImages(e.target.files[0])
        let imageData = URL.createObjectURL(e.target.files[0])
        setImgs(imageData)
    }

    return (
        <div className='fontNew'>
            <div className='bg-[#00042C] text-white h-[350px] w-full text-center'>
                <div className='py-20'>
                    <h1 className='2xl:text-[34px] xl:text-3xl text-2xl'>Corporate Customers</h1>
                    <p className='2xl:text-lg text-base mt-2'>Application Form</p>
                </div>
            </div>
            <div className='flex justify-center bg-white -mt-32 2xl:mx-40 xl:mx-28 lg:mx-24 mx-6'>
                <div className='md:my-10 my-5 w-full flex justify-center'>
                    <div className='2xl:w-[624px] xl:w-[521px] lg:w-[421px] md:w-[421px] w-full lg:mx-0 mx-3'>
                        <h4 className='text-lg font-semibold'>Personal Details</h4>
                        <div className='flex items-center my-5'>
                            {
                                imgs ?
                                    <img src={imgs} className='2xl:w-[106px] 2xl:h-[106px] w-[88px] h-[88px] rounded-full object-cover' alt="" />
                                    :
                                    <img src={users} className='2xl:w-[106px] 2xl:h-[106px] w-[88px] h-[88px] rounded-full' alt="" />
                            }
                            <div className='ms-5'>
                                <h4 className='text-base font-semibold'>Profile Image</h4>
                                <p className='text-xs my-2 text-[#9C9DA9]'>Png, JPG, up to 5 MB</p>
                                <div className='mt-6'>
                                    <label htmlFor="upload-photo" className='bg-[#FBFBFB] text-[#5A5A5A] border-dashed border-2 border-[#D9D9D9] py-3 px-5 rounded-lg text-sm font-normal'>Upload image</label>
                                    <input type="file" onChange={(e) => handleFiles(e)} className='hidden' id='upload-photo' accept='image/*' />
                                </div>
                            </div>
                        </div>
                        <div className='grid grid-cols-12'>
                            <div className='col-span-12 lg:col-span-6 2xl:col-span-6 mx-2 my-3'>
                                <p className='text-sm font-medium mb-3'>First name</p>
                                <input type="text" className='border-2 px-4 py-3 rounded-md w-full outline-[#00987C]' placeholder='Enter' />
                            </div>
                            <div className='col-span-12 lg:col-span-6 2xl:col-span-6 mx-2 my-3'>
                                <p className='text-sm font-medium mb-3'>Last name</p>
                                <input type="text" className='border-2 px-4 py-3 rounded-md w-full outline-[#00987C]' placeholder='Enter' />
                            </div>
                            <div className='col-span-12 mx-2 my-3'>
                                <p className='text-sm font-medium mb-3'>Mobile Number</p>
                                <input type="text" className='border-2 px-4 py-3 rounded-md w-full outline-[#00987C]' placeholder='Enter' />
                            </div>
                            <div className='col-span-12 mx-2 my-3'>
                                <p className='text-sm font-medium mb-3'>Email Address</p>
                                <input type="text" className='border-2 px-4 py-3 rounded-md w-full outline-[#00987C]' placeholder='Enter' />
                            </div>
                            <div className='col-span-12 mx-2 my-3'>
                                <p className='text-sm font-medium mb-3'>Date of Birth</p>
                                <div className='md:flex flex-wrap'>
                                    <input type="text" className='border-2 px-4 py-3 mr-2 rounded-md w-40 outline-[#00987C]' placeholder='Date' />
                                    <input type="text" className='border-2 px-4 py-3 mr-2 rounded-md w-40 outline-[#00987C]' placeholder='Month' />
                                    <input type="text" className='border-2 px-4 py-3 mr-2 rounded-md w-40 outline-[#00987C]' placeholder='Year' />
                                </div>
                            </div>
                        </div>
                        <h4 className='text-lg font-semibold mt-5 border-b pb-5'>Company Details</h4>
                        <div className='flex items-center my-5 pt-3'>
                            {
                                img ?
                                    <img src={img} className='2xl:w-[106px] 2xl:h-[106px] w-[88px] h-[88px] rounded-full object-cover' alt="" />
                                    :
                                    <img src={users} className='2xl:w-[106px] 2xl:h-[106px] w-[88px] h-[88px] rounded-full' alt="" />
                            }
                            <div className='ms-5'>
                                <h4 className='text-base font-semibold'>Profile Image</h4>
                                <p className='text-xs my-2 text-[#9C9DA9]'>Png, JPG, up to 5 MB</p>
                                <div className='mt-6'>
                                    <label htmlFor="upload-photos" className='bg-[#FBFBFB] text-[#5A5A5A] border-dashed border-2 border-[#D9D9D9] py-3 px-5 rounded-lg text-sm font-normal'>Upload image</label>
                                    <input type="file" onChange={(e) => handleFile(e)} className='hidden' id='upload-photos' accept='image/*' />
                                </div>
                            </div>
                        </div>
                        <div className='grid grid-cols-12'>
                            <div className='col-span-12 mx-2 my-3'>
                                <p className='text-sm font-medium mb-3'>Company Name</p>
                                <input type="text" className='border-2 px-4 py-3 rounded-md w-full outline-[#00987C]' placeholder='Enter' />
                            </div>
                            <div className='col-span-12 mx-2 my-3'>
                                <p className='text-sm font-medium mb-3'>Email Address</p>
                                <input type="text" className='border-2 px-4 py-3 rounded-md w-full outline-[#00987C]' placeholder='Enter' />
                            </div>
                            <div className='col-span-12 mx-2 my-3'>
                                <p className='text-sm font-medium mb-3'>Street Address</p>
                                <input type="text" className='border-2 px-4 py-3 rounded-md w-full outline-[#00987C]' placeholder='Enter' />
                            </div>
                            <div className='col-span-12 mx-2 my-3'>
                                <p className='text-sm font-medium mb-3'>Apt, Suite, etc...</p>
                                <input type="text" className='border-2 px-4 py-3 rounded-md w-full outline-[#00987C]' placeholder='Enter' />
                            </div>
                            <div className='col-span-12 lg:col-span-6 2xl:col-span-6 mx-2 my-3'>
                                <p className='text-sm font-medium mb-3'>City</p>
                                <input type="text" className='border-2 px-4 py-3 rounded-md w-full outline-[#00987C]' placeholder='Enter' />
                            </div>
                            <div className='col-span-12 lg:col-span-6 2xl:col-span-6 mx-2 my-3'>
                                <p className='text-sm font-medium mb-3'>State</p>
                                <input type="text" className='border-2 px-4 py-3 rounded-md w-full outline-[#00987C]' placeholder='Enter' />
                            </div>
                            <div className='col-span-12 lg:col-span-6 2xl:col-span-6 mx-2 my-3'>
                                <p className='text-sm font-medium mb-3'>Zip Code</p>
                                <input type="text" className='border-2 px-4 py-3 rounded-md w-full outline-[#00987C]' placeholder='Enter' />
                            </div>
                        </div>
                        <div className='flex justify-center my-10'>
                            <button className='bg-[#EA5F5F] px-20 py-3 rounded-md text-white' onClick={() => { navigate("/welo_admin/corporate_confirmed") }}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CorporateForm