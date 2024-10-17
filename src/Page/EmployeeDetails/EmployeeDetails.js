import React, { useRef, useState } from 'react'
import background from "../../Assets/Image/corporate/background1.png"
import { useLocation, useNavigate } from 'react-router-dom'
import deletes from "../../Assets/Image/corporate/delete.png"
import back from "../../Assets/Image/corporate/back.png";
import message from "../../Assets/Image/corporate/message.png";
import call from "../../Assets/Image/corporate/call.png";
import FormSelect from '../../Base-Component/FormSelect/FormSelect'
import pdf from "../../Assets/Image/corporate/pdf.png"
import search from "../../Assets/Image/corporate/Search.png"
import nodata from "../../Assets/Image/corporate/nodata.png"
import men1 from "../../Assets/Image/corporate/men6.png"
import backs from "../../Assets/Image/corporate/background2.png"
import Dialog from '../../Base-Component/Dialog/Dialog'
import { newName } from '../../Services/Api'

function EmployeeDetails() {
    const location = useLocation()
    const navigate = useNavigate()
    const scrollRef = useRef(null);

    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [pageNo, setPageNo] = useState(1)
    const [totalPage, setTotalPage] = useState(3)

    const [isModalOpens, setModalOpens] = useState(false)
    const [isDragging, setIsDragging] = useState(false);

    const [searchData, setSearchData] = useState("")
    const [handelSelect, setHandleSelect] = useState("")
    const [handelSelectId, setHandleSelectId] = useState("")

    const [userData, setUserData] = useState([
        {
            id: "#6790",
            date: "14 Mar, 2024",
            image: men1,
            name: "Cameron Williamson",
            service: "Health screening, Mental health clinic"
        },
        {
            id: "#6790",
            date: "14 Mar, 2024",
            image: men1,
            name: "Cameron Williamson",
            service: "Health screening, Mental health clinic"
        },
        {
            id: "#6790",
            date: "14 Mar, 2024",
            image: men1,
            name: "Cameron Williamson",
            service: "Health screening, Mental health clinic"
        },
        {
            id: "#6790",
            date: "14 Mar, 2024",
            image: men1,
            name: "Cameron Williamson",
            service: "Health screening, Mental health clinic"
        },
        {
            id: "#6790",
            date: "14 Mar, 2024",
            image: men1,
            name: "Cameron Williamson",
            service: "Health screening, Mental health clinic"
        },
    ])

    let userDatas;
    let cusData;
    try {
        const { Data, News } = location.state;
        userDatas = Data
        cusData = News
    } catch (error) {
        console.log("error");
    }

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
    };

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

    const handleBack = (data) => {
        navigate("/welo_admin/customers/customer_details", { state: { Data: data } })
    }

    return (
        <div className='md:m-4 m-1'>
            <div className='flex items-center cursor-pointer fontNew my-4'>
                <img src={back} onClick={() => handleBack(cusData)} className='w-4' alt="" />
                <p onClick={() => handleBack(cusData)} className='text-base font-medium ms-3'>Go back</p>
            </div>

            <div className='grid grid-cols-12 gap-4 fontNew'>
                <div className='2xl:col-span-4 xl:col-span-5 lg:col-span-6 col-span-12'>
                    <div className='bg-white rounded-xl'>
                        <div className='text-white rounded-t-xl' >
                            <img src={background} className='w-full h-32' alt="" />
                            <div className='flex justify-between mx-10'>
                                <img src={userDatas.image || ""} className='sm:w-[110px] sm:h-[110px] w-[100px] h-[100px] -mt-12 rounded-full border-[3px] border-white' alt="" />
                                <div onClick={() => setModalOpens(true)} className='flex mt-4 cursor-pointer'>
                                    <img src={deletes} className='lg:w-9 w-8 lg:h-9 h-8 object-cover' alt="" />
                                </div>
                            </div>
                            <div className='text-black mx-10 py-2'>
                                <h1 className='text-lg font-semibold pb-2'>{userDatas.name}</h1>
                                <h4 className='text-sm text-gray-500'>Product Manager</h4>
                                <div className='flex items-center my-6'>
                                    <img src={message} className='w-10' alt="" />
                                    <p className='ps-3 font-medium'>estherhoward515@gmail.com</p>
                                </div>
                                <div className='flex items-center my-6'>
                                    <img src={call} className='w-10' alt="" />
                                    <p className='ps-3 font-medium'>+12345789100</p>
                                </div>
                            </div>
                        </div>
                        <div>
                        </div>
                    </div>
                </div>
                <div className='2xl:col-span-8 xl:col-span-7 lg:col-span-6 col-span-12'>
                    <div className='bg-white px-8 py-4 rounded-xl'>
                        <p className='text-lg font-medium'>{newName} Details</p>
                        <div className='grid grid-cols-12'>
                            <div className='2xl:col-span-4 col-span-6 my-7'>
                                <p className='text-gray-500 mt-3'>Emp. Number:</p>
                                <p className='font-medium'>{userDatas.contact_no}</p>
                            </div>
                            <div className='2xl:col-span-4 col-span-6 my-7'>
                                <p className='text-gray-500 mt-3'>Emp. ID Number:</p>
                                <p className='font-medium'>1234567890</p>
                            </div>
                            <div className='2xl:col-span-4 col-span-6 my-7'>
                                <p className='text-gray-500 mt-3'>Gender:</p>
                                <p className='font-medium'>{userDatas.gender}</p>
                            </div>
                            <div className='2xl:col-span-4 col-span-6 my-7'>
                                <p className='text-gray-500 mt-3'>Date of birth:</p>
                                <p className='font-medium'>15 March, 2024</p>
                            </div>
                            <div className='2xl:col-span-4 col-span-6 my-7'>
                                <p className='text-gray-500 mt-3'>Age:</p>
                                <p className='font-medium'>24</p>
                            </div>
                            <div className='2xl:col-span-4 col-span-6 my-7'>
                                <p className='text-gray-500 mt-3'>Fitness Status:</p>
                                <p className='font-medium'>Awaiting Occupational Nurse Appraisal</p>
                            </div>
                            <div className='2xl:col-span-4 col-span-6 my-7'>
                                <p className='text-gray-500 mt-3'>Branch:</p>
                                <p className='font-medium'>Hitachi New York, USA</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='grid grid-cols-12 gap-2 fontNew'>
                <div className='col-span-12 flex flex-wrap justify-between items-center m-2'>
                    <h1 className='text-2xl font-medium'>Reports</h1>
                    <div className='flex sm:w-70 w-full h-10 px-4 rounded-xl bg-white my-3 items-center'>
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
                </div>
                {
                    userData.length === 0 ?
                        <div className='col-span-12 h-[50vh] justify-center flex items-center'>
                            <img src={nodata} className='w-28' alt="No data" />
                        </div>
                        :
                        <>
                            <div className="col-span-12">
                                <div
                                    className='w-full lg:overflow-hidden overflow-auto'
                                    onMouseDown={startDragging}
                                    onMouseLeave={stopDragging}
                                    onMouseUp={stopDragging}
                                    onMouseMove={onDragging}
                                    ref={scrollRef}
                                >
                                    <table className='w-full border-separate border-spacing-y-3'>
                                        <tr className='bg-white'>
                                            <th className='py-4 px-5 text-base font-medium whitespace-nowrap text-start first:rounded-l-lg last:rounded-r-lg'>
                                                <FormSelect id="page" name="page_no" className="selects-arrow-hidden outline-none w-24 text-base" value={handelSelectId} onChange={(e) => setHandleSelectId(e.target.value)}>
                                                    <option value="5">Date</option>
                                                    <option value="10">10</option>
                                                    <option value="15">15</option>
                                                </FormSelect>
                                            </th>
                                            <th className='py-4 px-3 text-base font-medium whitespace-nowrap text-start first:rounded-l-lg last:rounded-r-lg'>H.W. ID</th>
                                            <th className='py-4 px-3 text-base font-medium whitespace-nowrap text-start first:rounded-l-lg last:rounded-r-lg'>H.W. Name</th>
                                            <th className='py-4 px-3 text-base font-medium whitespace-nowrap text-start first:rounded-l-lg last:rounded-r-lg'>Service</th>
                                            <th className='py-4 px-3 text-base font-medium whitespace-nowrap text-start first:rounded-l-lg last:rounded-r-lg'>Report</th>
                                        </tr>
                                        <tbody>
                                            {
                                                userData.map((item, index) => {
                                                    return (
                                                        <tr className='bg-white font-medium'>
                                                            <td className='text-start px-4 py-3 first:rounded-l-lg last:rounded-r-lg'>
                                                                <div className='lg:whitespace-normal whitespace-nowrap'>
                                                                    {item.date}
                                                                </div>
                                                            </td>
                                                            <td className='text-start px-4 py-3 first:rounded-l-lg last:rounded-r-lg'>
                                                                <div className='lg:whitespace-normal whitespace-nowrap'>
                                                                    {item.id}
                                                                </div>
                                                            </td>
                                                            <td className='text-start px-4 py-3 first:rounded-l-lg last:rounded-r-lg'>
                                                                <div className='lg:whitespace-normal whitespace-nowrap w-52 flex items-center'>
                                                                    <img src={item.image} className='w-10' alt="" />
                                                                    <p className='text-base ms-3'>{item.name}</p>
                                                                </div>
                                                            </td>
                                                            <td className='text-start px-4 py-3 first:rounded-l-lg last:rounded-r-lg'>
                                                                <div className='lg:whitespace-normal whitespace-nowrap'>
                                                                    {item.service}
                                                                </div>
                                                            </td>
                                                            <td className='text-start px-4 py-3 first:rounded-l-lg last:rounded-r-lg'>
                                                                <div className='lg:whitespace-normal whitespace-nowrap w-32 flex items-center'>
                                                                    <img src={pdf} className='w-7' alt="" />
                                                                    <p className='text-base ms-3 text-[#EA5F5F]'>Report.pdf</p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className='col-span-12 flex flex-wrap items-center sm:justify-between justify-center bg-white py-4 sm:px-8 px-0 rounded-lg'>
                                <div className='flex items-center'>
                                    <p>Show Result</p>
                                    <div>
                                        <FormSelect id="page" name="page_no" className="select-arrow-hidden w-16 outline-none px-2 ms-3 text-base font-semibold" value={handelSelect} onChange={(e) => setHandleSelect(e.target.value)}>
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
                size="md"
            >
                <Dialog.Panel>
                    <Dialog.Description className="rounded-none border-2 border-white">
                        <div>
                            <img src={backs} className='w-auto relative' alt="" />
                            <div className='flex justify-center'>
                                <img src={userDatas.image} className='absolute sm:w-24 sm:h-24 w-14 h-14 lg:-mt-36 md:-mt-30 sm:-mt-36 -mt-24 rounded-full border-2 ' alt="" />
                            </div>
                        </div>
                        <div className='flex justify-center text-center my-4 sm:px-16 px-5 fontNew'>
                            <div>
                                <h1 className='text-xl font-semibold text-black mt-6'>Delete {newName}?</h1>
                                <p className='text-sm text-gray-500 my-3'>Are you sure want to delete from the {newName}?</p>
                                <div className='flex mt-16 mb-10'>
                                    <button className='bg-[#F4F5FA] py-[14px] sm:w-36 w-30 text-sm rounded-xl sm:mx-3 mx-2' onClick={() => setModalOpens(false)}>Close</button>
                                    <button className='bg-[#EA5F5F] py-[14px] sm:w-36 w-30 text-sm rounded-xl sm:mx-3 mx-2 text-white' onClick={() => setModalOpens(false)}>Yes, Delete</button>
                                </div>
                            </div>
                        </div>
                    </Dialog.Description>
                </Dialog.Panel>
            </Dialog>
        </div>
    )
}

export default EmployeeDetails