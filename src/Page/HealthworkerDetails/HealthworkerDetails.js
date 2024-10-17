import React, { useEffect, useRef, useState } from 'react'
import back from "../../Assets/Image/corporate/back.png"
import { useLocation, useNavigate } from 'react-router-dom'
import background from "../../Assets/Image/corporate/background1.png"
import noImage from "../../Assets/Image/admin/noImage.png"
import men1 from "../../Assets/Image/admin/men1.png"
import deletes from "../../Assets/Image/admin/delete.png"
import message from "../../Assets/Image/corporate/message.png";
import call from "../../Assets/Image/corporate/call.png";
import Dialog from '../../Base-Component/Dialog/Dialog'
import backs from "../../Assets/Image/corporate/background2.png"
import pdfimg from "../../Assets/Image/admin/pdfupload1.png"
import edit from "../../Assets/Image/corporate/edit.png"
import { IMG_URL } from '../../Services/Api'
import { approveCustomer, rejectCustomer } from '../../Services/ApiServices'
import { Circles } from 'react-loader-spinner'
import Cookies from 'js-cookie';
import toast from 'react-hot-toast'

function HealthworkerDetails() {
    const navigate = useNavigate()
    const location = useLocation()

    const [selectStatus, setSelectStatus] = useState(1)

    const [isModalOpens, setModalOpens] = useState(false)
    const [isSuspend, setIsSuspend] = useState(false)
    const [isAccept, setIsAccept] = useState(false)
    const [isReject, setIsReject] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [reasonText, setReasonText] = useState("")
    const [userIds, setUserIds] = useState("")

    let usersData;
    try {
        const { Data } = location.state;
        usersData = Data
    } catch (error) {
        console.log("err")
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
                    navigate("/welo_admin/healthworkers")
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
                    navigate("/welo_admin/healthworkers")
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
        navigate("/welo_admin/messages", { state: { Data: usersData, Type: 2 } })
    }

    return (
        <div className='md:m-4 m-1 fontNew'>
            <div className='flex items-center cursor-pointer mb-4'>
                <img src={back} onClick={() => { navigate("/welo_admin/healthworkers") }} className='w-4' alt="" />
                <p onClick={() => { navigate("/welo_admin/healthworkers") }} className='text-base font-medium ms-3'>Go back</p>
            </div>

            <div className='grid grid-cols-12 gap-4 '>
                <div className='2xl:col-span-4 xl:col-span-5 lg:col-span-6 col-span-12 bg-white rounded-xl'>
                    <div className='text-white rounded-t-xl' >
                        <img src={background} className='w-full h-32' alt="" />
                        <div className='flex justify-between mx-10'>
                            <img src={usersData.profilePic ? IMG_URL + usersData.profilePic : noImage} crossOrigin='anonymous' className='object-cover w-[110px] h-[110px] -mt-12 rounded-full border-[3px] border-white' alt="" />
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
                            <h1 className='text-lg font-semibold'>{usersData.firstName || ""} {usersData.lastName || ""}</h1>
                            <h4 className='text-sm text-base py-2'>ID : {usersData.userId || ""}</h4>
                            <h4 className='text-sm text-gray-500'>{usersData.userRole}</h4>
                            <div className='font-medium py-2'>
                                {
                                    usersData.isOnline == "NO" ?
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
                </div>
                <div className='2xl:col-span-8 xl:col-span-7 lg:col-span-6 col-span-12 bg-white rounded-xl'>
                    <div className='md:px-8 px-4 py-4'>
                        <div className='flex flex-wrap-reverse justify-between border-b-2 border-dashed py-2'>
                            <div className='flex flex-wrap items-center my-2'>
                                <div>
                                    <p className='text-base font-semibold pb-1'>Healthworkers Details</p>
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
                            <div className='my-3 flex'>
                                {
                                    usersData.isApprove == "PENDING" ?
                                        <>
                                            <button onClick={() => { setIsReject(true); setUserIds(usersData.userId) }} className='bg-[#EA5F5F] text-white flex items-center justify-center text-sm sm:text-base items-center w-[150px] h-[38px] px-[12px] mr-3 rounded-[10px]'>
                                                Reject
                                            </button>
                                            <button onClick={() => { setIsAccept(true); setUserIds(usersData.userId) }} className='bg-[#139E84] text-white flex items-center justify-center text-sm sm:text-base items-center w-[150px] h-[38px] px-[12px] rounded-[10px]'>
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
                        <div className='grid grid-cols-12 gap-4 mt-4'>
                            <div className="col-span-12">
                                <h1 className='text-base font-medium'>Practice Council Registration Document</h1>
                            </div>
                            <div className="xl:col-span-6 col-span-12">
                                <div className='border-2 border-dashed md:p-5 p-3 lg:my-0 my-3'>
                                    <div className='flex items-center '>
                                        <img src={pdfimg} className='md:w-16 md:h-16 w-12 h-12 rounded-full' alt="" />
                                        <div className='ms-4'>
                                            <p className='font-medium md:text-base text-sm mb-2'>Practice Council Registration Document.jpg</p>
                                            <p className='font-medium md:text-base text-sm text-gray-400'>4MB</p>
                                        </div>
                                    </div>
                                    <div className='text-end'>
                                        <a target='_blank' download href={IMG_URL + usersData.registrationCertificate} className='bg-[#2336E41A] py-2 px-3 text-[#2336E4] text-sm rounded-lg'>
                                            Click here to download
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="xl:col-span-6 col-span-12">
                                <div className='border-2 border-dashed md:p-5 p-3 lg:my-0 my-3'>
                                    <div className='flex items-center '>
                                        <img src={pdfimg} className='md:w-16 md:h-16 w-12 h-12 rounded-full' alt="" />
                                        <div className='ms-4'>
                                            <p className=' md:text-base text-sm mb-2'>National Identify Document.jpg</p>
                                            <p className=' md:text-base text-sm text-gray-400'>4MB</p>
                                        </div>
                                    </div>
                                    <div className='text-end'>
                                        <a target='_blank' download href={IMG_URL + usersData.identityCertificate} className='bg-[#2336E41A] py-2 px-3 text-[#2336E4] text-sm rounded-lg'>
                                            Click here to download
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="xl:col-span-6 col-span-12">
                                <div className='border-2 border-dashed md:p-5 p-3 lg:my-0 my-3'>
                                    <div className='flex items-center '>
                                        <img src={pdfimg} className='md:w-16 md:h-16 w-12 h-12 rounded-full' alt="" />
                                        <div className='ms-4'>
                                            <p className='font-medium md:text-base text-sm mb-2'>Lifesaving Certificate.jpg</p>
                                            <p className='font-medium md:text-base text-sm text-gray-400'>4MB</p>
                                        </div>
                                    </div>
                                    <div className='text-end'>
                                        <a target='_blank' download href={IMG_URL + usersData.lifeSavingCertificate} className='bg-[#2336E41A] py-2 px-3 text-[#2336E4] text-sm rounded-lg'>
                                            Click here to download
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="xl:col-span-6 col-span-12">
                                <div className='border-2 border-dashed md:p-5 p-3 xl:my-0 my-3'>
                                    <div className='flex items-center '>
                                        <img src={pdfimg} className='md:w-16 md:h-16 w-12 h-12 rounded-full' alt="" />
                                        <div className='ms-4'>
                                            <p className='font-medium md:text-base text-sm mb-2'>Police Clearance Document.jpg</p>
                                            <p className='font-medium md:text-base text-sm text-gray-400'>4MB</p>
                                        </div>
                                    </div>
                                    <div className='text-end'>
                                        <a target='_blank' download href={IMG_URL + usersData.policeClearanceCertificate} className='bg-[#2336E41A] py-2 px-3 text-[#2336E4] text-sm rounded-lg'>
                                            Click here to download
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='grid grid-cols-12 gap-4 mt-5'>
                <h1 className='col-span-12 text-xl font-medium my-2'>Statistics</h1>
                <div className='2xl:col-span-3 xl:col-span-4 lg:col-span-6 sm:col-span-6 col-span-12 bg-white p-6 rounded-2xl fontNew hover:drop-shadow-lg duration-300 cursor-pointer'>
                    <p className='text-base pb-3'>Completed Appointments</p>
                    <p className='text-4xl font-semibold py-2'>38</p>
                </div>
                <div className='2xl:col-span-3 xl:col-span-4 lg:col-span-6 sm:col-span-6 col-span-12 bg-white p-6 rounded-2xl fontNew hover:drop-shadow-lg duration-300 cursor-pointer'>
                    <p className='text-base pb-3'>Rejected Appointments</p>
                    <p className='text-4xl font-semibold py-2'>3</p>
                </div>
                <div className='2xl:col-span-3 xl:col-span-4 lg:col-span-6 sm:col-span-6 col-span-12 bg-white p-6 rounded-2xl fontNew hover:drop-shadow-lg duration-300 cursor-pointer'>
                    <p className='text-base pb-3'>Earnings to date</p>
                    <p className='text-4xl font-semibold py-2'>R 12,000</p>
                </div>
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
                                <img src={usersData.profilePic ? IMG_URL + usersData.profilePic : noImage} crossOrigin='anonymous' className='object-cover absolute sm:w-24 sm:h-24 w-14 h-14 lg:-mt-36 md:-mt-30 sm:-mt-36 -mt-24 rounded-full border-2 ' alt="" />
                            </div>
                        </div>
                        <div className='flex justify-center text-center my-4 sm:px-16 px-5 fontNew'>
                            <div>
                                <h1 className='text-xl font-semibold text-black mt-6'>Delete Customer?</h1>
                                <p className='text-sm text-gray-500 my-3'>Are you sure want to delete from the Customer?</p>
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
        </div>
    )
}

export default HealthworkerDetails