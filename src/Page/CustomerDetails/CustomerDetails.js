import React, { useEffect, useRef, useState } from 'react'
import back from "../../Assets/Image/corporate/back.png"
import { useLocation, useNavigate } from 'react-router-dom'
import nodata from "../../Assets/Image/corporate/nodata.png"
import background from "../../Assets/Image/corporate/background1.png"
import men1 from "../../Assets/Image/admin/men1.png"
import logo from "../../Assets/Image/admin/logos.png"
import men4 from "../../Assets/Image/corporate/men9.png"
import men5 from "../../Assets/Image/corporate/men10.png"
import deletes from "../../Assets/Image/admin/delete.png"
import message from "../../Assets/Image/corporate/message.png";
import call from "../../Assets/Image/corporate/call.png";
import search from "../../Assets/Image/corporate/Search.png"
import men2 from "../../Assets/Image/corporate/men7.png"
import men3 from "../../Assets/Image/corporate/men8.png"
import view from "../../Assets/Image/corporate/view.png"
import FormSelect from '../../Base-Component/FormSelect/FormSelect'
import Dialog from '../../Base-Component/Dialog/Dialog'
import backs from "../../Assets/Image/corporate/background2.png"
import edit from "../../Assets/Image/corporate/edit.png"
import views from "../../Assets/Image/corporate/view.png"
import noImage from "../../Assets/Image/admin/noImage.png"
import { IMG_URL, newName } from '../../Services/Api'
import { approveCustomer, rejectCustomer } from '../../Services/ApiServices'
import { Circles } from 'react-loader-spinner'
import toast from 'react-hot-toast'

function CustomerDetails() {
    const navigate = useNavigate()
    const location = useLocation()
    const scrollRef = useRef(null);

    const [selectStatus, setSelectStatus] = useState(1)

    const [isDragging, setIsDragging] = useState(false);
    const [isModalOpens, setModalOpens] = useState(false)
    const [isAccept, setIsAccept] = useState(false)
    const [isReject, setIsReject] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isSuspend, setIsSuspend] = useState(false)

    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [pageNo, setPageNo] = useState(1)
    const [totalPage, setTotalPage] = useState(3)
    const [isFlag, setIsFlag] = useState(0)

    const [searchData, setSearchData] = useState("")
    const [handelSelect, setHandleSelect] = useState("")
    const [handelSelectId, setHandleSelectId] = useState("")
    const [handelSelectName, setHandleSelectName] = useState("")
    const [handelSelectEmail, setHandleSelectEmail] = useState("")
    const [handelSelectNo, setHandleSelectNo] = useState("")
    const [handelSelectGender, setHandleSelectGender] = useState("")
    const [handelSelectDate, setHandleSelectDate] = useState("")
    const [reasonText, setReasonText] = useState("")
    const [userIds, setUserIds] = useState("")

    let usersData;
    try {
        const { Data } = location.state;
        usersData = Data
    } catch (error) {
        console.log("err")
    }

    useEffect(() => {
        console.log("userData >>", usersData)
    }, [])

    const [userData, setUserData] = useState([
        {
            id: "#61",
            image: men1,
            name: "Esther Howard",
            email: "estherhoward15@gmail.com",
            contact_no: "+1 124584102",
            gender: "Male",
            last_check: "12 Mar, 2024",
            status: 1,
        },
        {
            id: "#62",
            image: men2,
            name: "Cameron Williamson",
            email: "estherhoward15@gmail.com",
            contact_no: "+1 124584102",
            gender: "Male",
            last_check: "12 Mar, 2024",
            status: 1,
        },
        {
            id: "#63",
            image: men3,
            name: "Jenny Wilson",
            email: "estherhoward15@gmail.com",
            contact_no: "+1 124584102",
            gender: "Male",
            last_check: "12 Mar, 2024",
            status: 1,
        },
        {
            id: "#64",
            image: men4,
            name: "Guy Hawkins",
            email: "estherhoward15@gmail.com",
            contact_no: "+1 124584102",
            gender: "Male",
            last_check: "12 Mar, 2024",
            status: 1,
        },
        {
            id: "#65",
            image: men5,
            name: "Savannah Nguyen",
            email: "estherhoward15@gmail.com",
            contact_no: "+1 124584102",
            gender: "Female",
            last_check: "12 Mar, 2024",
            status: 1,
        },
        {
            id: "#66",
            image: men1,
            name: "Bessie Cooper",
            email: "estherhoward15@gmail.com",
            contact_no: "+1 124584102",
            gender: "Male",
            last_check: "12 Mar, 2024",
            status: 1,
        },
        {
            id: "#67",
            image: men2,
            name: "Cody Fisher",
            email: "estherhoward15@gmail.com",
            contact_no: "+1 124584102",
            gender: "Male",
            last_check: "12 Mar, 2024",
            status: 1,
        },
    ])

    const [userDatas, setUserDatas] = useState([
        {
            id: "#61",
            date: "14 Mar, 2024",
            image: men1,
            name: "Cameron Williamson",
            service: "Health screening, Mental health clinic",
            total_employee: "206",
            amount: "R1200.00",
        },
        {
            id: "#62",
            date: "14 Mar, 2024",
            image: men1,
            name: "Cameron Williamson",
            service: "Health screening, Mental health clinic",
            total_employee: "206",
            amount: "R1200.00",
        },
        {
            id: "#63",
            date: "14 Mar, 2024",
            image: men1,
            name: "Cameron Williamson",
            service: "Health screening, Mental health clinic",
            total_employee: "206",
            amount: "R1200.00",
        },
        {
            id: "#64",
            date: "14 Mar, 2024",
            image: men1,
            name: "Cameron Williamson",
            service: "Health screening, Mental health clinic",
            total_employee: "206",
            amount: "R1200.00",
        },
        {
            id: "#65",
            date: "14 Mar, 2024",
            image: men1,
            name: "Cameron Williamson",
            service: "Health screening, Mental health clinic",
            total_employee: "206",
            amount: "R1200.00",
        },
        {
            id: "#66",
            date: "14 Mar, 2024",
            image: men1,
            name: "Cameron Williamson",
            service: "Health screening, Mental health clinic",
            total_employee: "206",
            amount: "R1200.00",
        },
        {
            id: "#67",
            date: "14 Mar, 2024",
            image: men1,
            name: "Cameron Williamson",
            service: "Health screening, Mental health clinic",
            total_employee: "206",
            amount: "R1200.00",
        },
        {
            id: "#68",
            date: "14 Mar, 2024",
            image: men1,
            name: "Cameron Williamson",
            service: "Health screening, Mental health clinic",
            total_employee: "206",
            amount: "R1200.00",
        },
        {
            id: "#69",
            date: "14 Mar, 2024",
            image: men1,
            name: "Cameron Williamson",
            service: "Health screening, Mental health clinic",
            total_employee: "206",
            amount: "R1200.00",
        },
    ])

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

    const handleDetails = (data, news) => {
        navigate("/welo_admin/customers/employee_details", { state: { Data: data, News: news } })
    }

    const handleView = (data) => {
        navigate('/welo_admin/customers/customer_invoice', { state: { Data: data } })
    }

    const handleApprove = () => {
        setIsLoading(true)
        let obj = {
            userId: userIds
        }
        approveCustomer(obj)
            .then((res) => {
                if (res.status == 200) {
                    setIsAccept(false)
                    navigate("/welo_admin/customers")
                }
                setIsLoading(false)
            })
            .catch((err) => {
                console.log("err >>", err);
                if (err.response.status == 401) {
                    localStorage.removeItem("welo_admin_token")
                    navigate("/welo_admin/login")
                } else {
                    toast.error(err.response.data.message)
                }
                setIsLoading(false)
            })
    }

    const handleReject = () => {
        setIsLoading(true)
        let obj = {
            userId: userIds,
            rejectReason: reasonText
        }
        rejectCustomer(obj)
            .then((res) => {
                if (res.status == 200) {
                    setIsReject(false)
                    navigate("/welo_admin/customers")
                }
                setIsLoading(false)
            })
            .catch((err) => {
                console.log("err >>", err);
                if (err.response.status == 401) {
                    localStorage.removeItem("welo_admin_token")
                    navigate("/welo_admin/login")
                } else {
                    toast.error(err.response.data.message)
                }
                setIsLoading(false)
            })
    }

    const handleMessages = () => {
        navigate("/welo_admin/messages", { state: { Data: usersData, Types: 1 } })
    }

    return (
        <div className='md:m-4 m-1 fontNew'>
            <div className='flex items-center cursor-pointer mb-4'>
                <img src={back} onClick={() => { navigate("/welo_admin/customers") }} className='w-4' alt="" />
                <p onClick={() => { navigate("/welo_admin/customers") }} className='text-base font-medium ms-3'>Go back</p>
            </div>

            <div className='grid grid-cols-12 gap-4 '>
                <div className='2xl:col-span-4 xl:col-span-5 lg:col-span-6 col-span-12 bg-white rounded-xl'>
                    <div>
                        <div className='text-white rounded-t-xl' >
                            <img src={background} className='w-full h-32' alt="" />
                            <div className='flex justify-between mx-10'>
                                <img src={usersData.profilePic ? IMG_URL + usersData.profilePic : noImage} crossOrigin='anonymous' className='sm:w-[110px] sm:h-[110px] w-[100px] h-[100px] -mt-12 rounded-full border-[3px] object-cover border-white' alt="" />
                                <div className='flex mt-4 cursor-pointer'>
                                    {
                                        usersData.isApprove != "APPROVE" ? ""
                                            :
                                            <img src={edit} className='lg:w-9 w-8 lg:h-9 h-8 mr-4' alt="" />
                                    }
                                    <img onClick={() => setModalOpens(true)} src={deletes} className='lg:w-9 w-8 lg:h-9 h-8' alt="" />
                                </div>
                            </div>
                            <div className='text-black mx-10 py-2'>
                                <h1 className='text-lg font-semibold pb-2'>{usersData.firstName || ""} {usersData.lastName || ""}</h1>
                                <h4 className='text-sm text-gray-500'>{usersData.userRole}</h4>
                                <div className='flex items-center my-6'>
                                    <img src={message} className='w-10' alt="" />
                                    <p className='ps-3 font-medium'>{usersData.emailId || ""}</p>
                                </div>
                                <div className='flex items-center my-6'>
                                    <img src={call} className='w-10' alt="" />
                                    <p className='ps-3 font-medium'>{usersData.countryCode || ""} {usersData.phoneNumber || ""}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                        </div>
                    </div>
                </div>
                <div className='2xl:col-span-8 xl:col-span-7 lg:col-span-6 col-span-12 bg-white rounded-xl'>
                    <div className='sm:px-8 px-4 py-4'>
                        <div className='flex flex-wrap-reverse justify-between border-b-2 border-dashed py-5'>
                            <div className='flex flex-wrap items-center'>
                                <div>
                                    <p className='text-base font-semibold pb-1'>Company Details</p>
                                </div>
                                <div className='lg:ms-14 md:ms-7 ms-4'>
                                    {
                                        usersData.isApprove == "PENDING" ?
                                            <button className='bg-[#f2994a1a] py-2 px-3 text-[#F2A205] text-sm rounded-lg'>Pending</button>
                                            :
                                            <button className='bg-[#00987C29] py-2 px-3 text-[#00987C] text-sm rounded-lg'>Approved</button>
                                    }
                                </div>
                            </div>
                            <div className='2xl:mb-0 mb-3 flex'>
                                {
                                    usersData.isApprove == "PENDING" ?
                                        <>
                                            <button onClick={() => { setIsReject(true); setUserIds(usersData.userId) }} className='bg-[#EA5F5F] text-white flex items-center justify-center text-sm sm:text-base items-center w-[140px] h-[38px] px-[12px] mr-3 rounded-[10px]'>
                                                Reject
                                            </button>
                                            <button onClick={() => { setIsAccept(true); setUserIds(usersData.userId) }} className='bg-[#139E84] text-white flex items-center justify-center text-sm sm:text-base items-center w-[140px] h-[38px] px-[12px] rounded-[10px]'>
                                                Approve
                                            </button>
                                        </>
                                        :
                                        <>
                                            <button onClick={() => setIsSuspend(true)} className='bg-[#EA5F5F] text-white flex items-center justify-center text-sm sm:text-base items-center w-[150px] h-[38px] px-[12px] mr-3 rounded-[10px]'>
                                                Suspend
                                            </button>
                                            <button onClick={() => handleMessages()} className='bg-[#139E84] text-white flex items-center justify-center text-sm sm:text-base items-center w-[150px] h-[38px] px-[12px] rounded-[10px]'>
                                                Send Message
                                            </button>
                                        </>
                                }
                            </div>
                        </div>
                        <div>
                            <div className='flex flex-wrap items-center my-5'>
                                <img src={usersData.Company.companyPic ? IMG_URL + usersData.Company.companyPic : noImage} crossOrigin='anonymous' className='2xl:w-[106px] 2xl:h-[106px] w-[88px] h-[88px] rounded-full object-cover' alt="" />
                                <div className='sm:ms-5 ms-0'>
                                    <h4 className='text-lg font-medium mb-3 sm:mt-0 mt-3'>{usersData.Company.companyName || ""}</h4>
                                    <div className='flex flex-wrap items-center text-base'>
                                        <div className='mr-15'>
                                            <p className='text-[#6C6D7B]'>ID</p>
                                            <p className='font-medium'>{usersData.Company.companyId || ""}</p>
                                        </div>
                                        <div className='sm:mt-0 mt-3'>
                                            <p className='text-[#6C6D7B]'>Email</p>
                                            <p className='font-medium'>{usersData.Company.companyEmailId || ""}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='grid grid-cols-12 py-4'>
                            <h1 className='col-span-12'>Sites</h1>
                            {
                                usersData.Company.companyAddresses.map((item, index) => {
                                    return (
                                        <div key={index} className='2xl:col-span-3 xl:col-span-4 md:col-span-6 col-span-12 bg-[#F6F6F6] p-5 rounded-lg sm:mr-3 mr-0 my-3'>
                                            <div className='sm:pr-10 pr-0'>
                                                <p className='font-medium break-words'>{`${item.aptAddress}, ${item.streetAddress}, ${item.city}, ${item.state}-${item.zipCode}`}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex justify-center bg-white w-auto my-5 pt-3 font-medium rounded-lg'>
                <button onClick={() => setIsFlag(0)} className={`${isFlag == 0 ? "border-b-2 border-[#EA5F5F] text-[#EA5F5F]" : "border-b-2 border-white text-black"} p-2 w-[140px] mx-3 duration-200`}>{newName}</button>
                <button onClick={() => setIsFlag(1)} className={`${isFlag == 1 ? "border-b-2 border-[#EA5F5F] text-[#EA5F5F]" : "border-b-2 border-white text-black"} p-2 w-[140px] mx-3 duration-200`}>Invoice</button>
            </div>

            {
                isFlag == 0 ?
                    <div className='grid grid-cols-12'>
                        <div className='col-span-12 duration-300 cursor-pointer'>
                            <div className='flex flex-wrap justify-between items-center'>
                                <h1 className='text-2xl sm:mb-0 mb-2 font-medium'>{newName}</h1>
                                <div className='flex sm:w-70 w-full h-10 px-4 rounded-xl bg-white items-center'>
                                    <input
                                        type="text"
                                        required
                                        className='bg-transparent border-none outline-none sm:w-70 w-full h-10 text-sm'
                                        placeholder='Search...'
                                        name='search_text'
                                        value={searchData}
                                        onChange={(e) => setSearchData(e.target.value)}
                                    />
                                    <img src={search} className='p-2 w-10 cursor-pointer' alt="" />
                                </div>
                            </div>
                        </div>
                        {
                            userData === "" ?
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
                                                        <th className='py-4 px-2 text-base font-medium whitespace-nowrap text-start first:rounded-l-lg last:rounded-r-lg'>
                                                            <FormSelect id="page" name="page_no" className="selects-arrow-hidden outline-none w-30 text-base" value={handelSelectName} onChange={(e) => setHandleSelectName(e.target.value)}>
                                                                <option value="5">Name</option>
                                                                <option value="10">10</option>
                                                                <option value="15">15</option>
                                                            </FormSelect>
                                                        </th>
                                                        <th className='py-4 px-2 text-base font-medium whitespace-nowrap text-start first:rounded-l-lg last:rounded-r-lg'>
                                                            <FormSelect id="page" name="page_no" className="selects-arrow-hidden outline-none w-28 text-base" value={handelSelectEmail} onChange={(e) => setHandleSelectEmail(e.target.value)}>
                                                                <option value="5">Email</option>
                                                                <option value="10">10</option>
                                                                <option value="15">15</option>
                                                            </FormSelect>
                                                        </th>
                                                        <th className='py-4 px-2 text-base font-medium whitespace-nowrap text-start first:rounded-l-lg last:rounded-r-lg'>
                                                            <FormSelect id="page" name="page_no" className="selects-arrow-hidden outline-none w-36 text-base" value={handelSelectNo} onChange={(e) => setHandleSelectNo(e.target.value)}>
                                                                <option value="5">Contact No.</option>
                                                                <option value="10">10</option>
                                                                <option value="15">15</option>
                                                            </FormSelect>
                                                        </th>
                                                        <th className='py-4 px-2 text-base font-medium whitespace-nowrap text-start first:rounded-l-lg last:rounded-r-lg'>
                                                            <FormSelect id="page" name="page_no" className="selects-arrow-hidden outline-none w-28 text-base" value={handelSelectGender} onChange={(e) => setHandleSelectGender(e.target.value)}>
                                                                <option value="5">Gender</option>
                                                                <option value="10">10</option>
                                                                <option value="15">15</option>
                                                            </FormSelect>
                                                        </th>
                                                        <th className='py-4 px-2 text-base font-medium whitespace-nowrap text-start first:rounded-l-lg last:rounded-r-lg'>Last Check</th>
                                                        <th className='py-4 px-2 text-base font-medium whitespace-nowrap text-start first:rounded-l-lg last:rounded-r-lg'>
                                                            <div className='text-center'>
                                                                Action
                                                            </div>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        userData.map((item, index) => (
                                                            <tr
                                                                key={index}
                                                                className='font-medium bg-white'
                                                            >
                                                                <td className='text-start lg:px-2 px-4 py-3 first:rounded-l-lg last:rounded-r-lg'>
                                                                    <div className='lg:whitespace-normal whitespace-nowrap lg:w-auto w-52 flex items-center'>
                                                                        <img src={item.image} className='w-10' alt="" />
                                                                        <p className='text-base ms-3'>{item.name}</p>
                                                                    </div>
                                                                </td>
                                                                <td className='text-start lg:px-2 px-4 py-3 first:rounded-l-lg last:rounded-r-lg '>
                                                                    <div className='lg:whitespace-normal whitespace-nowrap lg:break-all break-normal'>
                                                                        <p className='text-base'>{item.email}</p>
                                                                    </div>
                                                                </td>
                                                                <td className='text-start lg:px-2 px-4 py-3 first:rounded-l-lg last:rounded-r-lg'>
                                                                    <div className='lg:whitespace-normal whitespace-nowrap lg:break-all break-normal'>
                                                                        <p className='text-base'>{item.contact_no}</p>
                                                                    </div>
                                                                </td>
                                                                <td className='text-start lg:px-2 px-4 py-3 first:rounded-l-lg last:rounded-r-lg'>
                                                                    <div className='lg:whitespace-normal whitespace-nowrap'>
                                                                        <p className='text-base'>{item.gender}</p>
                                                                    </div>
                                                                </td>
                                                                <td className='text-start lg:px-2 px-4 py-3 first:rounded-l-lg last:rounded-r-lg'>
                                                                    <div className='lg:whitespace-normal whitespace-nowrap'>
                                                                        <p className='text-base'>{item.last_check}</p>
                                                                    </div>
                                                                </td>
                                                                <td className='text-start flex justify-center lg:px-2 px-4 py-3 first:rounded-l-lg last:rounded-r-lg'>
                                                                    <div onClick={() => handleDetails(item, usersData)} className='flex items-center w-52 justify-center cursor-pointer'>
                                                                        <img src={view} className='lg:w-9 w-8' alt="View" />
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))
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
                    :
                    <div className='grid grid-cols-12'>
                        <div className="col-span-12">
                            <div className='flex flex-wrap justify-between items-center'>
                                <h1 className='text-2xl font-semibold sm:mb-0 mb-3'>Invoices</h1>
                                <div className='flex sm:w-70 w-full h-10 px-4 rounded-xl bg-white items-center'>
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
                        </div>
                        {
                            userDatas == "" ?
                                <div className='col-span-12 h-[50vh] justify-center flex items-center'>
                                    <img src={nodata} className='w-28' alt="" />
                                </div>
                                :
                                <>
                                    <div className='col-span-12 overflow-auto'>
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
                                                        <FormSelect id="page" name="page_no" className="selects-arrow-hidden outline-none w-24 text-base" value={handelSelectDate} onChange={(e) => setHandleSelectDate(e.target.value)}>
                                                            <option value="5">Date</option>
                                                            <option value="10">10</option>
                                                            <option value="15">15</option>
                                                        </FormSelect>
                                                    </th>
                                                    <th className='py-4 px-3 text-base font-medium whitespace-nowrap text-start first:rounded-l-lg last:rounded-r-lg'>Service</th>
                                                    <th className='py-4 px-3 text-base font-medium whitespace-nowrap text-start first:rounded-l-lg last:rounded-r-lg'>Total Emp.</th>
                                                    <th className='py-4 px-3 text-base font-medium whitespace-nowrap text-start first:rounded-l-lg last:rounded-r-lg'>Amount</th>
                                                    <th className='py-4 px-3 text-base font-medium whitespace-nowrap text-start first:rounded-l-lg last:rounded-r-lg'>Action</th>
                                                </tr>
                                                {
                                                    userDatas.map((item, index) => {
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
                                                                        {item.service}
                                                                    </div>
                                                                </td>
                                                                <td className='text-start p-4 first:rounded-l-lg last:rounded-r-lg'>
                                                                    <div className='whitespace-nowrap'>
                                                                        {item.total_employee}
                                                                    </div>
                                                                </td>
                                                                <td className='text-start p-4 first:rounded-l-lg last:rounded-r-lg'>
                                                                    <div className='whitespace-nowrap'>
                                                                        {item.amount}
                                                                    </div>
                                                                </td>
                                                                <td className='text-start p-4 first:rounded-l-lg last:rounded-r-lg'>
                                                                    <div className='cursor-pointer' onClick={() => handleView(usersData)}>
                                                                        <img src={views} className='lg:w-9 w-8' alt="" />
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
            }

            <Dialog
                open={isAccept}
                onClose={() => setIsAccept(false)}
                size="md"
            >
                <Dialog.Panel>
                    <Dialog.Description className="rounded-none border-2 border-white">
                        <div className='flex justify-center text-center my-4 sm:px-16 px-4 fontNew'>
                            <div>
                                <h1 className='text-xl font-semibold text-black mt-6'>Accept?</h1>
                                <p className='text-sm text-gray-500 my-3'>Are you sure you want to approve this <br /> customer ?</p>
                                <div className='mt-13 flex items-center mb-5'>
                                    <button className='bg-[#F4F5FA] h-[50px] sm:w-36 w-30 text-sm rounded-xl sm:mx-3 mx-2' onClick={() => setIsAccept(false)}>Close</button>
                                    <button className='bg-[#00987C] h-[50px] sm:w-36 w-30 text-sm rounded-xl sm:mx-3 mx-2 text-white' onClick={handleApprove}>
                                        {isLoading ? (
                                            <div className='flex justify-center'>
                                                <Circles
                                                    width={25}
                                                    height={25}
                                                    color="#fff"
                                                    ariaLabel="circles-loading"
                                                    wrapperStyle={{}}
                                                    visible={true}
                                                    wrapperClass=""
                                                />
                                            </div>
                                        ) : (
                                            "Yes, Accept"
                                        )}

                                    </button>
                                </div>
                            </div>
                        </div>
                    </Dialog.Description>
                </Dialog.Panel>
            </Dialog>

            <Dialog
                open={isReject}
                onClose={() => setIsReject(false)}
                size="lg"
            >
                <Dialog.Panel>
                    <Dialog.Description className="rounded-none border-2 border-white">
                        <div className='flex justify-center text-center my-4 px-0 fontNew'>
                            <div className='px-3'>
                                <h1 className='text-xl font-semibold text-black mt-6'>Reject?</h1>
                                <p className='text-base text-gray-500 my-3'>Are you sure you want to reject this <br /> appointment?</p>
                                <div className='text-start'>
                                    <p className='fontNew text-sm font-medium mt-3'>Reason</p>
                                    <div className='mt-3 mb-6'>
                                        <div className='flex my-3 md:w-[400px] w-[320px] items-center justify-center'>
                                            <textarea name="" rows={9} placeholder='Enter' onChange={(e) => setReasonText(e.target.value)} className='w-full outline-[#00987C] border-[1px] py-3 px-4 border-slate-300 rounded-md' id=""></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className='mt-13 flex items-center mb-5'>
                                    <button className='bg-[#F4F5FA] h-[50px] sm:w-36 w-30 text-sm rounded-xl sm:mx-3 mx-2' onClick={() => setIsReject(false)}>Close</button>
                                    <button className='bg-[#EA5F5F] h-[50px] sm:w-36 w-30 text-sm rounded-xl sm:mx-3 mx-2 text-white' onClick={handleReject}>
                                        {isLoading ? (
                                            <div className='flex justify-center'>
                                                <Circles
                                                    width={25}
                                                    height={25}
                                                    color="#fff"
                                                    ariaLabel="circles-loading"
                                                    wrapperStyle={{}}
                                                    visible={true}
                                                    wrapperClass=""
                                                />
                                            </div>
                                        ) : (
                                            "Yes, Reject"
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Dialog.Description>
                </Dialog.Panel>
            </Dialog>

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
                                <img src={usersData.profilePic ? IMG_URL + usersData.profilePic : noImage} crossOrigin='anonymous' className='object-cover absolute sm:w-24 sm:h-24 w-14 h-14 lg:-mt-36 md:-mt-30 sm:-mt-36 -mt-24 rounded-full border-2 ' alt="" />
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

            <Dialog
                open={isSuspend}
                onClose={() => setIsSuspend(false)}
                size="lg"
            >
                <Dialog.Panel>
                    <Dialog.Description className="rounded-none border-2 border-white">
                        <div className='flex justify-center text-center my-4 px-0 fontNew'>
                            <div className='px-3'>
                                <h1 className='text-xl font-semibold text-black mt-6'>Suspend?</h1>
                                <p className='text-base text-gray-500 my-3'>Are you sure you want to suspend this health worker?</p>
                                <div className='text-start'>
                                    <p className='fontNew text-sm font-medium mt-3'>Reason</p>
                                    <div className='mt-3 mb-6'>
                                        <div className='flex my-3 md:w-[400px] w-[320px] items-center justify-center'>
                                            <textarea name="" rows={9} placeholder='Enter' className='w-full outline-[#00987C] border-[1px] py-3 px-4 border-slate-300 rounded-md' id=""></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className='mt-13 mb-5'>
                                    <button className='bg-[#F4F5FA] py-[14px] sm:w-36 w-30 text-sm rounded-xl sm:mx-3 mx-2' onClick={() => setIsSuspend(false)}>Close</button>
                                    <button className='bg-[#EA5F5F] py-[14px] sm:w-36 w-30 text-sm rounded-xl sm:mx-3 mx-2 text-white' onClick={() => setIsSuspend(false)}>Yes, Suspend</button>
                                </div>
                            </div>
                        </div>
                    </Dialog.Description>
                </Dialog.Panel>
            </Dialog>
        </div>
    )
}

export default CustomerDetails