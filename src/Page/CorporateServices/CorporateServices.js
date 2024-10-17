import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import search from "../../Assets/Image/corporate/Search.png"
import noImage from "../../Assets/Image/admin/noImage.png"
import men1 from "../../Assets/Image/admin/men1.png"
import men2 from "../../Assets/Image/admin/men2.png"
import men3 from "../../Assets/Image/admin/men3.png"
import men4 from "../../Assets/Image/admin/men4.png"
import men6 from "../../Assets/Image/admin/men6.png"
import view from "../../Assets/Image/corporate/view.png"
import deletes from "../../Assets/Image/corporate/delete.png"
import nodata from "../../Assets/Image/corporate/nodata.png"
import FormSelect from '../../Base-Component/FormSelect/FormSelect'
import back from "../../Assets/Image/corporate/background2.png"
import Dialog from '../../Base-Component/Dialog/Dialog'
import add from "../../Assets/Image/corporate/add.png"
import toast from 'react-hot-toast'
import Cookies from 'js-cookie';
import { addHealthService, getHealthService, getHealthworkerList } from '../../Services/ApiServices'
import { Bars, Circles } from 'react-loader-spinner'


function CorporateServices() {

    const navigate = useNavigate()
    const scrollRef = useRef(null);

    const [isDragging, setIsDragging] = useState(false);
    const [isModalOpens, setModalOpens] = useState(false)
    const [loader, setLoader] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const [formValue, setFormValue] = useState({})

    const [userData, setUserData] = useState([])

    useEffect(() => {
        handleCustomerList()
    }, [])

    const handleCustomerList = () => {
        setLoader(true)
        getHealthService()
            .then((res) => {
                if (res.status === 200) {
                    const data = res.data.info;
                    setUserData(data)
                }
                setLoader(false)
            })
            .catch((err) => {
                console.log("err >>", err);
                if (err.response.status === 401) {
                    localStorage.removeItem("welo_admin_token")
                    navigate("/welo_admin/login")
                } else {
                    toast.error(err.response.data.message)
                }
                setLoader(false)
            })
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

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)
        let obj = {
            serviceName: formValue.serviceName,
            servicePrice: formValue.servicePrice
        }
        addHealthService(obj)
            .then((res) => {
                if (res.status === 200) {
                    setModalOpens(false)
                    setFormValue({})
                    handleCustomerList()
                }
                setIsLoading(false)
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    localStorage.removeItem("welo_admin_token")
                    navigate("/welo_admin/login")
                } else {
                    toast.error(err.response.data.message)
                }
                setIsLoading(false)
            })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormValue({ ...formValue, [name]: value })
    }

    return (
        <>
            <div className='grid grid-cols-12 md:m-4 m-1'>
                <div className='col-span-12 fontNew cursor-pointer'>
                    <div className='flex flex-wrap-reverse sm:justify-between justify-end mb-4 items-start'>
                        <div className='text-lg font-medium'>
                            Services
                        </div>
                        <div>
                            <button onClick={() => setModalOpens(true)} className='bg-[#EA5F5F] text-white flex items-center py-2 px-3 sm:mb-0 mb-3 rounded-lg sm:base sm' >
                                <img src={add} className='w-6 mr-2' alt="" />Add Service
                            </button>
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
                                userData == "" ?
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
                                                            <th className='py-4 px-8 text-base font-medium whitespace-nowrap text-start first:rounded-l-lg last:rounded-r-lg'>ID</th>
                                                            <th className='py-4 px-2 text-base font-medium whitespace-nowrap text-start first:rounded-l-lg last:rounded-r-lg'>Service Name</th>
                                                            <th className='py-4 px-2 text-base font-medium whitespace-nowrap text-start first:rounded-l-lg last:rounded-r-lg'>Service Price (per person)</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            userData.map((item, index) => (
                                                                <tr
                                                                    key={index}
                                                                    className="font-medium bg-white"
                                                                >
                                                                    <td className='text-start px-8 py-3 first:rounded-l-lg last:rounded-r-lg '>
                                                                        <div className='lg:whitespace-normal whitespace-nowrap lg:break-all break-normal'>
                                                                            <p className='text-base'>{item.serviceId || ""}</p>
                                                                        </div>
                                                                    </td>
                                                                    <td className='text-start lg:px-2 px-4 py-3 first:rounded-l-lg last:rounded-r-lg '>
                                                                        <div className='lg:whitespace-normal whitespace-nowrap lg:break-all break-normal'>
                                                                            <p className='text-base'>{item.serviceName || ""}</p>
                                                                        </div>
                                                                    </td>
                                                                    <td className='text-start lg:px-2 px-4 py-3 first:rounded-l-lg last:rounded-r-lg '>
                                                                        <div className='lg:whitespace-normal whitespace-nowrap lg:break-all break-normal'>
                                                                            <p className='text-base'>{item.servicePrice || ""}</p>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                </table>
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
                        <div className='md:px-8 md:py-4 p-4 sm:w-auto w-[330px] md:h-auto h-[500px] overflow-auto fontNew'>
                            <h1 className='text-lg font-semibold mb-2'>Add Service</h1>
                            <form onSubmit={handleSubmit}>
                                <div className='grid grid-cols-12'>
                                    <div className='col-span-12 md:mx-2 mx-0 my-3'>
                                        <p className='text-sm font-medium mb-3'>Service Name</p>
                                        <input required type="text" name='serviceName' className='border-2 px-4 py-3 rounded-md w-full outline-[#00987C]' onChange={(e) => handleChange(e)} placeholder='Enter' />
                                    </div>
                                    <div className='col-span-12 md:mx-2 mx-0 my-3'>
                                        <p className='text-sm font-medium mb-3'>Service Price (per person)</p>
                                        <input required type="text" name='servicePrice' className='border-2 px-4 py-3 rounded-md w-full outline-[#00987C]' onChange={(e) => handleChange(e)} placeholder='Enter' />
                                    </div>
                                </div>
                                <div className='mt-6 flex justify-end'>
                                    <button type='button' onClick={() => setModalOpens(false)} className='bg-[#EF5F5F] w-[130px] h-[42px] text-white rounded-lg mr-5'>Close</button>
                                    <button type='submit' className='bg-[#00987C] text-white w-[130px] h-[42px] rounded-lg'>
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
                                            "Save"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </Dialog.Description>
                </Dialog.Panel>
            </Dialog>
        </>
    )
}

export default CorporateServices