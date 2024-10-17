import React, { useEffect, useState } from 'react'
import FormSelect from '../../Base-Component/FormSelect/FormSelect'
import add from "../../Assets/Image/corporate/add.png"
import search from "../../Assets/Image/corporate/Search.png"
import { useNavigate } from 'react-router-dom'
import noImage from "../../Assets/Image/corporate/user.png";
import Dialog from '../../Base-Component/Dialog/Dialog'
import success from "../../Assets/Image/corporate/Success.png"
import mark from "../../Assets/Image/corporate/mark.png"
import nodata from "../../Assets/Image/corporate/nodata.png"
import Lottie from 'react-lottie';
import * as animationData from '../../Assets/jsonfile/Animation.json'
import {
  createRequests,
  getCompaniesInfo,
  getCompaniesList,
  getEmployees,
  getHealthService,
  listRequests,
} from '../../Services/ApiServices'
import toast from 'react-hot-toast'
import moment from 'moment/moment'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { Bars, Circles, ThreeDots } from 'react-loader-spinner'
import InfiniteScroll from 'react-infinite-scroll-component';
import Close from "../../Assets/Image/corporate/close.png"
import { IMG_URL, newName } from '../../Services/Api'

function Requests() {

  const navigate = useNavigate()

  const [selectStatus, setSelectStatus] = useState("ALL")
  const [selectRequestType, setSelectRequestType] = useState("")
  const [isModalOpens, setModalOpens] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loader, setLoader] = useState(false)
  const [hasMoreData, setHasMoreData] = useState(true);
  const [noDatas, setNodatas] = useState(false);

  const [isStep, setIsStap] = useState(0)
  const [serviceAmount, setServiceAmount] = useState(0)
  const [serviceFee, SetServiceFee] = useState(10)
  const [pageNo, setPageNo] = useState(1)
  const [totalPage, setTotalPage] = useState("")
  const [pages, setPages] = useState(1)
  const [totalPages, setTotalPages] = useState("")

  const [searchData, setSearchData] = useState("")
  const [searchText, setSearchText] = useState("")
  const [errors, setErrors] = useState("")
  const [specifyText, setSpecifyText] = useState("")
  const [selectAddress, setSelectAddress] = useState("")
  const [selectCompany, setSelectCompany] = useState("")

  const [addressName, setAddressName] = useState({})
  const [formData, setFormData] = useState({})
  const [companyName, setCompanyName] = useState({})

  const [serviceName, setServiceName] = useState([])
  const [memberId, setMemberId] = useState([])
  const [addressList, setAddressList] = useState([])
  const [requestData, setRequestData] = useState([])
  const [servicesData, setServicesData] = useState([])
  const [employeeList, setEmployeeList] = useState([])
  const [selectedRows, setSelectedRows] = useState([]);
  const [companyList, setCompanyList] = useState([])

  const token = localStorage.getItem("welo_admin_token");
  useEffect(() => {
    if (!token) {
      navigate("/welo_admin/login")
    }
  }, [token])

  const handleListRequest = () => {
    setLoader(true)
    let param = {
      pageNo: pageNo,
      requestStatus: selectStatus
    }
    listRequests(param)
      .then((res) => {
        if (res.status == 200) {
          const data = res.data.info;
          setRequestData(data)
          setTotalPage(res.data.totalPage)
        }
        setLoader(false)
      })
      .catch((err) => {
        if (err.response.status == 401) {
          localStorage.removeItem("welo_admin_token")
          navigate("/welo_admin/login")
        } else {
          toast.error(err.response.data.message)
        }
        setLoader(false)
      })
  }

  useEffect(() => {
    handleListRequest()
  }, [pageNo, selectStatus])

  useEffect(() => {
    if (selectCompany) {
      handleAddressList()
    }
  }, [selectCompany])

  const handleGetEmployee = (pages) => {
    setNodatas(true)
    const obj = { pageNo: pages, searchTerm: searchText, companyId: selectCompany }
    getEmployees(obj)
      .then((res) => {
        if (res.status == 200) {
          const data = res.data.info
          if (pages != 1) {
            setEmployeeList([...employeeList, ...data])
          } else {
            setEmployeeList(data)
          }
          setPages(pages)
          setTotalPages(res.data.totalPage)
        }
        setIsLoading(false)
        setNodatas(false)
      })
      .catch((err) => {
        if (err.response.status == 401) {
          localStorage.removeItem("welo_admin_token")
          navigate("/corporatelogin")
        } else {
          toast.error(err.response.data.message)
        }
        setIsLoading(false)
        setNodatas(false)
      })
  }

  const handleCompanyList = () => {
    // setLoader(true)

    getCompaniesList()
      .then((res) => {
        if (res.status == 200) {
          const data = res.data.info;
          setCompanyList(data)
        }
        setLoader(false)
      })
      .catch((err) => {
        if (err.response.status == 401) {
          localStorage.removeItem("welo_admin_token")
          navigate("/welo_admin/login")
        } else {
          toast.error(err.response.data.message)
        }
        setLoader(false)
      })
  }

  const handleAddressList = () => {
    getCompaniesInfo({ companyId: selectCompany })
      .then((res) => {
        if (res.status === 200) {
          const data = res?.data?.info?.companyAddresses || [];
          if (Array.isArray(data)) {
            setAddressList(data);
          } else {
            console.error("Expected an array for addressList but got:", data);
            setAddressList([]);
          }
        }
        setLoader(false);
      })
      .catch((err) => {
        // Handle errors here
        setLoader(false);
      });
  };

  const handleHealthService = () => {
    getHealthService()
      .then((res) => {
        if (res.status == 200) {
          const data = res.data.info;
          setServicesData(data)
        }
      })
      .catch((err) => {
        if (err.response.status == 401) {
          localStorage.removeItem("welo_admin_token")
          navigate("/welo_admin/login")
        } else {
          toast.error(err.response.data.message)
        }
      })

  }

  const handleStep1 = (e) => {
    e.preventDefault()
    handleGetEmployee(pages)
    setIsStap(1)
  }

  const handleStep2 = (e) => {
    e.preventDefault()
    if (selectedRows.length) {
      setIsStap(2)
      setErrors("")
    } else {
      setErrors("Please Select {newName}")
    }
  }

  const handleStep3 = (e) => {
    e.preventDefault()
    console.log("")
    if (memberId.length) {
      setIsStap(3)
      setErrors("")
    } else {
      setErrors("Please Select Service")
    }
  }

  const handleStep4 = (e) => {
    e.preventDefault()
    setIsStap(4)
  }

  const selectCompanyName = (e) => {
    setSelectCompany(e.target.value)
    for (let i = 0; i < companyList.length; i++) {
      if (companyList[i].companyId == e.target.value) {
        setCompanyName(companyList[i])
      }
    }
  }

  const selectAddressName = (e) => {
    setSelectAddress(e.target.value)
    for (let i = 0; i < addressList.length; i++) {
      if (addressList[i].addressId == e.target.value) {
        console.log("value >>", addressList[i])
        setAddressName(addressList[i])
      }
    }
  }

  const handleRequest = (data) => {
    navigate("/welo_admin/requests/requests_details", { state: { Data: data } })
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
  }

  const handleUserChange = (followId, item) => {
    const servicePrice = parseFloat(item.servicePrice);
    if (memberId.includes(followId)) {
      setMemberId(prevIds => prevIds.filter(id => id !== followId));
      setServiceName(prevServices => prevServices.filter(service => service.serviceId !== followId));
      setServiceAmount(prevAmount => prevAmount - servicePrice);
    } else {
      setMemberId(prevIds => [...prevIds, followId]);
      setServiceName(prevServices => [...prevServices, item]);
      setServiceAmount(prevAmount => prevAmount + servicePrice);
    }
  };

  const isUserSelected = (followId) => {
    return memberId.includes(followId);
  };

  const handleSubmit = () => {
    setIsLoading(true)

    let obj = {
      companyId: selectCompany,
      addressId: selectAddress,
      requestDate: moment(formData.requestDate).utc().format("YYYY-MM-DD"),
      startTime: moment(formData.startTime).utc().format("HH:mm:ss"),
      endTime: moment(formData.endTime).utc().format("HH:mm:ss"),
      specifyText: specifyText,
      estimatedCost: totalCost.toFixed(2),
      serviceFee: 10,
      totalCost: totalCostWithFee.toFixed(2),
      serviceId: memberId.toString(),
      employeeId: selectedRows.toString(),
      NoOfEmployee: selectedRows.length
    }

    createRequests(obj)
      .then((res) => {
        if (res.status == 200) {
          setIsStap(5)
        }
        setIsLoading(false)
      })
      .catch((err) => {
        if (err.response.status == 401) {
          localStorage.removeItem("welo_admin_token")
          navigate("/welo_admin/login")
        } else {
          toast.error(err.response.data.message)
        }
        setIsLoading(false)
      })
  }

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const calculateMaxTime = () => {
    if (formData.startTime) {
      const endOfDay = new Date(formData.startTime);
      endOfDay.setHours(23, 59, 59);
      return endOfDay;
    }
    return null;
  };

  const handleCreate = () => {
    handleHealthService()
    handleCompanyList()
    setModalOpens(true)
    setSelectCompany("")
    setSelectAddress("")
    setSpecifyText("")
    setFormData({})
    setSelectedRows([])
    setMemberId([])
    setIsStap(0)
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

  const totalCost = selectedRows.length * serviceAmount;
  const totalCostWithFee = totalCost * 1.1;

  const handleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(selectedId => selectedId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const isSelected = (id) => selectedRows.includes(id);

  const viewMores = () => {
    if (pages != totalPages) {
      handleGetEmployee(pageNo + 1)
      setHasMoreData(true);
    } else {
      setHasMoreData(false);
    }
  }

  const handleClose = () => {
    setModalOpens(false)
    handleListRequest()
  }

  return (
    <>
      <div className='grid grid-cols-12 md:m-4 m-1 fontNew'>
        <div className='col-span-12'>
          <div>
            <div className='flex flex-wrap-reverse sm:justify-between justify-end mb-4 items-start'>
              <div className='flex flex-wrap items-start'>
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
                <FormSelect id="category" name="fuel_type" value={selectStatus} onChange={(e) => setSelectStatus(e.target.value)} className="sm:ms-3 sm:mb-0 mb-3 ps-5 pl-0 pb-0 pt-0 ms-0 select-arrow-hidden text-sm rounded-[8px] font-medium xl:w-40 sm:w-36 w-full h-10 outline-none">
                  <option value="ALL">All</option>
                  <option value="PENDING">Pending</option>
                  <option value="CONFIRMED">Confirmed</option>
                  <option value="INPROGRESS">In-Progress</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="CANCELLED">Cancelled</option>
                </FormSelect>
              </div>
              <div>
                <button className='bg-[#EA5F5F] text-white flex items-center py-2 px-3 sm:mb-0 mb-3 rounded-lg' onClick={handleCreate} >
                  <img src={add} className='w-6 mr-2' alt="" />New Requests
                </button>
              </div>
            </div>
            <div className='grid grid-cols-12 gap-4'>
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
                      requestData.length === 0 ?
                        <div className='col-span-12 h-[70vh] justify-center flex items-center'>
                          <img src={nodata} className='w-28' alt="No data" />
                        </div>
                        :
                        <>
                          {
                            requestData.map((item, index) => {
                              let servicess = [];
                              const address = item.companyAddress;
                              const services = item.requestServices;
                              const company = item.Company;

                              for (let i = 0; i < services.length; i++) {
                                const serviceName = services[i].healthService.serviceName;
                                servicess.push(serviceName);
                              }
                              return (
                                <div key={index} onClick={() => handleRequest(item)} className='2xl:col-span-4 xl:col-span-4 lg:col-span-6 md:col-span-6 col-span-12 bg-white sm:px-7 px-3 py-3 rounded-[8px] fontNew hover:drop-shadow-lg duration-300 cursor-pointer'>
                                  <div className='flex justify-between border-b-2 border-dashed py-5'>
                                    <div>
                                      <p className='text-base font-semibold pb-1'># {item.requestId || "0"}</p>
                                      <p className='text-sm font-medium text-gray-600'>{moment(item.createdAt).format("LLL") || ""}</p>
                                    </div>
                                    <div>
                                      {
                                        item.requestStatus == "PENDING" ?
                                          <button className='bg-[#f2994a1a] py-2 px-3 text-[#F2A205] text-sm rounded-lg'>Pending</button>
                                          : item.requestStatus == "CONFIRMED" ?
                                            <button className='bg-[#7424f21a] py-2 px-3 text-[#7424F2] text-sm rounded-lg'>Confirmed</button>
                                            : item.requestStatus == "INPROGRESS" ?
                                              <button className='bg-[#2336E41A] py-2 px-3 text-[#2336E4] text-sm rounded-lg'>In-Progress</button>
                                              : item.requestStatus == "COMPLETED" ?
                                                <button className='bg-[#00987C29] py-2 px-3 text-[#00987C] text-sm rounded-lg'>Completed</button>
                                                : <button className='bg-[#e423231a] py-2 px-3 text-[#E42323] text-sm rounded-lg'>Cancelled</button>
                                      }
                                    </div>
                                  </div>
                                  <div>
                                    <p className='text-base text-gray-600 my-2'>Company Name :</p>
                                    <p className='text-base font-medium pb-1 my-2'>{company.companyName || ""}</p>
                                  </div>
                                  <div className='flex justify-start mt-2'>
                                    <div>
                                      <p className='text-base text-gray-600 mt-2'>Visit Date:</p>
                                      <p className='text-base font-medium pb-1 mt-2'>{moment(item.requestDate).format("LL") || ""}</p>
                                    </div>
                                    <div className='ms-10'>
                                      <p className='text-base text-gray-600 mt-2'>Visit Time:</p>
                                      <p className='text-base font-medium pb-1 mt-2'>{item.startTime} - {item.endTime}</p>
                                    </div>
                                  </div>
                                  <div className='flex justify-start mt-2'>
                                    <div className=''>
                                      <p className='text-base text-gray-600 my-2'>No. of {newName}:</p>
                                      <p className='text-base font-medium pb-1 my-2'>{item.NoOfEmployee || "0"}</p>
                                    </div>
                                    <div className='ms-10'>
                                      <p className='text-base text-gray-600 my-2'>Cost:</p>
                                      <p className='text-base font-medium pb-1 my-2'>R {item.estimatedCost || "0"}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <p className='text-base text-gray-600 my-2'>Service Required:</p>
                                    <p className='text-base font-medium pb-1 my-2'>{servicess.toString() || ""}</p>
                                  </div>
                                  <div>
                                    <p className='text-base text-gray-600 my-2'>Site:</p>
                                    <p className='text-base font-medium pb-1 my-2'>{`${address.aptAddress}, ${address.streetAddress}, ${address.city}, ${address.state}-${address.zipCode}`}</p>
                                  </div>
                                </div>
                              )
                            })
                          }
                          <div className='col-span-12 flex items-center sm:justify-end justify-center bg-white py-4 sm:px-8 px-0 mt-4 rounded-lg'>
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
          </div>
        </div>
      </div>

      <Dialog
        open={isModalOpens}
        onClose={() => setModalOpens(false)}
        size='xxl'
      >
        <Dialog.Panel>
          <Dialog.Description className="rounded-none border-2 sm:w-auto w-[360px] sm:h-[690px] h-[580px] border-white sm:overflow-none overflow-auto">
            <div className='sm:block hidden'>
              <div className="grid grid-cols-12 fontNew" >
                {isStep == 5 ?
                  <div className='col-span-4 bg-[#00987C] flex items-center justify-center px-8 text-white h-[686px]'>
                    <img src={success} className='w-20' alt="" />
                  </div>
                  :
                  <div className='col-span-4 bg-[#EA5F5F] lg:px-8 px-4 text-sm text-white h-[686px]'>
                    <h1 className='text-xl pt-8'>Request Visit</h1>
                    <div className='mt-7'>
                      <p className='cursor-pointer flex items-center'>
                        {
                          isStep > 0 ?
                            <img src={mark} className='w-5 ml-1 mr-5' alt="" />
                            :
                            isStep >= 0 ?
                              <div className='border-2 w-7 h-7 flex items-center justify-center rounded-full mr-4'><div className='w-4 h-4 rounded-full bg-white'></div></div>
                              :
                              <div className="w-4 h-4 rounded-full bg-[#F7BFBF] ml-2 mr-5"></div>
                        }
                        <span className={`text-[16px] ${isStep >= 0 ? "text-white" : "text-[#F7BFBF]"}`}>Date, Sites & Attendees</span>
                      </p>
                      <p className={`border-l-2 ms-[13px] h-[70px] ${isStep >= 1 ? "border-white" : "border-[#F7BFBF]"}`}></p>
                      <p className='cursor-pointer flex items-center'>
                        {
                          isStep > 1 ?
                            <img src={mark} className='w-5 ml-1 mr-5' alt="" />
                            :
                            isStep >= 1 ?
                              <div className='border-2 w-7 h-7 flex items-center justify-center rounded-full mr-4'><div className='w-4 h-4 rounded-full bg-white'></div></div>
                              :
                              <div className="w-4 h-4 rounded-full bg-[#F7BFBF] ml-[6px] mr-5"></div>
                        }
                        <span className={`text-[16px] ${isStep >= 1 ? "text-white" : "text-[#F7BFBF]"}`}>Select {newName}</span>
                      </p>
                      <p className={`border-l-2 ms-[13px] h-[70px] ${isStep >= 2 ? "border-white" : "border-[#F7BFBF]"}`}></p>
                      <p className='cursor-pointer flex items-center'>
                        {
                          isStep > 2 ?
                            <img src={mark} className='w-5 ml-1 mr-5' alt="" />
                            :
                            isStep >= 2 ?
                              <div className='border-2 w-7 h-7 flex items-center justify-center rounded-full mr-4'><div className='w-4 h-4 rounded-full bg-white'></div></div>
                              :
                              <div className="w-4 h-4 rounded-full bg-[#F7BFBF] ml-[6px] mr-5"></div>
                        }
                        <span className={`text-[16px] ${isStep >= 2 ? "text-white" : "text-[#F7BFBF]"}`}>Services Required</span>
                      </p>
                      <p className={`border-l-2 ms-[13px] h-[70px] ${isStep >= 3 ? "border-white" : "border-[#F7BFBF]"}`}></p>
                      <p className='cursor-pointer flex items-center'>
                        {
                          isStep > 3 ?
                            <img src={mark} className='w-5 ml-1 mr-5' alt="" />
                            :
                            isStep >= 3 ?
                              <div className='border-2 w-7 h-7 flex items-center justify-center rounded-full mr-4'><div className='w-4 h-4 rounded-full bg-white'></div></div>
                              :
                              <div className="w-4 h-4 rounded-full bg-[#F7BFBF] ml-[6px] mr-5"></div>
                        }
                        <span className={`text-[16px] ${isStep >= 3 ? "text-white" : "text-[#F7BFBF]"}`}>Additional Requests</span>
                      </p>
                      <p className={`border-l-2 ms-[13px] h-[70px] ${isStep >= 4 ? "border-white" : "border-[#F7BFBF]"}`}></p>
                      <p className='cursor-pointer flex items-center'>
                        {
                          isStep > 4 ?
                            <img src={mark} className='w-5 ml-1 mr-5' alt="" />
                            :
                            isStep >= 4 ?
                              <div className='border-2 w-7 h-7 flex items-center justify-center rounded-full mr-4'><div className='w-4 h-4 rounded-full bg-white'></div></div>
                              :
                              <div className="w-4 h-4 rounded-full bg-[#F7BFBF] ml-[6px] mr-5"></div>
                        }
                        <span className={`text-[16px] ${isStep >= 4 ? "text-white" : "text-[#F7BFBF]"}`}>Review and submit request</span>
                      </p>
                    </div>
                  </div>
                }
                <div className='col-span-8'>
                  <div className='mx-7 mt-5 flex justify-end'>
                    <img src={Close} className='w-4 h-4 cursor-pointer opacity-75' onClick={() => setModalOpens(false)} alt="" />
                  </div>
                  <div className='lg:mx-24 mx-10'>
                    {
                      isStep == 0 ?
                        <form onSubmit={handleStep1}>
                          <div className='h-[570px]'>
                            <h1 className='text-2xl font-medium my-5'>Date, Sites & Attendees</h1>
                            <div>
                              <div className='flex items-center'>
                                <div className='w-full mt-3 mb-6 mx-1'>
                                  <p className='fontNew text-sm font-medium mt-3'>Choose Company</p>
                                  <FormSelect id="category" required name="categoryId" value={selectCompany || ""} onChange={(e) => selectCompanyName(e)} className="mt-3 outline-[#00987C] select-arrow-hidden text-base rounded-md font-medium w-full h-12 outline-0 border-[1px] border-slate-300">
                                    <option label="Select"></option>
                                    {
                                      companyList.map((item, index) => {
                                        return (
                                          <option key={index} value={item.companyId}>{item.companyName}</option>
                                        )
                                      })
                                    }
                                  </FormSelect>
                                </div>
                                <div className='w-full mt-3 mb-6 mx-1'>
                                  <p className='fontNew text-sm font-medium mt-3'>Choose Site</p>
                                  <FormSelect id="category" required name="categoryId" value={selectAddress || ""} onChange={(e) => selectAddressName(e)} className="mt-3 outline-[#00987C] select-arrow-hidden text-base rounded-md font-medium w-full pr-10 h-12 outline-0 border-[1px] border-slate-300">
                                    <option label="Select"></option>
                                    {
                                      addressList?.map?.((item, index) => {
                                        return (
                                          <option key={index} value={item.addressId}>
                                            {`${item.aptAddress}, ${item.streetAddress}, ${item.city}, ${item.state}-${item.zipCode}`}
                                          </option>
                                        );
                                      })
                                    }
                                  </FormSelect>
                                </div>
                              </div>
                              <div>
                                <p className='fontNew text-sm font-medium mt-2'>Date</p>
                                <div className='mt-3 mb-6'>
                                  <div className='rounded-md my-3'>
                                    <DatePicker
                                      id="requestDate"
                                      name="requestDate"
                                      autoComplete='off'
                                      required
                                      minDate={Date.now()}
                                      selected={formData.requestDate}
                                      onChange={(e) => handleChange({ target: { name: "requestDate", value: e } })}
                                      placeholderText="Select a date"
                                      onKeyDown={(e) => e.preventDefault()}
                                      dateFormat="yyyy-MM-dd"
                                      showYearDropdown
                                      scrollableYearDropdown
                                      showMonthDropdown
                                      dropdownMode="select"
                                      customInput={
                                        <input
                                          name="text"
                                          value={formData.requestDate}
                                          placeholder="yyyy-MM-dd"
                                        />
                                      }
                                      className="border-[1px] px-4 py-3 border-slate-300 rounded-md w-full outline-[#00987C]"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className='flex items-center'>
                                <div className='w-full mr-2'>
                                  <p className='fontNew text-sm font-medium mt-2'>Start Time</p>
                                  <div className='mt-3 mb-6'>
                                    <div className='rounded-md my-3'>
                                      <DatePicker
                                        required
                                        selected={formData.startTime}
                                        onChange={(e) => handleChange({ target: { name: "startTime", value: e } })}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={30}
                                        startDate={formData.startTime}
                                        endDate={formData.endDate}
                                        timeCaption="Time"
                                        dateFormat="h:mm aa"
                                        placeholderText="Select Time"
                                        className="border-[1px] px-4 py-3 border-slate-300 rounded-md w-full outline-[#00987C]"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className='w-full mr-2'>
                                  <p className='fontNew text-sm font-medium mt-2'>End Time</p>
                                  <div className='mt-3 mb-6'>
                                    <div className='rounded-md my-3'>
                                      <DatePicker
                                        required
                                        selected={formData.endTime}
                                        onChange={(e) => handleChange({ target: { name: "endTime", value: e } })}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={30}
                                        timeCaption="Time"
                                        dateFormat="h:mm aa"
                                        placeholderText="Select Time"
                                        className="border-[1px] px-4 py-3 border-slate-300 rounded-md w-full outline-[#00987C]"
                                        minTime={formData.startTime}
                                        maxTime={calculateMaxTime()}
                                        startDate={formData.startTime}
                                        endDate={formData.endDate}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* <div>
                                <p className='fontNew text-sm font-medium mt-3'>Number of {newName} Attending</p>
                                <div className='mt-3 mb-6'>
                                  <div className='rounded-md my-3'>
                                    <input
                                      type="number"
                                      required
                                      className='border-[1px] px-4 py-3 border-slate-300 rounded-md w-full outline-[#00987C]'
                                      placeholder='Enter'
                                      name='NoOfEmployee'
                                      value={formData.NoOfEmployee || ""}
                                      onChange={(e) => handleChange(e)}
                                    />
                                  </div>
                                </div>
                              </div> */}
                            </div>
                          </div>
                          <div className='flex justify-end items-center'>
                            <button type='submit' className='bg-[#00987C] h-[42px] w-[130px] text-sm rounded-lg text-white'>Next</button>
                          </div>
                        </form>
                        : isStep == 1 ?
                          <form onSubmit={handleStep2}>
                            <div className='h-[570px]'>
                              <div className='flex items-center justify-between my-5'>
                                <h1 className='text-2xl font-medium'>Select {newName}</h1>
                                <div className='flex sm:w-60 w-full h-10 px-4 rounded-xl bg-gray-100 items-center'>
                                  <input
                                    type="search"
                                    className='bg-transparent border-none outline-none sm:w-60 w-full h-10 text-sm fontNew'
                                    placeholder='Search...'
                                    name='search_text'
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                  />
                                </div>
                              </div>
                              <div>
                                <div className='text-sm text-red-500 font-medium'>
                                  {errors}
                                </div>
                                <div id='notifyside' className='grid grid-cols-12 max-h-[450px] overflow-x-hidden'>
                                  {
                                    isLoading ?
                                      <div className='flex justify-center items-center col-span-12 h-[400px]'>
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
                                          employeeList.length === 0 ?
                                            <div className='col-span-12 h-[400px] justify-center flex items-center'>
                                              <img src={nodata} className='w-28' alt="No data" />
                                            </div>
                                            :
                                            <>
                                              {
                                                employeeList.map((items, index) => {
                                                  return (
                                                    <label
                                                      key={index}
                                                      className={`col-span-6 flex items-center p-4 m-3 rounded-lg ${isSelected(items.userId) ? 'bg-gray-200' : 'bg-gray-100'}`}>
                                                      <div>
                                                        <input
                                                          type="checkbox"
                                                          checked={isSelected(items.userId)}
                                                          onChange={() => handleSelectRow(items.userId)}
                                                        />
                                                      </div>
                                                      <div className='ms-4 flex items-center'>
                                                        <img src={items.profilePic ? IMG_URL + items.profilePic : noImage} className='w-10 h-10 rounded-full object-cover' crossOrigin='anonymous' alt="" />
                                                        <div className='ms-2'>
                                                          <p className='text-sm'>{items.firstName || ""} {items.lastName || ""}</p>
                                                          <p className='text-sm'>{items.employeeJobTitle || ""}</p>
                                                        </div>
                                                      </div>
                                                    </label>
                                                  )
                                                })
                                              }
                                              <div className="col-span-12 flex justify-center mt-8">
                                                <InfiniteScroll
                                                  dataLength={employeeList.length || 0}
                                                  next={viewMores}
                                                  hasMore={hasMoreData}
                                                  loader={noDatas ? (
                                                    <ThreeDots
                                                      width={40}
                                                      height={10}
                                                      color="#000"
                                                      ariaLabel="circles-loading"
                                                      wrapperStyle={{}
                                                      }
                                                      visible={true}
                                                      wrapperClass=""
                                                    />
                                                  ) : (
                                                    ""
                                                  )}
                                                  scrollableTarget="notifyside"
                                                />
                                              </div>
                                            </>
                                        }
                                      </>
                                  }

                                </div>
                              </div>
                            </div>
                            <div className='flex justify-between items-center'>
                              <p className='bg-[#F4F5FA] h-[42px] w-[130px] text-sm flex justify-center items-center rounded-lg cursor-pointer' onClick={() => setIsStap(0)}>Back</p>
                              <button type='submit' className='bg-[#00987C] h-[42px] w-[130px] text-sm rounded-lg text-white'>Next</button>
                            </div>
                          </form>
                          : isStep == 2 ?
                            <form onSubmit={handleStep3}>
                              <div className='h-[570px]'>
                                <h1 className='text-2xl font-medium my-5'>Services Required</h1>
                                <div className='mt-3 mb-6'>
                                  <p className='fontNew text-sm font-medium mt-3'>Request Type</p>
                                  <FormSelect id="category" name="fuel_type" value={selectRequestType} onChange={(e) => setSelectRequestType(e.target.value)} className="mt-3 outline-[#00987C] select-arrow-hidden text-sm rounded-md font-medium w-full h-12 outline-0 border-[1px] border-slate-300">
                                    <option >Select</option>
                                    <option value="fullmedical">FULL MEDICAL</option>
                                    <option value="assesment">ASSESSMENT</option>
                                  </FormSelect>
                                </div>
                                <div className="flex justify-center w-full mt-2 border-t border-slate-200/60 dark:border-darkmode-400">
                                  <div className="px-5 -mt-3 bg-white dark:bg-darkmode-600 text-slate-500">
                                    or
                                  </div>
                                </div>
                                <div>
                                  <div className='grid grid-cols-12 max-h-[338px] overflow-x-hidden'>
                                    {
                                      servicesData.map((items, index) => {
                                        const isSelected = isUserSelected(items.serviceId);
                                        return (
                                          <label
                                            key={index}
                                            className={`col-span-6 m-2 rounded-xl h-28 flex items-start justify-start cursor-pointer p-4  ${isSelected ? 'bg-[#00987C] text-white' : 'bg-[#F6F6F6] text-black'}`}>
                                            <div className='mt-1'>
                                              <input type="checkbox"
                                                className='purchs-radio'
                                                checked={isSelected}
                                                onChange={() => { handleUserChange(items.serviceId, items) }} />
                                            </div>
                                            <div className='ms-4'>
                                              <p className='text-sm'>{items.serviceName}</p>
                                              <p className='text-sm mt-2'>{items.servicePrice}/per person</p>
                                            </div>
                                          </label>
                                        )
                                      })
                                    }
                                  </div>
                                </div>
                                <div className='text-sm text-red-500 font-medium'>
                                  {errors}
                                </div>
                              </div>
                              <div className='flex justify-between items-center'>
                                <p className='bg-[#F4F5FA] h-[42px] w-[130px] text-sm flex justify-center items-center rounded-lg cursor-pointer' onClick={() => setIsStap(1)}>Back</p>
                                <button type='submit' className='bg-[#00987C] h-[42px] w-[130px] text-sm rounded-lg text-white'>Next</button>
                              </div>
                            </form>
                            : isStep == 3 ?
                              <form onSubmit={handleStep4}>
                                <div className='h-[570px]'>
                                  <h1 className='text-2xl font-medium my-5'>Additional Requests and Preferences</h1>
                                  <div>
                                    <p className='fontNew text-sm font-medium mt-3'>Please Specify</p>
                                    <div className='mt-3 mb-6'>
                                      <div className='rounded-md my-3'>
                                        <textarea required value={specifyText} onChange={(e) => setSpecifyText(e.target.value)} rows={7} placeholder='Enter' className='w-full border-[1px] py-1 px-4 border-slate-300 outline-[#00987C] py-3' id=""></textarea>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className='flex justify-between items-center'>
                                  <p className='bg-[#F4F5FA] h-[42px] w-[130px] text-sm rounded-lg flex justify-center items-center cursor-pointer' onClick={() => setIsStap(2)}>Back</p>
                                  <button type='submit' className='bg-[#00987C] h-[42px] w-[130px] text-sm rounded-lg text-white'>Next</button>
                                </div>
                              </form>
                              : isStep == 4 ?
                                <div>
                                  <div className='h-[570px] '>
                                    <h1 className='text-2xl font-medium my-5'>Review and submit request</h1>
                                    <div>
                                      <div className='my-6'>
                                        <p className='text-gray-500 mt-3'>Site:</p>
                                        <p className='font-medium'>{`${addressName.aptAddress}, ${addressName.streetAddress}, ${addressName.city}, ${addressName.state}-${addressName.zipCode}`}</p>
                                      </div>
                                      <div className='my-6 '>
                                        <p className='text-gray-500 mt-3'>Service Required:</p>
                                        <div className='max-h-[130px] overflow-auto'>
                                          {
                                            serviceName.map((item, index) => {
                                              return (
                                                <p key={index} className='font-medium'>{item.serviceName}</p>
                                              )
                                            })
                                          }
                                        </div>
                                      </div>
                                      <div className='flex justify-between my-6'>
                                        <div>
                                          <p className='text-gray-500 mt-3'>Visit Date:</p>
                                          <p className='font-medium'>{moment(formData.requestDate).format("DD-MM-YYYY") || ""}</p>
                                        </div>
                                        <div>
                                          <p className='text-gray-500 mt-3'>Visit Time:</p>
                                          <p className='font-medium'>{moment(formData.startTime).format("HH:mm:ss") || ""} - {moment(formData.endDate).format("HH:mm:ss") || ""}</p>
                                        </div>
                                        <div>
                                          <p className='text-gray-500 mt-3'>No. of {newName}:</p>
                                          <p className='font-medium'>{selectedRows.length || ""}</p>
                                        </div>
                                      </div>
                                      <div className='my-6'>
                                        <p className='text-gray-500 mt-3'>Additional requests/preferences</p>
                                        <p className='font-medium'>{specifyText}</p>
                                      </div>
                                      <div className='flex justify-between my-6'>
                                        <div>
                                          <p className='text-gray-500 mt-3'>Estimated Cost:</p>
                                          <p className='font-medium'>R{totalCost.toFixed(2) || "0"}</p>
                                        </div>
                                        <div>
                                          <p className='text-gray-500 mt-3'>Service Fee (10%):</p>
                                          <p className='font-medium'>R{(totalCost * 0.1).toFixed(2) || "0"}</p>
                                        </div>
                                        <div>
                                          <p className='text-gray-500 mt-3'>Total Estimated Cost:</p>
                                          <p className='font-medium'>R{totalCostWithFee.toFixed(2) || "0"}</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className='flex justify-between'>
                                    <button className='bg-[#F4F5FA] h-[42px] w-[130px] text-sm rounded-lg flex justify-center items-center cursor-pointer' onClick={() => setIsStap(3)}>Back</button>
                                    <button className='bg-[#00987C] h-[42px] w-[130px] text-sm rounded-lg text-white' disabled={isLoading} onClick={handleSubmit}>
                                      {
                                        isLoading ?
                                          <div className='flex justify-center'>
                                            <Circles
                                              height="22"
                                              width="22"
                                              color="#fff"
                                              ariaLabel="circles-loading"
                                              wrapperStyle={{}}
                                              wrapperClass=""
                                              visible={true}
                                            />
                                          </div>
                                          :
                                          "Submit"
                                      }
                                    </button>
                                  </div>
                                </div>
                                :
                                <div>
                                  <div className='h-[570px]'>
                                    <h1 className='text-2xl font-semibold my-5'>Visit request successfully submitted</h1>
                                    <div>
                                      <h1 className='text-base font-semibold'>Next steps</h1>
                                      <ul>
                                        <li className='py-3 text-gray-500'>You will receive an email confrmation of the successful submission of your visit request at t.botha@hitachi.com</li>
                                        <li className='py-3 text-gray-500'>You will receive an email notification when your visit request has been confirmed. This can take up to 2 business days. </li>
                                        <li className='py-3 text-gray-500'>All your visit requests can be found in your dashboard.</li>
                                        <li className='py-3 text-gray-500'>You will fnd a pre-event checklist in Visit Requests Management once the event has been confrmed.</li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div className='flex justify-start'>
                                    <button className='bg-[#F4F5FA] h-[42px] w-[130px] text-sm rounded-lg' onClick={handleClose}>Close</button>
                                  </div>
                                </div>
                    }
                  </div>
                </div>
              </div>
            </div>

            <div className='sm:hidden block sm:p-8 p-3'>
              <div>
                {
                  isStep == 4 ? ""
                    :
                    <div className='flex justify-center items-center mb-3'>
                      <p className={`flex justify-center items-center w-6 h-6 rounded-full ${0 <= isStep ? "bg-[#EA5F5F] text-white" : "bg-[#EEEFEF] text-gray-500"}`}>1</p>
                      <span className={`border-b-2 w-[60px] ${1 <= isStep ? "border-[#EA5F5F]" : "border-[#EAEDEF]"}`}></span>
                      <p className={`flex justify-center items-center w-6 h-6 rounded-full ${1 <= isStep ? "bg-[#EA5F5F] text-white" : "bg-[#EEEFEF] text-gray-500"}`}>2</p>
                      <span className={`border-b-2 w-[60px] ${2 <= isStep ? "border-[#EA5F5F]" : "border-[#EAEDEF]"}`}></span>
                      <p className={`flex justify-center items-center w-6 h-6 rounded-full ${2 <= isStep ? "bg-[#EA5F5F] text-white" : "bg-[#EEEFEF] text-gray-500"}`}>3</p>
                      <span className={`border-b-2 w-[60px] ${3 <= isStep ? "border-[#EA5F5F]" : "border-[#EAEDEF]"}`}></span>
                      <p className={`flex justify-center items-center w-6 h-6 rounded-full ${3 <= isStep ? "bg-[#EA5F5F] text-white" : "bg-[#EEEFEF] text-gray-500"}`}>4</p>
                    </div>
                }
              </div>
              {
                isStep == 0 ?
                  <form>
                    <div className='grid grid-cols-12'>
                      <div className="col-span-12">
                        <h1 className='text-lg font-medium'>Date, Sites & Attendees</h1>
                      </div>
                      <div className='col-span-12 mx-2 my-3'>
                        <p className='text-sm font-medium mb-3'>Choose Site</p>
                        <FormSelect id="category" name="fuel_type" value={selectStatus} onChange={(e) => setSelectStatus(e.target.value)} className="outline-[#00987C] select-arrow-hidden text-sm rounded-md font-medium w-full h-12 outline-0 border-[1px] border-slate-300">
                          <option >Select</option>
                          <option value={1}>Pending</option>
                          <option value={2}>Confirmed</option>
                          <option value={3}>In-Progress</option>
                          <option value={4}>Completed</option>
                          <option value={5}>Cancelled</option>
                        </FormSelect>
                      </div>
                      <div className='col-span-12 mx-2 my-3'>
                        <p className='text-sm font-medium mb-3'>Date</p>
                        <input
                          type='date'
                          // required
                          className='border-2 px-4 py-3 rounded-md w-full outline-[#00987C]'
                          placeholder='Password'
                          name='password'
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                      <div className='col-span-12 mx-2 my-3'>
                        <p className='text-sm font-medium mb-3'>Start Time</p>
                        <input type="time" className='border-2 px-4 py-3 rounded-md w-full outline-[#00987C]' placeholder='Enter' />
                      </div>
                      <div className='col-span-12 mx-2 my-3'>
                        <p className='text-sm font-medium mb-3'>End Time</p>
                        <input type="time" className='border-2 px-4 py-3 rounded-md w-full outline-[#00987C]' placeholder='Enter' />
                      </div>
                      <div className='col-span-12 mx-2 my-3'>
                        <p className='text-sm font-medium mb-3'>Number of {newName} Attending</p>
                        <input type="text" className='border-2 px-4 py-3 rounded-md w-full outline-[#00987C]' placeholder='Enter' />
                      </div>
                    </div>
                    <div className='flex justify-end items-center mt-6'>
                      <button className='bg-[#00987C] py-3 px-10 text-sm rounded-lg text-white' onClick={() => setIsStap(1)}>Next</button>
                    </div>
                  </form>
                  : isStep == 1 ?
                    <div>
                      <div>
                        <h1 className='text-lg font-medium'>Services Required</h1>
                        <div>
                          <div className='mt-3 mb-6'>
                            <p className='fontNew text-sm font-medium mt-3'>Use Template request</p>
                            <FormSelect id="category" name="fuel_type" value={selectStatus} onChange={(e) => setSelectStatus(e.target.value)} className="mt-3 outline-[#00987C] select-arrow-hidden text-sm rounded-md font-medium w-full h-12 outline-0 border-[1px] border-slate-300">
                              <option >Select</option>
                              <option value={1}>Pending</option>
                              <option value={2}>Confirmed</option>
                              <option value={3}>In-Progress</option>
                              <option value={4}>Completed</option>
                              <option value={5}>Cancelled</option>
                            </FormSelect>
                          </div>
                        </div>
                        <div className='text-center'>
                          or
                        </div>
                        <div>
                          <div className='grid grid-cols-12 h-[330px] overflow-x-hidden'>
                            {
                              servicesData.map((items, index) => {
                                const isSelected = isUserSelected(items.serviceId);
                                return (
                                  <label
                                    key={index}
                                    className={`col-span-12 m-2 rounded-xl flex items-start justify-start cursor-pointer p-4  ${isSelected ? 'bg-[#00987C] text-white' : 'bg-[#F6F6F6] text-black'}`}>
                                    <div className='mt-1'>
                                      <input type="checkbox"
                                        className='purchs-radio'
                                        checked={isSelected}
                                        onChange={() => { handleUserChange(items.serviceId) }} />
                                    </div>
                                    <div className='ms-4'>
                                      <p className='text-sm'>{items.serviceName}</p>
                                      <p className='text-sm mt-2'>{items.servicePrice}</p>
                                    </div>
                                  </label>
                                )
                              })
                            }
                          </div>
                        </div>
                      </div>
                      <div className='flex justify-between items-center mt-[11px]'>
                        <button className='bg-[#F4F5FA] py-3 px-10 text-sm rounded-lg' onClick={() => setIsStap(0)}>Back</button>
                        <button className='bg-[#00987C] py-3 px-10 text-sm rounded-lg text-white' onClick={() => setIsStap(2)}>Next</button>
                      </div>
                    </div>
                    : isStep == 2 ?
                      <div>
                        <div className=''>
                          <h1 className='text-lg font-medium'>Additional Requests and Preferences</h1>
                          <div>
                            <div>
                              <p className='fontNew text-sm font-medium mt-3'>Please Specify</p>
                              <div className='mt-3 mb-6'>
                                <textarea name="" rows={10} placeholder='Enter' className='border-2 px-4 py-3 rounded-md w-full outline-[#00987C]' id=""></textarea>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='flex justify-between items-center mt-[163px]'>
                          <button className='bg-[#F4F5FA] py-3 px-10 text-sm rounded-lg' onClick={() => setIsStap(1)}>Back</button>
                          <button className='bg-[#00987C] py-3 px-10 text-sm rounded-lg text-white' onClick={() => setIsStap(3)}>Next</button>
                        </div>
                      </div>
                      : isStep == 3 ?
                        <div className=''>
                          <div className='grid grid-cols-12'>
                            <h1 className='col-span-12 text-lg font-medium '>Review and submit request</h1>
                            <div className='col-span-12 my-3'>
                              <p className='text-gray-500 pb-1'>Site:</p>
                              <p className='font-medium'>7620 Crist Estate, Prosaccomouth, Vermont.</p>
                            </div>
                            <div className='col-span-12 my-3'>
                              <p className='text-gray-500 pb-1'>Service Required:</p>
                              <p className='font-medium'>Health Screening, Mental Health Clinic</p>
                            </div>
                            <div className='col-span-12 my-3'>
                              <p className='text-gray-500 pb-1'>Visit Date:</p>
                              <p className='font-medium'>06 Mar, 2024</p>
                            </div>
                            <div className='col-span-12 my-3'>
                              <p className='text-gray-500 pb-1'>Visit Time:</p>
                              <p className='font-medium'>10:00 AM - 01:00 PM</p>
                            </div>
                            <div className='col-span-12 my-3'>
                              <p className='text-gray-500 pb-1'>No. of {newName}:</p>
                              <p className='font-medium'>206</p>
                            </div>
                            <div className='col-span-12 my-3'>
                              <p className='text-gray-500 pb-1'>Estimated Cost:</p>
                              <p className='font-medium'>R2000.00</p>
                            </div>
                            <div className='col-span-12 my-3'>
                              <p className='text-gray-500 pb-1'>Additional requests/preferences</p>
                              <p className='font-medium'>Please ensure the healthcare workers speak English and isiZulu. Thanks.</p>
                            </div>
                            <div className='col-span-12 flex justify-between'>
                              <button className='bg-[#F4F5FA] py-3 px-10 text-sm rounded-lg' onClick={() => setIsStap(2)}>Back</button>
                              <button className='bg-[#00987C] py-3 px-10 text-sm rounded-lg text-white' >
                                {
                                  isLoading ?
                                    <div className='flex justify-center'>
                                      <Circles
                                        height="25"
                                        width="25"
                                        color="#fff"
                                        ariaLabel="circles-loading"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                        visible={true}
                                      />
                                    </div>
                                    :
                                    "Submit"
                                }
                              </button>
                            </div>
                          </div>
                        </div>
                        :
                        <div>
                          <div className='flex justify-center'>
                            <Lottie options={defaultOptions}
                              height={150}
                              width={150}
                            />
                          </div>
                          <h1 className='text-lg font-semibold mb-5'>Visit request successfully submitted</h1>
                          <div>
                            <h1 className='text-base font-semibold'>Next steps</h1>
                            <ul>
                              <li className='py-2 text-sm text-gray-500'>You will receive an email confrmation of the successful submission of your visit request at t.botha@hitachi.com</li>
                              <li className='py-2 text-sm text-gray-500'>You will receive an email notification when your visit request has been confirmed. This can take up to 2 business days. </li>
                              <li className='py-2 text-sm text-gray-500'>All your visit requests can be found in your dashboard.</li>
                              <li className='py-2 text-sm text-gray-500'>You will fnd a pre-event checklist in Visit Requests Management once the event has been confrmed.</li>
                            </ul>
                          </div>
                          <div className='flex justify-start mt-3'>
                            <button className='bg-[#F4F5FA] py-3 px-10 text-sm rounded-lg' onClick={() => setModalOpens(false)}>Close</button>
                          </div>
                        </div>
              }

            </div>
          </Dialog.Description>
        </Dialog.Panel>
      </Dialog>
    </>
  )
}

export default Requests