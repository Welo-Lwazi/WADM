import React, { useEffect, useRef, useState } from 'react'
import back from "../../Assets/Image/corporate/back.png"
import { useLocation, useNavigate } from 'react-router-dom'
import search from "../../Assets/Image/corporate/Search.png"
import pdf from "../../Assets/Image/corporate/pdf.png"
import nodata from "../../Assets/Image/corporate/nodata.png"
import background from "../../Assets/Image/corporate/background1.png"
import clock from "../../Assets/Image/corporate/clock 1.png"
import Dialog from '../../Base-Component/Dialog/Dialog'
import FormSelect from '../../Base-Component/FormSelect/FormSelect'
import moment from 'moment'
import toast from 'react-hot-toast'
import {
    assignHealthworker,
    listAssignHealthworker,
    listReports,
    listUnassignHealthworker,
    removeAssignHealthworker,
    requestStatusChange
} from '../../Services/ApiServices'
import { IMG_URL, newName } from '../../Services/Api'
import noImage from "../../Assets/Image/admin/noImage.png"
import { Bars, Circles } from 'react-loader-spinner'
import deletes from "../../Assets/Image/corporate/delete.png"

function RequestDetails() {

    const navigate = useNavigate()
    const location = useLocation()
    const scrollRef = useRef(null);

    const [isDragging, setIsDragging] = useState(false);
    const [isModalOpens, setModalOpens] = useState(false)
    const [isModalOpen, setModalOpen] = useState(false)
    const [isRejectOpen, setIsRejectOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [loader, setLoader] = useState(false)
    const [newLoader, setNewLoader] = useState(false)
    const [isCancel, setIsCancel] = useState(false)
    const [isRemove, setIsRemove] = useState(false)
    const [isNew, setNew] = useState(false)
    const [isAccept, setIsAccept] = useState(false)

    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [pageNo, setPageNo] = useState(1)
    const [totalPage, setTotalPage] = useState("")
    const [pageNos, setPageNos] = useState(1)
    const [totalPages, setTotalPages] = useState("")
    const [pageNoss, setPageNoss] = useState(1)
    const [totalPagess, setTotalPagess] = useState("")
    const [pageNosss, setPageNosss] = useState(1)
    const [totalPagesss, setTotalPagesss] = useState("")
    const [searchData, setSearchData] = useState("")
    const [handelSelect, setHandleSelect] = useState("")
    const [isAssignId, setIsAssignId] = useState("")

    const [selectedRows, setSelectedRows] = useState([]);
    const [userData, setUserData] = useState([])
    const [userDatas, setUserDatas] = useState([])
    const [rejectData, setRejectData] = useState([])
    const [assigneData, setAssigneData] = useState([])
    const [assigneDatas, setAssigneDatas] = useState([])

    let usersData;
    try {
        const { Data } = location.state;
        usersData = Data
    } catch (error) {
        console.log("err")
    }

    const handleAssignList = () => {
        let obj = {
            pageNo: pageNos,
            requestId: usersData.requestId,
            type: "ASSIGN"
        }
        listAssignHealthworker(obj)
            .then((res) => {
                console.log("res >>", res)
                if (res.status == 200) {
                    const data = res.data.info;
                    setAssigneData(data)
                    setTotalPages(res.data.totalPage)
                    workerAccept(data)
                }
            })
            .catch((err) => {
                console.log("err >>", err);
                if (err.response.status == 401) {
                    localStorage.removeItem("welo_admin_token")
                    navigate("/welo_admin/login")
                } else {
                    toast.error(err.response.data.message)
                }
            })
    }

    const handleAssignLists = () => {
        let obj = {
            pageNo: pageNosss,
            requestId: usersData.requestId,
            type: "ASSIGN"
        }
        listAssignHealthworker(obj)
            .then((res) => {
                console.log("res >>", res)
                if (res.status == 200) {
                    const data = res.data.info;
                    setAssigneDatas(data)
                    setTotalPagesss(res.data.totalPage)
                }
            })
            .catch((err) => {
                console.log("err >>", err);
                if (err.response.status == 401) {
                    localStorage.removeItem("welo_admin_token")
                    navigate("/welo_admin/login")
                } else {
                    toast.error(err.response.data.message)
                }
            })
    }

    const handleListRequest = () => {
        setNewLoader(true)
        let param = {
            pageNo: pageNo,
            requestId: usersData.requestId
        }
        listReports(param)
            .then((res) => {
                if (res.status == 200) {
                    const data = res.data.info;
                    setUserDatas(data)
                    setTotalPage(res.data.totalPage)
                }
                setNewLoader(false)
            })
            .catch((err) => {
                if (err.response.status == 401) {
                    localStorage.removeItem("welo_admin_token")
                    navigate("/welo_admin/login")
                } else {
                    toast.error(err.response.data.message)
                }
                setNewLoader(false)
            })
    }

    useEffect(() => {
        handleAssignList()
    }, [pageNos])

    useEffect(() => {
        handleListRequest()
    }, [pageNo])

    const workerAccept = (data) => {
        console.log("data >>", data)
        for (let i = 0; i < data.length; i++) {
            if (data[i].isAccept === "ACCEPT") {
                setNew(true)
                return;
            }
        }
        setNew(false)
    }

    const handleUnassign = () => {
        setLoader(true)
        let obj = {
            pageNo: pageNoss,
            requestId: usersData.requestId
        }
        listUnassignHealthworker(obj)
            .then((res) => {
                if (res.status == 200) {
                    const data = res.data.info;
                    setUserData(data)
                    setTotalPagess(res.data.totalPage)
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

    const handleRejectList = () => {
        setLoader(true)
        let obj = {
            pageNo: pageNo,
            requestId: usersData.requestId,
            type: "REJECT"
        }
        listAssignHealthworker(obj)
            .then((res) => {
                console.log("res >>", res)
                if (res.status == 200) {
                    const data = res.data.info;
                    setRejectData(data)
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

    const handleRemoveHealthworker = () => {
        setIsLoading(true)
        let obj = {
            assignId: isAssignId
        }
        removeAssignHealthworker(obj)
            .then((res) => {
                if (res.status == 200) {
                    handleAssignList()
                    handleAssignLists()
                    setIsRemove(false)
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

    const assignPaginationButton = () => {
        const maxPagesToShow = 3;
        const buttons = [];
        const startPage = Math.max(1, pageNos - Math.floor(maxPagesToShow / 2));
        const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => handleAssignChange(i)}
                    className={i === pageNos ? 'px-4 py-[7px] mx-1 bg-[#EA5F5F1A] rounded-md text-[#EA5F5F]' : 'px-4 py-[7px] mx-1 text-[#EA5F5F]'}
                >
                    {i}
                </button>
            );
        }
        return buttons;
    };

    const handleAssignChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setPageNos(page);
        }
    };

    const unassignPaginationButton = () => {
        const maxPagesToShow = 3;
        const buttons = [];
        const startPage = Math.max(1, pageNoss - Math.floor(maxPagesToShow / 2));
        const endPage = Math.min(totalPagess, startPage + maxPagesToShow - 1);

        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => handleUnassignChange(i)}
                    className={i === pageNoss ? 'px-4 py-[7px] mx-1 bg-[#EA5F5F1A] rounded-md text-[#EA5F5F]' : 'px-4 py-[7px] mx-1 text-[#EA5F5F]'}
                >
                    {i}
                </button>
            );
        }
        return buttons;
    };

    const handleUnassignChange = (page) => {
        if (page > 0 && page <= totalPagess) {
            setPageNoss(page);
        }
    };

    const popupPaginationButton = () => {
        const maxPagesToShow = 3;
        const buttons = [];
        const startPage = Math.max(1, pageNosss - Math.floor(maxPagesToShow / 2));
        const endPage = Math.min(totalPagesss, startPage + maxPagesToShow - 1);

        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => handlePopupChange(i)}
                    className={i === pageNosss ? 'px-4 py-[7px] mx-1 bg-[#EA5F5F1A] rounded-md text-[#EA5F5F]' : 'px-4 py-[7px] mx-1 text-[#EA5F5F]'}
                >
                    {i}
                </button>
            );
        }
        return buttons;
    };

    const handlePopupChange = (page) => {
        if (page > 0 && page <= totalPagesss) {
            setPageNosss(page);
        }
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

    const handleSelectAll = () => {
        if (selectedRows.length === userData.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(userData.map(item => item.userId));
        }
    };

    const handleSelectRow = (id) => {
        if (selectedRows.includes(id)) {
            setSelectedRows(selectedRows.filter(selectedId => selectedId !== id));
        } else {
            setSelectedRows([...selectedRows, id]);
        }
    };

    const isSelected = (id) => selectedRows.includes(id);

    let servicess = [];
    const address = usersData.companyAddress;
    const services = usersData.requestServices;

    for (let i = 0; i < services.length; i++) {
        const serviceName = services[i].healthService.serviceName;
        servicess.push(serviceName);
    }

    const handleAssign = () => {
        setIsLoading(true)
        let obj = {
            userId: selectedRows.toString(),
            requestId: usersData.requestId,
            companyId: usersData.companyId,
            addressId: usersData.addressId,
        }
        assignHealthworker(obj)
            .then((res) => {
                if (res.status == 200) {
                    setSelectedRows([])
                    handleAssignList()
                    setModalOpens(false)
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

    const handleRequestStatus = (status) => {
        setIsLoading(true)
        const param = { requestId: usersData.requestId, requestStatus: status }
        requestStatusChange(param)
            .then((res) => {
                if (res.status == 200) {
                    if (status == "CANCELLED") {
                        setIsCancel(false)
                        usersData.requestStatus = "CANCELLED";
                    } else {
                        setIsAccept(false)
                        usersData.requestStatus = "CONFIRMED";
                    }
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

    const handleDetails = (id) => {
        navigate("/welo_admin/reportDetails/" + id)
    }

    return (
        <div className='md:m-4 m-1'>
            <div className='flex items-center cursor-pointer fontNew mb-4'>
                <img src={back} onClick={() => { navigate("/welo_admin/requests") }} className='w-4' alt="" />
                <p onClick={() => { navigate("/welo_admin/requests") }} className='text-base font-medium ms-3'>Go back</p>
            </div>
            <div className='grid grid-cols-12 gap-3'>
                {
                    newLoader ?
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
                            <div className='2xl:col-span-8 xl:col-span-12 lg:col-span-12 md:col-span-12 col-span-12 fontNew duration-300 '>
                                <div className='bg-white md:px-7 px-3 py-3 rounded-2xl'>
                                    <div className='flex flex-wrap-reverse justify-between border-b-2 border-dashed py-5'>
                                        <div className='flex flex-wrap'>
                                            <div>
                                                <p className='text-base font-semibold pb-1'># {usersData.requestId || "0"}</p>
                                                <p className='text-sm font-medium text-gray-400'>{moment(usersData.createdAt).format("LLL") || ""}</p>
                                            </div>
                                            <div className='lg:ms-14 md:ms-7 ms-4'>
                                                {
                                                    usersData.requestStatus == "PENDING" ?
                                                        <button className='bg-[#f2994a1a] py-2 px-3 text-[#F2A205] text-sm rounded-lg'>Pending</button>
                                                        : usersData.requestStatus == "CONFIRMED" ?
                                                            <button className='bg-[#7424f21a] py-2 px-3 text-[#7424F2] text-sm rounded-lg'>Confirmed</button>
                                                            : usersData.requestStatus == "INPROGRESS" ?
                                                                <button className='bg-[#2336E41A] py-2 px-3 text-[#2336E4] text-sm rounded-lg'>In-Progress</button>
                                                                : usersData.requestStatus == "COMPLETED" ?
                                                                    <button className='bg-[#00987C29] py-2 px-3 text-[#00987C] text-sm rounded-lg'>Completed</button>
                                                                    : <button className='bg-[#e423231a] py-2 px-3 text-[#E42323] text-sm rounded-lg'>Cancelled</button>
                                                }
                                            </div>
                                        </div>
                                        <div className='sm:mb-0 mb-3 flex'>
                                            {
                                                usersData.requestStatus == "PENDING" ?
                                                    <>
                                                        {
                                                            isNew === false ?
                                                                <>
                                                                    <button onClick={() => setIsCancel(true)} className='bg-[#EA5F5F] text-white flex text-sm sm:text-base items-center h-[38px] px-[12px] mr-3 rounded-[10px]'>
                                                                        Cancel Request
                                                                    </button>
                                                                    <button onClick={() => { setModalOpens(true); handleUnassign() }} className='bg-[#139E84] text-white flex text-sm sm:text-base items-center h-[38px] px-[12px] rounded-[10px]'>
                                                                        Assign Request
                                                                    </button>
                                                                </>
                                                                :
                                                                <>
                                                                    <button onClick={() => setIsCancel(true)} className='bg-[#EA5F5F] text-white flex text-sm sm:text-base items-center h-[38px] px-[12px] mr-3 rounded-[10px]'>
                                                                        Cancel Request
                                                                    </button>
                                                                    <button onClick={() => setIsAccept(true)} className='bg-[#139E84] text-white flex text-sm sm:text-base items-center h-[38px] px-[12px] rounded-[10px]'>
                                                                        Confirm Request
                                                                    </button>
                                                                </>
                                                        }
                                                    </>
                                                    :
                                                    ""
                                            }
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-12 mt-2'>
                                        <div className='2xl:col-span-6 xl:col-span-6 lg:col-span-6 md:col-span-6 col-span-12 bg-white rounded-2xl fontNew duration-300 my-2'>
                                            <div className='flex justify-start mt-2'>
                                                <div>
                                                    <p className='text-base text-[#6C6D7B] mt-2'>Visit Date:</p>
                                                    <p className='text-base font-medium pb-1 mt-2'>{moment(usersData.requestDate).format("LL") || ""}</p>
                                                </div>
                                                <div className='ms-10'>
                                                    <p className='text-base text-[#6C6D7B] mt-2'>Visit Time:</p>
                                                    <p className='text-base font-medium pb-1 mt-2'>{usersData.startTime} - {usersData.endTime}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='2xl:col-span-4 xl:col-span-4 lg:col-span-12 md:col-span-12 col-span-12 bg-white rounded-2xl fontNew duration-300 my-2'>
                                            <div className='flex justify-start mt-2'>
                                                <div className=''>
                                                    <p className='text-base text-[#6C6D7B] my-2'>No. of {newName}:</p>
                                                    <p className='text-base font-medium pb-1 my-2'>{usersData.NoOfEmployee || "0"}</p>
                                                </div>
                                                <div className='ms-10'>
                                                    <p className='text-base text-[#6C6D7B] my-2'>Cost:</p>
                                                    <p className='text-base font-medium pb-1 my-2'>R {usersData.estimatedCost || "0"}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='2xl:col-span-6 xl:col-span-6 lg:col-span-6 md:col-span-6 col-span-12 bg-white rounded-2xl fontNew duration-300 my-2'>
                                            <p className='text-base text-[#6C6D7B] my-2'>Service Required:</p>
                                            <p className='text-base font-medium pb-1 my-2'>{servicess.toString() || ""}</p>
                                        </div>
                                        <div className='2xl:col-span-6 xl:col-span-6 lg:col-span-6 md:col-span-6 col-span-12 bg-white rounded-2xl fontNew duration-300 my-2'>
                                            <p className='text-base text-[#6C6D7B] my-2'>Site:</p>
                                            <p className='text-base font-medium pb-1 my-2'>{`${address.aptAddress}, ${address.streetAddress}, ${address.city}, ${address.state}-${address.zipCode}`}</p>
                                        </div>
                                        <div className='2xl:col-span-6 xl:col-span-6 lg:col-span-6 md:col-span-6 col-span-12 bg-white rounded-2xl fontNew duration-300 my-2'>
                                            <p className='text-base text-[#6C6D7B] my-2'>Additional requests/preferences</p>
                                            <p className='text-base font-medium pb-1 my-2'>{usersData.specifyText || ""}</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className='flex flex-wrap justify-between items-center my-2'>
                                        <h1 className='text-xl font-medium m-2'>Attendees</h1>
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
                                        userDatas.length == 0 ?
                                            <div className='w-full h-[50vh] justify-center flex items-center'>
                                                <img src={nodata} className='w-28' alt="" />
                                            </div>
                                            :
                                            <>
                                                <div className="col-span-12 overflow-auto">
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
                                                                <th className='py-4 px-5 text-base font-medium whitespace-nowrap text-start first:rounded-l-lg last:rounded-r-lg'>
                                                                    ID
                                                                </th>
                                                                <th className='py-4 px-3 text-base font-medium whitespace-nowrap text-start first:rounded-l-lg last:rounded-r-lg'>
                                                                    {newName}
                                                                </th>
                                                                <th className='py-4 px-3 text-base font-medium whitespace-nowrap text-start first:rounded-l-lg last:rounded-r-lg'>
                                                                    Healthworker
                                                                </th>
                                                                <th className='py-4 px-3 text-base font-medium whitespace-nowrap text-start first:rounded-l-lg last:rounded-r-lg'>Gender</th>
                                                                <th className='py-4 px-3 text-base font-medium whitespace-nowrap text-start first:rounded-l-lg last:rounded-r-lg'>Service</th>
                                                                <th className='py-4 px-3 text-base font-medium whitespace-nowrap text-start first:rounded-l-lg last:rounded-r-lg'>Report</th>
                                                                <th className='py-4 px-3 text-base font-medium whitespace-nowrap text-start first:rounded-l-lg last:rounded-r-lg'>Status</th>
                                                            </tr>
                                                            <tbody>
                                                                {
                                                                    userDatas.map((item, index) => {
                                                                        const user = item.User;
                                                                        const medial = item?.medicalCertificate?.healthworkerDetails;
                                                                        const request = item?.medicalCertificate?.requestServices;
                                                                        return (
                                                                            <tr key={index} className='bg-white font-medium'>
                                                                                <td className='text-start px-4 py-3 first:rounded-l-lg last:rounded-r-lg'>
                                                                                    <div className='whitespace-nowrap'>
                                                                                        {item.requestEmployeeId || ""}
                                                                                    </div>
                                                                                </td>
                                                                                <td className='text-start px-4 py-3 first:rounded-l-lg last:rounded-r-lg'>
                                                                                    <div className='whitespace-nowrap w-52 flex items-center'>
                                                                                        <img
                                                                                            src={user && user.profilePic ? IMG_URL + user.profilePic : noImage}
                                                                                            className='w-10 h-10 rounded-full object-cover'
                                                                                            crossOrigin='anonymous'
                                                                                            alt=""
                                                                                        />
                                                                                        <p className='text-base ms-3'>{user ? `${user.firstName || ""} ${user.lastName || ""}` : ""}</p>
                                                                                    </div>
                                                                                </td>
                                                                                <td className='text-start px-4 py-3 first:rounded-l-lg last:rounded-r-lg'>
                                                                                    {
                                                                                        medial ?
                                                                                            <div className='whitespace-nowrap w-52 flex items-center'>
                                                                                                <img
                                                                                                    src={medial && medial.profilePic ? IMG_URL + medial.profilePic : noImage}
                                                                                                    className='w-10 h-10 rounded-full object-cover'
                                                                                                    crossOrigin='anonymous'
                                                                                                    alt=""
                                                                                                />
                                                                                                <p className='text-base ms-3'>{medial ? `${medial.firstName || "-"} ${medial.lastName || "-"}` : ""}</p>
                                                                                            </div>
                                                                                            : "-"
                                                                                    }
                                                                                </td>
                                                                                <td className='text-start px-4 py-3 first:rounded-l-lg last:rounded-r-lg'>
                                                                                    <div className='whitespace-nowrap'>
                                                                                        {user ? user.employeeGender || "" : ""}
                                                                                    </div>
                                                                                </td>
                                                                                <td className='text-start px-4 py-3 first:rounded-l-lg last:rounded-r-lg'>
                                                                                    <div className='whitespace-nowrap'>
                                                                                        {request ? request[0].healthService.serviceName : ""}
                                                                                    </div>
                                                                                </td>
                                                                                <td className='text-start px-4 py-3 first:rounded-l-lg last:rounded-r-lg'>
                                                                                    {
                                                                                        item.medicalCertificate == null ? "-" :
                                                                                            <div className='whitespace-nowrap w-32 flex items-center cursor-pointer' onClick={(e) => handleDetails(item.requestEmployeeId)}>
                                                                                                <img src={pdf} className='w-7' alt="" />
                                                                                                <p className='text-base ms-3 text-[#EA5F5F]'>View Report</p>
                                                                                            </div>
                                                                                    }
                                                                                </td>
                                                                                <td className='text-start px-4 py-3 first:rounded-l-lg last:rounded-r-lg'>
                                                                                    {
                                                                                        usersData && usersData.requestStatus === "COMPLETED" ?
                                                                                            <div className='whitespace-nowrap text-[#00987C]'>
                                                                                                Completed
                                                                                            </div>
                                                                                            :
                                                                                            "Wait"
                                                                                    }
                                                                                </td>
                                                                            </tr>
                                                                        );
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
                            </div>
                            <div className='2xl:col-span-4 xl:col-span-12 lg:col-span-12 md:col-span-12 col-span-12 fontNew duration-300'>
                                <div className='bg-white rounded-xl'>
                                    <div className='w-full h-32 bg-center bg-cover text-white flex flex-col items-start justify-center md:px-8 px-3 rounded-t-xl' style={{ backgroundImage: `url(${background})` }}>
                                        <p className='text-2xl font-medium pb-2'>Assigned</p>
                                        <p>Healthcare Workers for medicals</p>
                                    </div>
                                    {
                                        assigneData.length == 0 ?
                                            <div className='text-center px-4 py-8'>
                                                <div className='flex justify-center'>
                                                    <img src={clock} className='w-28' alt="" />
                                                </div>
                                                <p className='text-gray-400 mt-7'>Waiting for the assignment of the <br /> healthcare workers</p>
                                            </div>
                                            :
                                            <div className='md:px-6 px-3 py-3'>
                                                {
                                                    assigneData.map((items, index) => {
                                                        const data = items.assignedUser
                                                        return (
                                                            <div key={index} className='flex items-center justify-between py-3 cursor-pointer'>
                                                                <div className='flex items-center'>
                                                                    <img src={data.profilePic ? IMG_URL + data.profilePic : noImage} crossOrigin='anonymous' className='w-14 h-14 object-cover rounded-full' alt="" />
                                                                    <div className='ms-4'>
                                                                        <p className='md:text-base text-[15px] font-medium'>{data.firstName || ""} {data.lastNames || ""}</p>
                                                                        <p className='md:text-sm text-[14px] text-gray-500'>{data.professionalPractice || ""}</p>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    {
                                                                        items.isAccept == "PENDING" ?
                                                                            <button className='bg-[#f2994a1a] py-2 px-3 text-[#F2A205] text-sm rounded-lg'>Pending</button>
                                                                            :
                                                                            <button className='bg-[#00987C29] py-2 px-3 text-[#00987C] text-sm rounded-lg'>Accepted</button>
                                                                    }
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                                <div className='col-span-12 flex items-center sm:justify-end justify-center bg-white py-4 sm:px-8 px-0 mt-4 rounded-lg'>
                                                    <div className='flex items-center cursor-pointer'>
                                                        <p onClick={() => handleAssignChange(pageNos - 1)} disabled={pageNos === 1}>
                                                            Previous
                                                        </p>
                                                        <div className="flex items-center mx-6">
                                                            {assignPaginationButton()}
                                                        </div>
                                                        <p onClick={() => handleAssignChange(pageNos + 1)} disabled={pageNos === totalPages}>
                                                            Next
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                    }

                                    <div className='flex items-center md:px-6 px-3 py-3'>
                                        {
                                            assigneData.length === 0 ? ""
                                                :
                                                <>
                                                    {
                                                        <>
                                                            {
                                                                usersData.requestStatus === "PENDING" ?
                                                                    <>
                                                                        {
                                                                            isNew === false ? ""
                                                                                :
                                                                                <button onClick={() => { handleAssignLists(); setModalOpen(true) }} className='bg-[#139E84] text-white flex items-center justify-center h-[38px] md:w-[135px] w-[100px] rounded-[10px] mr-3'>
                                                                                    Edit
                                                                                </button>
                                                                        }
                                                                    </>
                                                                    : ""
                                                            }
                                                        </>
                                                    }
                                                    <button onClick={() => { handleRejectList(); setIsRejectOpen(true) }} className='bg-[#2336E41A] py-2 px-3 text-[#2336E4] text-sm rounded-lg'>
                                                        View Rejected Requests
                                                    </button>
                                                </>
                                        }
                                    </div>
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
                    <Dialog.Description className="rounded-none border-2 border-white fontNew">
                        <div className="grid-cols-12 grid md:px-[30px] px-[10px] bg-[#F4F5FA]">
                            <div className="col-span-12 py-[20px]">
                                <div className='flex flex-wrap justify-between items-center'>
                                    <h1 className='text-2xl sm:mb-0 mb-3 font-medium'>Assign to  healthworkers</h1>
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
                        </div>
                        <div className="grid grid-cols-12 md:px-[30px] px-[10px] bg-[#F4F5FA] overflow-auto md:h-[580px] h-[500px]">
                            {
                                loader ?
                                    <div className='flex justify-center items-center col-span-12 h-[50vh]'>
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
                                                    <img src={nodata} className='w-28' alt="" />
                                                </div>
                                                :
                                                <>
                                                    <div className="col-span-12">
                                                        <div
                                                            className='w-full overflow-auto'
                                                            onMouseDown={startDragging}
                                                            onMouseLeave={stopDragging}
                                                            onMouseUp={stopDragging}
                                                            onMouseMove={onDragging}
                                                            ref={scrollRef}
                                                        >
                                                            <table className='w-full border-separate border-spacing-y-3'>
                                                                <thead>
                                                                    <tr className='bg-white'>
                                                                        <th className='py-4 px-5 text-base font-medium whitespace-nowrap text-start first:rounded-l-lg last:rounded-r-lg'>
                                                                            <input
                                                                                type="checkbox"
                                                                                checked={selectedRows.length === userData.length}
                                                                                onChange={handleSelectAll}
                                                                            />
                                                                        </th>
                                                                        <th className='py-4 px-3 text-base font-medium whitespace-nowrap text-start first:rounded-l-lg last:rounded-r-lg'>Name</th>
                                                                        <th className='py-4 px-3 text-base font-medium whitespace-nowrap text-start first:rounded-l-lg last:rounded-r-lg'>Role</th>
                                                                        <th className='py-4 px-3 text-base font-medium whitespace-nowrap text-start first:rounded-l-lg last:rounded-r-lg'>Price/par day</th>
                                                                        <th className='py-4 px-3 text-base font-medium whitespace-nowrap text-start first:rounded-l-lg last:rounded-r-lg'>Availability</th>
                                                                        <th className='py-4 px-3 text-base font-medium whitespace-nowrap text-start first:rounded-l-lg last:rounded-r-lg'>Completed</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        userData.map((item, index) => {
                                                                            const data = item.healthworkerProfessional;
                                                                            return (
                                                                                <tr key={index}
                                                                                    className={`font-medium ${isSelected(item.userId) ? 'bg-gray-200' : 'bg-white'}`}
                                                                                >
                                                                                    <td className='text-start px-5 py-3 first:rounded-l-lg last:rounded-r-lg'>
                                                                                        <div className='whitespace-nowrap'>
                                                                                            <input
                                                                                                type="checkbox"
                                                                                                checked={isSelected(item.userId)}
                                                                                                onChange={() => handleSelectRow(item.userId)}
                                                                                            />
                                                                                        </div>
                                                                                    </td>
                                                                                    <td className='text-start px-4 py-3 first:rounded-l-lg last:rounded-r-lg'>
                                                                                        <div className='whitespace-nowrap w-52 flex items-center'>
                                                                                            <img src={item.profilePic ? IMG_URL + item.profilePic : noImage} crossOrigin='anonymous' className='w-10 h-10 rounded-full object-cover' alt="" />
                                                                                            <p className='text-base ms-3'>{item.firstName || ""} {item.lastName || ""}</p>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td className='text-start px-4 py-3 first:rounded-l-lg last:rounded-r-lg'>
                                                                                        <div className='whitespace-nowrap'>
                                                                                            {data && data.professional || "-"}
                                                                                        </div>
                                                                                    </td>
                                                                                    <td className='text-start px-4 py-3 first:rounded-l-lg last:rounded-r-lg'>
                                                                                        <div className='whitespace-nowrap'>
                                                                                            {data && data.pricePerDay || "-"}
                                                                                        </div>
                                                                                    </td>
                                                                                    <td className='text-start px-4 py-3 first:rounded-l-lg last:rounded-r-lg'>
                                                                                        <div className='whitespace-nowrap'>
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
                                                                                    <td className='text-start px-4 py-3 first:rounded-l-lg last:rounded-r-lg'>
                                                                                        <div className='whitespace-nowrap text-center'>
                                                                                            {item.compeltedAppoinments || "0"}
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
                                                    <div className='col-span-12 flex items-center sm:justify-end justify-center bg-white py-4 sm:px-8 px-0 mt-4 h-[70px] rounded-lg'>
                                                        <div className='flex items-center cursor-pointer'>
                                                            <p onClick={() => handleUnassignChange(pageNoss - 1)} disabled={pageNoss === 1}>
                                                                Previous
                                                            </p>
                                                            <div className="flex items-center mx-6">
                                                                {unassignPaginationButton()}
                                                            </div>
                                                            <p onClick={() => handleUnassignChange(pageNoss + 1)} disabled={pageNoss === totalPagess}>
                                                                Next
                                                            </p>
                                                        </div>
                                                    </div>
                                                </>
                                        }
                                    </>
                            }
                        </div>
                        <div className='grid grid-cols-12'>
                            <div className="col-span-12 bg-white py-[20px] md:px-[30px] px-[10px]">
                                <div className='flex justify-end font-medium'>
                                    <button onClick={() => setModalOpens(false)} className='bg-[#F4F5FA] text-[#575757] flex items-center justify-center mr-3 h-[42px] w-[130px] rounded-[10px]'>
                                        Close
                                    </button>
                                    {
                                        userData.length == 0 ? ""
                                            :
                                            <button onClick={handleAssign} disabled={isLoading} className='bg-[#139E84] text-white flex items-center justify-center h-[42px] w-[130px] rounded-[10px]'>
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
                                                    "Assign"
                                                )}
                                            </button>
                                    }
                                </div>
                            </div>
                        </div>
                    </Dialog.Description>
                </Dialog.Panel>
            </Dialog>

            <Dialog
                open={isModalOpen}
                onClose={() => setModalOpen(false)}
                size='xxl'
            >
                <Dialog.Panel>
                    <Dialog.Description className="rounded-none border-2 border-white fontNew">
                        <div className="grid-cols-12 grid md:px-[30px] px-[10px] bg-[#F4F5FA]">
                            <div className="col-span-12 py-[20px]">
                                <h1 className='text-2xl sm:mb-0 mb-3 font-medium'>Assigned</h1>
                            </div>
                        </div>
                        <div className="grid grid-cols-12 md:px-[30px] px-[10px] bg-[#F4F5FA] overflow-auto md:h-[580px] h-[500px]">
                            {
                                assigneDatas.length === 0 ?
                                    <div className='col-span-12 h-[50vh] justify-center flex items-center'>
                                        <img src={nodata} className='w-28' alt="" />
                                    </div>
                                    :
                                    <>
                                        <div className="col-span-12">
                                            <div
                                                className='w-full overflow-auto'
                                                onMouseDown={startDragging}
                                                onMouseLeave={stopDragging}
                                                onMouseUp={stopDragging}
                                                onMouseMove={onDragging}
                                                ref={scrollRef}
                                            >
                                                <table className='w-full border-separate border-spacing-y-3'>
                                                    <thead>
                                                        <tr className='bg-white'>
                                                            <th className='py-4 px-3 text-base font-medium whitespace-nowrap text-start first:rounded-l-lg last:rounded-r-lg'>Name</th>
                                                            <th className='py-4 px-3 text-base font-medium whitespace-nowrap text-start first:rounded-l-lg last:rounded-r-lg'>Role</th>
                                                            <th className='py-4 px-3 text-base font-medium whitespace-nowrap text-start first:rounded-l-lg last:rounded-r-lg'>Availability</th>
                                                            <th className='py-4 px-3 text-base font-medium whitespace-nowrap text-start first:rounded-l-lg last:rounded-r-lg'>Status</th>
                                                            <th className='py-4 px-3 text-base font-medium whitespace-nowrap text-start first:rounded-l-lg last:rounded-r-lg'>Remove</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            assigneDatas.map((item, index) => {
                                                                const data = item.assignedUser
                                                                return (
                                                                    <tr key={index}
                                                                        className={`font-medium bg-white`}
                                                                    >
                                                                        <td className='text-start px-4 py-3 first:rounded-l-lg last:rounded-r-lg'>
                                                                            <div className='whitespace-nowrap w-52 flex items-center'>
                                                                                <img src={data.profilePic ? IMG_URL + data.profilePic : noImage} crossOrigin='anonymous' className='w-10 h-10 rounded-full object-cover' alt="" />
                                                                                <p className='text-base ms-3'>{data.firstName || ""} {data.lastName || ""}</p>
                                                                            </div>
                                                                        </td>
                                                                        <td className='text-start px-4 py-3 first:rounded-l-lg last:rounded-r-lg'>
                                                                            <div className='whitespace-nowrap'>
                                                                                {data.professionalPractice || "-"}
                                                                            </div>
                                                                        </td>
                                                                        <td className='text-start px-4 py-3 first:rounded-l-lg last:rounded-r-lg'>
                                                                            <div className='whitespace-nowrap'>
                                                                                {
                                                                                    data.isOnline == "NO" ?
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
                                                                        <td className='text-start px-4 py-3 first:rounded-l-lg last:rounded-r-lg'>
                                                                            <div className='whitespace-nowrap'>
                                                                                {
                                                                                    item.isAccept == "PENDING" ?
                                                                                        <button className='bg-[#f2994a1a] py-2 px-3 text-[#F2A205] text-sm rounded-lg'>Pending</button>
                                                                                        :
                                                                                        <button className='bg-[#00987C29] py-2 px-3 text-[#00987C] text-sm rounded-lg'>Accepted</button>
                                                                                }
                                                                            </div>
                                                                        </td>
                                                                        <td className='text-start px-4 py-3 first:rounded-l-lg last:rounded-r-lg'>
                                                                            <div className='whitespace-nowrap'>
                                                                                {
                                                                                    item.isAccept == "PENDING" ?
                                                                                        <img src={deletes} onClick={() => { setIsRemove(true); setIsAssignId(item.assignId) }} className='lg:w-9 w-8 cursor-pointer' alt="Delete" />
                                                                                        : "-"
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
                                    </>
                            }
                        </div>
                        <div className='grid grid-cols-12'>
                            {
                                assigneDatas.length === 0 ? ""
                                    :
                                    <div className='col-span-12 flex flex-wrap items-center sm:justify-between justify-center bg-white py-4 sm:px-8 px-0 rounded-lg'>
                                        <div className='flex items-center'>
                                            <button onClick={() => setModalOpen(false)} className='bg-[#F4F5FA] text-[#575757] flex items-center justify-center mr-3 h-[42px] w-[130px] rounded-[10px]'>
                                                Close
                                            </button>
                                        </div>
                                        <div className='flex items-center cursor-pointer'>
                                            <p onClick={() => handlePopupChange(pageNosss - 1)} disabled={pageNosss === 1}>
                                                Previous
                                            </p>
                                            <div className="flex items-center mx-6">
                                                {popupPaginationButton()}
                                            </div>
                                            <p onClick={() => handlePopupChange(pageNosss + 1)} disabled={pageNosss === totalPagesss}>
                                                Next
                                            </p>
                                        </div>
                                    </div>
                            }
                        </div>
                    </Dialog.Description>
                    <Dialog
                        open={isRemove}
                        onClose={() => setIsRemove(false)}
                        size="md"
                    >
                        <Dialog.Panel>
                            <Dialog.Description className="rounded-none border-2 border-white">
                                <div className='flex justify-center text-center my-4 sm:px-16 px-4 fontNew'>
                                    <div>
                                        <h1 className='text-xl font-semibold text-black mt-6'>Remove?</h1>
                                        <p className='text-sm text-gray-500 my-3'>Are you sure you want to Remove this <br /> Healthworker ?</p>
                                        <div className='mt-13 flex items-center mb-5'>
                                            <button className='bg-[#F4F5FA] h-[50px] sm:w-36 w-30 text-sm rounded-xl sm:mx-3 mx-2' onClick={() => setIsRemove(false)}>Close</button>
                                            <button className='bg-[#EA5F5F] h-[50px] sm:w-36 w-30 text-sm rounded-xl sm:mx-3 mx-2 text-white' onClick={handleRemoveHealthworker}>
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
                                                    "Yes, Remove"
                                                )}

                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Description>
                        </Dialog.Panel>
                    </Dialog>
                </Dialog.Panel>
            </Dialog>

            <Dialog
                open={isRejectOpen}
                onClose={() => setIsRejectOpen(false)}
                size="md"
            >
                <Dialog.Panel>
                    <Dialog.Description className="rounded-none border-2 border-white fontNew">
                        <div>
                            <h1 className='text-xl font-medium mt-5 px-8'>Reject Requests</h1>
                            <div>
                                <div className='my-5 overflow-auto h-[500px] px-8'>
                                    {
                                        loader ?
                                            <div className='flex justify-center items-center col-span-12 h-[50vh]'>
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
                                                    rejectData.length === 0 ?
                                                        <div className='col-span-12 h-[50vh] justify-center flex items-center'>
                                                            <img src={nodata} className='w-28' alt="" />
                                                        </div>
                                                        :
                                                        <>
                                                            {
                                                                rejectData.map((items, index) => {
                                                                    const data = items.assignedUser
                                                                    return (
                                                                        <div key={index} className='border-b-2 border-dashed py-5'>
                                                                            <div key={index} className='flex items-center justify-between pb-3'>
                                                                                <div className='flex items-center'>
                                                                                    <img src={data.profilePic ? IMG_URL + data.profilePic : noImage} crossOrigin='anonymous' className='w-12 h-12 object-cover rounded-full' alt="" />
                                                                                    <div className='ms-4'>
                                                                                        <p className='text-base font-medium'>{data.firstName || ""} {data.lastName || ""}</p>
                                                                                        <p className='text-sm text-gray-500'>{data.professionalPractice || ""}</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div>
                                                                                    <button className='bg-[#D11A2A29] py-1 px-3 text-[#D11A2A] text-sm rounded-lg'>Rejected</button>
                                                                                </div>
                                                                            </div>
                                                                            <div>
                                                                                <p className='text-sm text-[#6C6D7B]'>Reason :</p>
                                                                                <p className='text-sm text-black'>{items.rejectReason || ""}</p>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </>
                                                }
                                            </>
                                    }
                                </div>

                                <div className='flex font-medium w-full px-8 pb-4'>
                                    <button onClick={() => setIsRejectOpen(false)} className='bg-[#F4F5FA] text-[#575757] flex items-center justify-center h-[42px] w-[130px] rounded-[10px]'>
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Dialog.Description>
                </Dialog.Panel>
            </Dialog>

            <Dialog
                open={isCancel}
                onClose={() => setIsCancel(false)}
                size="md"
            >
                <Dialog.Panel>
                    <Dialog.Description className="rounded-none border-2 border-white">
                        <div className='flex justify-center text-center my-4 sm:px-16 px-4 fontNew'>
                            <div>
                                <h1 className='text-xl font-semibold text-black mt-6'>Cancel?</h1>
                                <p className='text-sm text-gray-500 my-3'>Are you sure you want to Cancel this <br /> Request ?</p>
                                <div className='mt-13 flex items-center mb-5'>
                                    <button className='bg-[#F4F5FA] h-[50px] sm:w-36 w-30 text-sm rounded-xl sm:mx-3 mx-2' onClick={() => setIsCancel(false)}>Close</button>
                                    <button className='bg-[#EA5F5F] h-[50px] sm:w-36 w-30 text-sm rounded-xl sm:mx-3 mx-2 text-white' onClick={() => handleRequestStatus("CANCELLED")}>
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
                                            "Yes, Cancel"
                                        )}

                                    </button>
                                </div>
                            </div>
                        </div>
                    </Dialog.Description>
                </Dialog.Panel>
            </Dialog>

            <Dialog
                open={isAccept}
                onClose={() => setIsAccept(false)}
                size="md"
            >
                <Dialog.Panel>
                    <Dialog.Description className="rounded-none border-2 border-white">
                        <div className='flex justify-center text-center my-4 sm:px-16 px-4 fontNew'>
                            <div>
                                <h1 className='text-xl font-semibold text-black mt-6'>Confirm?</h1>
                                <p className='text-sm text-gray-500 my-3'>Are you sure you want to confirm this <br /> Request ?</p>
                                <div className='mt-13 flex items-center mb-5'>
                                    <button className='bg-[#F4F5FA] h-[50px] sm:w-36 w-30 sm:text-base text-sm rounded-xl sm:mx-3 mx-2' onClick={() => setIsAccept(false)}>Close</button>
                                    <button className='bg-[#00987C] h-[50px] sm:w-36 w-30 sm:text-base text-sm rounded-xl sm:mx-3 mx-2 text-white' onClick={() => handleRequestStatus("CONFIRMED")}>
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
                                            "Yes, Confirm"
                                        )}

                                    </button>
                                </div>
                            </div>
                        </div>
                    </Dialog.Description>
                </Dialog.Panel>
            </Dialog>
        </div>
    )
}

export default RequestDetails