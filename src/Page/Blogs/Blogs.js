import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import FormSelect from '../../Base-Component/FormSelect/FormSelect'
import search from "../../Assets/Image/corporate/Search.png"
import nodata from "../../Assets/Image/corporate/nodata.png"
import photo1 from "../../Assets/Image/admin/blog1.png"
import photo2 from "../../Assets/Image/admin/blog2.png"
import photo3 from "../../Assets/Image/admin/blog3.png"
import photo4 from "../../Assets/Image/admin/blog4.png"
import photo5 from "../../Assets/Image/admin/blog5.png"
import photo6 from "../../Assets/Image/admin/blog6.png"
import photo7 from "../../Assets/Image/admin/blog7.png"
import photo8 from "../../Assets/Image/admin/blog8.png"
import close from "../../Assets/Image/admin/close.png"
import Dialog from '../../Base-Component/Dialog/Dialog'
import back1 from "../../Assets/Image/corporate/background2.png"
import edit from "../../Assets/Image/corporate/edit.png"
import deletes from "../../Assets/Image/corporate/delete.png"

function Blogs() {
    const location = useLocation()
    const navigate = useNavigate()
    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isModalOpens, setModalOpens] = useState(false)
    const [isDelete, setIsDelete] = useState(false)

    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [pageNo, setPageNo] = useState(1)
    const [totalPage, setTotalPage] = useState(3)

    const [searchData, setSearchData] = useState("")
    const [handelSelect, setHandleSelect] = useState("")
    const [handelSelectDate, setHandleSelectDate] = useState("")
    const [handelSelectId, setHandleSelectId] = useState("")
    const [image, setImage] = useState("")
    const [img, setImg] = useState("")

    const [userData, setUserData] = useState([
        {
            id: "#61",
            date: "14 Mar, 2024",
            image: photo1,
            title: "Health screening, Mental health clinic",
        },
        {
            id: "#62",
            date: "14 Mar, 2024",
            image: photo2,
            title: "Health screening, Mental health clinic",
        },
        {
            id: "#63",
            date: "14 Mar, 2024",
            image: photo3,
            title: "Health screening, Mental health clinic",
        },
        {
            id: "#64",
            date: "14 Mar, 2024",
            image: photo4,
            title: "Health screening, Mental health clinic",
        },
        {
            id: "#65",
            date: "4 Mar, 2024",
            image: photo5,
            title: "Health screening, Mental health clinic",
        },
        {
            id: "#66",
            date: "14 Mar, 2024",
            image: photo6,
            title: "Health screening, Mental health clinic",
        },
        {
            id: "#67",
            date: "14 Mar, 2024",
            image: photo7,
            title: "Health screening, Mental health clinic",
        },
        {
            id: "#68",
            date: "14 Mar, 2024",
            image: photo8,
            title: "Health screening, Mental health clinic",
        },
    ])

    const renderPaginationButtonss = () => {
        const maxPagesToShow = 3;
        const buttons = [];
        const startPage = Math.max(1, pageNo - Math.floor(maxPagesToShow / 2));
        const endPage = Math.min(totalPage, startPage + maxPagesToShow - 1);

        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={i === pageNo ? 'px-4 py-[7px] mx-1 bg-[#EA5F5F1A] rounded-md text-[#EA5F5F]' : 'px-4 py-[7px] mx-1 text-[#EA5F5F]'}
                >
                    {i}
                </button>
            );
        }
        return buttons;
    };

    const handlePageChange = (page) => {
        setPageNo(page);
    }

    const startDragging = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
        document.body.style.userSelect = 'none';
    };

    const stopDragging = () => {
        setIsDragging(false);
        document.body.style.userSelect = '';
    };

    const onDragging = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleFile = (e) => {
        setImage(e.target.files[0])
        let imageData = URL.createObjectURL(e.target.files[0])
        setImg(imageData)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("successfully")
    }

    return (
        <>
            <div className='grid grid-cols-12 gap-2 md:m-4 m-1 fontNew'>
                <div className="col-span-12">
                    <div className='flex flex-wrap justify-between items-center'>
                        <h1 className='text-2xl font-semibold sm:mb-0 mb-3'>Blogs</h1>
                        <div className='flex flex-wrap items-center justify-end'>
                            <div className='flex sm:w-70 w-full h-10 px-4 sm:mr-3 mr-0 rounded-xl bg-white items-center'>
                                <input
                                    type="text"
                                    required
                                    className='bg-transparent border-none outline-none sm:w-70 w-full h-10 text-sm fontNew'
                                    placeholder='Search...'
                                    name='search_text'
                                    value={searchData}
                                    onChange={(e) => setSearchData(e.target.value)}
                                />
                                <img src={search} className='p-2 w-10 cursor-pointer' alt="" />
                            </div>
                            <button type="button" onClick={() => setModalOpens(true)} className="btn btn-primary bg-[#14151E] px-6 py-2 rounded-lg sm:mt-0 mt-3 text-white text-sm">
                                Add Blog
                            </button>
                        </div>
                    </div>
                </div>
                {
                    userData == "" ?
                        <div className='col-span-12 h-[50vh] justify-center flex items-center'>
                            <img src={nodata} className='w-28' alt="" />
                        </div>
                        :
                        <>
                            <div className='col-span-12'>
                                <div
                                    className='w-full overflow-auto'
                                    onMouseDown={startDragging}
                                    onMouseLeave={stopDragging}
                                    onMouseUp={stopDragging}
                                    onMouseMove={onDragging}
                                    ref={scrollRef}
                                >
                                    <table className='w-full border-separate border-spacing-y-3'>
                                        <tr className='bg-white'>
                                            <th className='py-4 px-3 text-base font-medium whitespace-nowrap text-start first:rounded-l-lg last:rounded-r-lg'>
                                                <FormSelect id="page" name="page_no" className="selects-arrow-hidden outline-none w-52 text-base" value={handelSelectDate} onChange={(e) => setHandleSelectDate(e.target.value)}>
                                                    <option value="5">Blog Published On</option>
                                                    <option value="10">10</option>
                                                    <option value="15">15</option>
                                                </FormSelect>
                                            </th>
                                            <th className='py-4 px-3 text-base font-medium whitespace-nowrap text-start first:rounded-l-lg last:rounded-r-lg'>Blog ID</th>
                                            <th className='py-4 px-3 text-base font-medium whitespace-nowrap text-start first:rounded-l-lg last:rounded-r-lg'>Blog Image</th>
                                            <th className='py-4 px-3 text-base font-medium whitespace-nowrap text-start first:rounded-l-lg last:rounded-r-lg'>Blog Title</th>
                                            <th className='py-4 px-3 text-base font-medium whitespace-nowrap text-start first:rounded-l-lg last:rounded-r-lg'>Action</th>
                                        </tr>
                                        {
                                            userData.map((item, index) => {
                                                return (
                                                    <tr key={index}
                                                        className='font-medium bg-white'
                                                    >
                                                        <td className='text-start p-4 first:rounded-l-lg last:rounded-r-lg'>
                                                            <div className='whitespace-nowrap'>
                                                                {item.date}
                                                            </div>
                                                        </td>
                                                        <td className='text-start p-4 first:rounded-l-lg last:rounded-r-lg'>
                                                            <div className='whitespace-nowrap'>
                                                                {item.id}
                                                            </div>
                                                        </td>
                                                        <td className='text-start p-4 first:rounded-l-lg last:rounded-r-lg'>
                                                            <div className='whitespace-nowrap'>
                                                                <img src={item.image} className='w-14 h-14' alt="" />
                                                            </div>
                                                        </td>
                                                        <td className='text-start p-4 first:rounded-l-lg last:rounded-r-lg'>
                                                            <div className='whitespace-nowrap w-80 truncate'>
                                                                {item.title}
                                                            </div>
                                                        </td>
                                                        <td className='p-4 first:rounded-l-lg last:rounded-r-lg'>
                                                            <div className='flex items-center justify-start w-20'>
                                                                <img onClick={() => setModalOpens(true)} src={edit} className='lg:w-9 w-8 mr-4 cursor-pointer' alt="Edit" />
                                                                <img onClick={() => setIsDelete(true)} src={deletes} className='lg:w-9 w-8 cursor-pointer' alt="Delete" />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </table>
                                </div>
                            </div>
                            <div className='col-span-12 flex flex-wrap items-center sm:justify-between justify-center bg-white py-4 sm:px-8 px-0 rounded-lg'>
                                <div className='flex items-center'>
                                    <p>Show Result</p>
                                    <div>
                                        <FormSelect id="page" name="page_no" className="outline-none px-2 ms-3" value={handelSelect} onChange={(e) => setHandleSelect(e.target.value)}>
                                            <option value="5">5</option>
                                            <option value="10">10</option>
                                            <option value="15">15</option>
                                        </FormSelect>
                                    </div>
                                </div>
                                <div className='flex items-center cursor-pointer'>
                                    <p onClick={() => handlePageChange(pageNo - 1)} disabled={pageNo === 1}>
                                        Previous
                                    </p>
                                    <div className="flex items-center mx-6">
                                        {renderPaginationButtonss()}
                                    </div>
                                    <p onClick={() => handlePageChange(pageNo + 1)} disabled={pageNo === totalPage}>
                                        Next
                                    </p>
                                </div>
                            </div>
                        </>
                }
            </div>

            <Dialog
                open={isModalOpens}
                onClose={() => setModalOpens(false)}
                size='xxl'
            >
                <Dialog.Panel>
                    <Dialog.Description className="rounded-none border-2 border-white ">
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-12 fontNew md:px-[30px] px-[10px] bg-white overflow-auto sm:w-auto w-[350px] md:h-[650px] h-[500px]">
                                <div className="col-span-12 py-4">
                                    <h1 className=' text-xl font-medium'>Add Blog</h1>
                                </div>
                                <div className='col-span-12'>
                                    <div className='border-2 border-dashed h-[222px] p-2 flex justify-center items-center'>
                                        {
                                            img ?
                                                <div className='flex items-start'>
                                                    <img src={img} className='w-full h-[200px]' alt="" />
                                                    <img src={close} onClick={() => { setImg("") }} className='w-6 -ml-4 cursor-pointer' alt="" />
                                                </div>
                                                :
                                                <div className='text-center'>
                                                    <p className='font-medium md:text-base text-sm mb-2'>Blog Image</p>
                                                    <p className='text-gray-400 text-sm'>Png, JPG, up to 5 MB</p>
                                                    <div className='py-6'>
                                                        <label htmlFor="upload-photo" className='bg-[#FBFBFB] text-[#5A5A5A] border-dashed border-2 border-[#D9D9D9] sm:py-3 py-2 px-5 rounded-lg text-sm font-normal'>Upload image</label>
                                                        <input type="file" required onChange={(e) => handleFile(e)} className='hidden' id='upload-photo' accept='image/*' />
                                                    </div>
                                                </div>
                                        }
                                    </div>
                                </div>
                                <div className='col-span-12 my-4'>
                                    <p className='text-sm font-medium mb-3'>Blog Title</p>
                                    <input type="text" required className='border-2 px-4 py-3 rounded-[12px] w-full outline-[#00987C]' placeholder='Enter Blog Tilte' />
                                </div>
                                <div className='col-span-12 mt-4'>
                                    <p className='text-sm font-medium mb-3'>Blog Description</p>
                                    <textarea name="" required rows={5} placeholder='Enter Blog Description' className='w-full outline-[#00987C] py-3 px-4 border-2 rounded-[12px]' id=""></textarea>
                                </div>
                                <div className="col-span-12 flex justify-cente my-4 mx-auto">
                                    <button type="submit" className="btn btn-primary bg-[#14151E] w-[226px] py-2 mt-2 mr-3 rounded-lg text-white text-sm">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </Dialog.Description>
                </Dialog.Panel>
            </Dialog>

            <Dialog
                open={isDelete}
                onClose={() => setIsDelete(false)}
                size="2xl"
            >
                <Dialog.Panel>
                    <Dialog.Description className="rounded-none border-2 border-white">
                        <div className='flex justify-center text-center my-4 sm:px-16 px-4 fontNew'>
                            <div>
                                <h1 className='text-xl font-semibold text-black mt-6'>Delete Blog?</h1>
                                <p className='text-base text-gray-500 my-3'>Are you sure want to delete this Blog ?</p>
                                <div className='flex mt-13 mb-5'>
                                    <button className='bg-[#F4F5FA] py-[14px] sm:w-36 w-30 text-sm rounded-xl sm:mx-3 mx-2' onClick={() => setIsDelete(false)}>Close</button>
                                    <button className='bg-[#EA5F5F] py-[14px] sm:w-36 w-30 text-sm rounded-xl sm:mx-3 mx-2 text-white' onClick={() => setIsDelete(false)}>Yes, Delete</button>
                                </div>
                            </div>
                        </div>
                    </Dialog.Description>
                </Dialog.Panel>
            </Dialog>
        </>
    )
}

export default Blogs