import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import search from "../../Assets/Image/corporate/Search.png"
import noImage from "../../Assets/Image/admin/noImage.png"
import chatIcon from "../../Assets/Image/admin/chat.png"
import men1 from "../../Assets/Image/admin/men1.png"
import view from "../../Assets/Image/corporate/view.png"
import deletes from "../../Assets/Image/corporate/delete.png"
import nodata from "../../Assets/Image/corporate/nodata.png"
import FormSelect from '../../Base-Component/FormSelect/FormSelect'
import back from "../../Assets/Image/corporate/background2.png"
import Dialog from '../../Base-Component/Dialog/Dialog'
import add from "../../Assets/Image/corporate/add.png"
import toast from 'react-hot-toast'
import Cookies from 'js-cookie';
import { getHealthworkerList } from '../../Services/ApiServices'
import { IMG_URL, newName } from '../../Services/Api'
import { Bars } from 'react-loader-spinner'


function Customer() {

    const navigate = useNavigate()
    const scrollRef = useRef(null);

    const [isDragging, setIsDragging] = useState(false);
    const [isModalOpens, setModalOpens] = useState(false)
    const [loader, setLoader] = useState(false)

    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [pageNo, setPageNo] = useState(1)
    const [totalPage, setTotalPage] = useState("")

    const [searchData, setSearchData] = useState("")
    const [handelSelect, setHandleSelect] = useState("")

    const [employeess, setEmployeess] = useState({})

    const [userData, setUserData] = useState([])

    useEffect(() => {
        handleCustomerList()
    }, [pageNo, searchData])

    const handleCustomerList = () => {
        setLoader(true)
        getHealthworkerList(pageNo, searchData)
            .then((res) => {
                if (res.status == 200) {
                    const data = res.data.info;
                    setUserData(data)
                    setTotalPage(res.data.totalPage)
                }
                setLoader(false)
            })
            .catch((err) => {
                console.log("err >>", err);
                if (err.response.status == 401) {
                    localStorage.removeItem("welo_admin_token")
                    navigate("/welo_admin/login")
                } else {
                    toast.error(err.response.data.message)
                }
                setLoader(false)
            })
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
        if (page > 0 && page <= totalPage) {
            setPageNo(page);
        }
    };

    const handleDelete = (data) => {
        setEmployeess(data)
        setModalOpens(true)
    }

    const handleView = (data) => {
        navigate("/welo_admin/healthworkers/healthworker_details", { state: { Data: data } })
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

    const handleMessages = (data) => {
        navigate("/welo_admin/messages", { state: { Data: data, Type: 2, Role: "HEALTHWORKER" } })
    }

    return (
        <>
            <div className='grid grid-cols-12 md:m-4 m-1'>
                <div className='col-span-12 fontNew duration-300 cursor-pointer'>
                    <div className='flex flex-wrap-reverse sm:justify-between justify-end mb-4 items-start'>
                        <div className='flex xl:w-70 sm:w-52 w-full h-10 px-4 sm:mb-0 mb-3 rounded-[8px] bg-white items-center'>
                            <input
                                type="text"
                                required
                                className='bg-transparent  sm:w-70 w-full border-none outline-none h-10 text-sm fontNew'
                                placeholder='Search...'
                                name='search_text'
                                value={searchData}
                                onChange={(e) => setSearchData(e.target.value)}
                            />
                            <img src={search} className='p-2 w-10 cursor-pointer' alt="" />
                        </div>
                        <div>
                            <a href='https://app.welo.health/healthworker/' target='_blank' className='bg-[#EA5F5F] text-white flex items-center py-2 px-3 sm:mb-0 mb-3 rounded-lg sm:base sm' >
                                <img src={add} className='w-6 mr-2' alt="" />New Healthworker
                            </a>
                        </div>
                    </div>
                </div>
                {
                    loader ?
                        <div className='flex justify-center items-center col-span-12 h-[70vh]'>
                            <Bars
                                height="35"
                                width="35"
                                color="#EA5F5F"
                                ariaLabel="bars-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                            />
                        </div>
                        :
                        <>
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
                                                    <thead>
                                                        <tr className='bg-white'>
                                                            <th className='py-4 px-5 text-base font-medium whitespace-nowrap text-start first:rounded-l-lg last:rounded-r-lg'>Name</th>
                                                            <th className='py-4 px-2 text-base font-medium whitespace-nowrap text-start first:rounded-l-lg last:rounded-r-lg'>Email</th>
                                                            <th className='py-4 px-2 text-base font-medium whitespace-nowrap text-start first:rounded-l-lg last:rounded-r-lg'>Profession</th>
                                                            <th className='py-4 px-2 text-base font-medium whitespace-nowrap text-start first:rounded-l-lg last:rounded-r-lg'>Availability</th>
                                                            <th className='py-4 px-2 text-base font-medium whitespace-nowrap text-start first:rounded-l-lg last:rounded-r-lg'>Status</th>
                                                            <th className='py-4 px-2 text-base font-medium whitespace-nowrap text-start first:rounded-l-lg last:rounded-r-lg'>
                                                                <div className='text-center'>
                                                                    Action
                                                                </div>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            userData.map((item, index) => {
                                                                const profession = item?.healthworkerProfessional
                                                                return (
                                                                    <tr
                                                                        key={index}
                                                                        className="font-medium bg-white"
                                                                    >
                                                                        <td className='text-start lg:px-2 px-4 py-3 first:rounded-l-lg last:rounded-r-lg'>
                                                                            <div className='lg:whitespace-normal whitespace-nowrap lg:w-auto ps-3 w-52 flex items-center'>
                                                                                <img src={item.profilePic ? IMG_URL + item.profilePic : men1} crossOrigin='anonymous' className='w-10 h-10 rounded-full object-cover' alt="" />
                                                                                <p className='text-base ms-3'>{item.firstName || ""} {item.lastName || ""}</p>
                                                                            </div>
                                                                        </td>
                                                                        <td className='text-start lg:px-2 px-4 py-3 first:rounded-l-lg last:rounded-r-lg '>
                                                                            <div className='lg:whitespace-normal whitespace-nowrap lg:break-all break-normal'>
                                                                                <p className='text-base'>{item.emailId}</p>
                                                                            </div>
                                                                        </td>
                                                                        <td className='text-start lg:px-2 px-4 py-3 first:rounded-l-lg last:rounded-r-lg'>
                                                                            <div className='lg:whitespace-normal whitespace-nowrap'>
                                                                                <p className='text-base capitalize'>{profession?.professional || "-"}</p>
                                                                            </div>
                                                                        </td>
                                                                        <td className='text-start lg:px-2 px-4 py-3 first:rounded-l-lg last:rounded-r-lg'>
                                                                            <div className='lg:whitespace-normal whitespace-nowrap'>
                                                                                {
                                                                                    item.isOnline == "NO" ?
                                                                                        <div className='flex items-center'>
                                                                                            <div className='w-2 h-2 bg-[#D11A2A] rounded-full mr-2'></div>
                                                                                            <p className='text-[#D11A2A]'>Offline</p>
                                                                                        </div>
                                                                                        :
                                                                                        <div className='flex items-center'>
                                                                                            <div className='w-2 h-2 bg-[#00987C] rounded-full mr-2'></div>
                                                                                            <p className='text-[#00987C]'>Online</p>
                                                                                        </div>
                                                                                }
                                                                            </div>
                                                                        </td>
                                                                        <td className='text-start lg:px-2 px-4 py-3 first:rounded-l-lg last:rounded-r-lg'>
                                                                            <div className='lg:whitespace-normal whitespace-nowrap'>
                                                                                {
                                                                                    item.isApprove == "PENDING" ?
                                                                                        <button className='bg-[#f2994a1a] py-2 px-3 text-[#F2A205] text-sm rounded-lg'>Pending</button>
                                                                                        :
                                                                                        <button className='bg-[#00987C29] py-2 px-3 text-[#00987C] text-sm rounded-lg'>Approved</button>
                                                                                }
                                                                            </div>
                                                                        </td>
                                                                        <td className='text-start flex justify-center lg:px-2 px-4 py-3 first:rounded-l-lg last:rounded-r-lg'>
                                                                            <div className='flex items-center w-52 justify-center'>
                                                                                <div onClick={() => handleView(item)} className='cursor-pointer'>
                                                                                    <img src={view} className='lg:w-9 w-8' alt="View" />
                                                                                </div>
                                                                                <div onClick={() => handleDelete(item)} className='ml-4 cursor-pointer' >
                                                                                    <img src={deletes} className='lg:w-9 w-8' alt="Delete" />
                                                                                </div>
                                                                                {
                                                                                    item.isApprove === "APPROVE" ?
                                                                                        <div onClick={() => handleMessages(item)} className='cursor-pointer ml-4'>
                                                                                            <img src={chatIcon} className='lg:w-9 w-8' alt="Message" />
                                                                                        </div> : ""
                                                                                }
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
                            <img src={back} className='w-auto relative' alt="" />
                            <div className='flex justify-center'>
                                <img src={employeess.profilePic ? IMG_URL + employeess.profilePic : noImage} crossOrigin='anonymous' className='absolute object-cover sm:w-24 sm:h-24 w-14 h-14 lg:-mt-36 md:-mt-30 sm:-mt-36 -mt-24 rounded-full border-2 ' alt="" />
                            </div>
                        </div>
                        <div className='flex justify-center text-center my-4 sm:px-16 px-5 fontNew'>
                            <div>
                                <h1 className='text-xl font-semibold text-black mt-6'>Delete {newName}?</h1>
                                <p className='text-sm text-gray-500 my-3'>Are you sure want to delete {employeess.firstName || ""} {employeess.lastName || ""} from the {newName}?</p>
                                <div className='flex mt-16 mb-10'>
                                    <button className='bg-[#F4F5FA] py-[14px] sm:w-36 w-30 text-sm rounded-xl sm:mx-3 mx-2' onClick={() => setModalOpens(false)}>Close</button>
                                    <button className='bg-[#EA5F5F] py-[14px] sm:w-36 w-30 text-sm rounded-xl sm:mx-3 mx-2 text-white' onClick={() => setModalOpens(false)}>Yes, Delete</button>
                                </div>
                            </div>
                        </div>
                    </Dialog.Description>
                </Dialog.Panel>
            </Dialog>
        </>
    )
}

export default Customer