import React, { useEffect, useState } from 'react'
import icon1 from "../../Assets/Image/admin/1.png"
import icon2 from "../../Assets/Image/admin/2.png"
import icon3 from "../../Assets/Image/admin/3.png"
import icon4 from "../../Assets/Image/admin/4.png"
import FormSelect from '../../Base-Component/FormSelect/FormSelect'
import nodata from "../../Assets/Image/corporate/nodata.png"
import { getDashboard, listRequests } from '../../Services/ApiServices'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Bars } from 'react-loader-spinner'
import moment from 'moment'
import { newName } from '../../Services/Api'

function Dashboard() {

  const navigate = useNavigate()

  const [loader, setLoader] = useState(false)
  const [selectStatus, setSelectStatus] = useState("PENDING")
  const [pageNo, setPageNo] = useState(1)
  const [totalPage, setTotalPage] = useState("")
  const [requestData, setRequestData] = useState([])

  const [countData, setCountData] = useState({})

  const handleDashboard = () => {
    getDashboard()
      .then((res) => {
        if (res.status == 200) {
          console.log("res >>", res)
          if (res.status == 200) {
            const data = res.data.info;
            setCountData(data)
          }
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
    handleDashboard()
  }, [])

  useEffect(() => {
    handleListRequest()
  }, [pageNo, selectStatus])


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

  const handleRequest = (data) => {
    navigate("/welo_admin/requests/requests_details", { state: { Data: data } })
  }

  const handleSelection = (e) => {
    setSelectStatus(e.target.value)
    setPageNo(1)
  }

  return (
    <>
      <div className='grid grid-cols-12 gap-4 fontNew md:m-4 m-1'>
        <div className='col-span-12'>

          <div>
            <div className='grid grid-cols-12 gap-4'>
              <div className='2xl:col-span-3 xl:col-span-4 lg:col-span-6 sm:col-span-6 col-span-12 bg-white p-5 rounded-2xl fontNew hover:drop-shadow-lg duration-300 cursor-pointer'>
                <img src={icon1} className='w-12 py-2' alt="" />
                <p className='text-4xl pb-3 font-semibold py-2'>{countData.noOfCompanies || "0"}</p>
                <p className='text-base'>Total Company</p>
              </div>
              <div className='2xl:col-span-3 xl:col-span-4 lg:col-span-6 sm:col-span-6 col-span-12 bg-white p-5 rounded-2xl fontNew hover:drop-shadow-lg duration-300 cursor-pointer'>
                <img src={icon2} className='w-12 py-2' alt="" />
                <p className='text-4xl pb-3 font-semibold py-2'>{countData.totalEarning || "0"}</p>
                <p className='text-base'>Total Earnings</p>
              </div>
              <div className='2xl:col-span-3 xl:col-span-4 lg:col-span-6 sm:col-span-6 col-span-12 bg-white p-5 rounded-2xl fontNew hover:drop-shadow-lg duration-300 cursor-pointer'>
                <img src={icon3} className='w-12 py-2' alt="" />
                <p className='text-4xl pb-3 font-semibold py-2'>{countData.noOfHealthworker || "0"}</p>
                <p className='text-base'>Total Health worker</p>
              </div>
              <div className='2xl:col-span-3 xl:col-span-4 lg:col-span-6 sm:col-span-6 col-span-12 bg-white p-5 rounded-2xl fontNew hover:drop-shadow-lg duration-300 cursor-pointer'>
                <img src={icon4} className='w-12 py-2' alt="" />
                <p className='text-4xl pb-3 font-semibold py-2'>{countData.noOfRequest || "0"}</p>
                <p className='text-base'>Total Appointments</p>
              </div>
            </div>
          </div>

          <div className='mt-5'>
            <div className='flex justify-between items-center my-2'>
              <h1 className='text-xl font-medium m-2'>Visit Requests</h1>
              <div>
                <FormSelect id="category" name="fuel_type" value={selectStatus} onChange={(e) => handleSelection(e)} className="sm:ms-3 sm:mb-0 mb-3 ps-5 pl-0 pb-0 pt-0 ms-0 select-arrow-hidden text-sm rounded-[8px] font-medium xl:w-40 sm:w-36 w-full h-10 outline-none">
                  <option value="PENDING">Pending</option>
                  <option value="CONFIRMED">Confirmed</option>
                  <option value="INPROGRESS">In-Progress</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="CANCELLED">Cancelled</option>
                </FormSelect>
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
    </>
  )
}

export default Dashboard