import React, { useState } from 'react'
import users from "../../Assets/Image/corporate/user.png";

function PersonalInformation() {
    
    const [image, setImage] = useState("")
    const [img, setImg] = useState("")

    const handleFile = (e) => {
        setImage(e.target.files[0])
        let imageData = URL.createObjectURL(e.target.files[0])
        setImg(imageData)
    }

    return (
        <div className='md:m-4 m-1 fontNew'>
            <div className='bg-white sm:p-6 p-4 rounded-lg'>
                <div className='flex items-center'>
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
                            <label htmlFor="upload-photo" className='bg-[#FBFBFB] text-[#5A5A5A] border-dashed border-2 border-[#D9D9D9] sm:py-3 py-2 px-5 rounded-lg text-sm font-normal'>Upload image</label>
                            <input type="file" onChange={(e) => handleFile(e)} className='hidden' id='upload-photo' accept='image/*' />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-12 mt-6">
                    <div className='sm:col-span-6 col-span-12 sm:mx-4 mx-0 my-3'>
                        <div className='flex text-sm font-medium mb-2'>
                            <label className='mr-2' htmlFor="firstName">First Name</label>
                        </div>
                        <input name="firstName" type="text" className="input border-[1px] py-2 px-3 w-full rounded-md outline-[#029D79]" />
                    </div>
                    <div className='sm:col-span-6 col-span-12 sm:mx-4 mx-0 my-3'>
                        <div className='flex text-sm font-medium mb-2'>
                            <label className='mr-2' htmlFor="lastName">Last Name</label>
                        </div>
                        <input name="lastName" type="text" className="input border-[1px] py-2 px-3 w-full rounded-md outline-[#029D79]" />
                    </div>
                    <div className='sm:col-span-6 col-span-12 sm:mx-4 mx-0 my-3'>
                        <div className='flex text-sm font-medium mb-2'>
                            <label className='mr-2' htmlFor="jobTitle">Email</label>
                        </div>
                        <input name="jobTitle" type="text" className="input border-[1px] py-2 px-3 w-full rounded-md outline-[#029D79]" />
                    </div>
                </div>
                <button type="submit" className="btn-primary sm:mx-4 mx-0 mt-10 bg-[#00987C] px-20 py-3 rounded-lg text-white text-base">
                    Save
                </button>
            </div>
        </div>
    )
}

export default PersonalInformation