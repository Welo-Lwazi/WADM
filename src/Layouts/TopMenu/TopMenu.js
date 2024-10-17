import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import notification from "../../Assets/Image/corporate/notification.png"
import side from "../../Assets/Image/corporate/side.png"
import Popover from "../../Base-Component/Popover/Popover";
import Menu from "../../Base-Component/Menu/Menu";
import Dialog from "../../Base-Component/Dialog/Dialog";
import axios from "axios";
import { ADMIN_LOGOUT_API, IMG_URL } from "../../Services/Api";
import toast from "react-hot-toast";
import { Circles, ThreeDots } from "react-loader-spinner";
import noImage from "../../Assets/Image/corporate/user.png";
import { getNotificationList } from "../../Services/ApiServices";
import { Socket } from "../../Assets/Socket/Socket";
import InfiniteScroll from "react-infinite-scroll-component";

function TopMenu(props) {

    const location = useLocation()
    const navigate = useNavigate()
    
    const [isLogOut, setIsLogOut] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [hasMoreData, setHasMoreData] = useState(true);
    const [noData, setNodata] = useState(false);

    const [profilePic, setProfilePic] = useState("")
    const [pageNo, setPageNo] = useState(1)
    const [totalPage, setTotalPage] = useState("")
    const [newCount, setNewCount] = useState("")

    const [notificationData, setNotificationData] = useState([])

    const Token = localStorage.getItem("welo_admin_token")
    axios.defaults.headers.common["Authorization"] = "Bearer " + Token;

    const data = JSON.parse(localStorage.getItem("ADMIN_INFO"))

    useEffect(() => {
        Socket.on("connect", () => {
            console.log(Socket.connected, Socket.id);
        });

        if (Socket.connected != true) {
            Socket.emit("socket_register", {
                userId: data.userId,
            });
        }

        Socket.on("unread_notification_count", (data) => notificationCount(data))
    }, [Socket])

    const notificationCount = (data) => {
        console.log("unread >>", data)
        setNewCount(data.count)
    }

    const handleLogout = () => {
        setIsLoading(true)
        axios.post(ADMIN_LOGOUT_API)
            .then((res) => {
                if (res.status == 200) {
                    localStorage.removeItem("welo_admin_token")
                    navigate("/welo_admin");
                }
                setIsLoading(false)
            })
            .catch((err) => {
                if (err.response.status == 401) {
                    localStorage.removeItem("welo_admin_token")
                    navigate("/welo_admin")
                } else {
                    toast.error(err.response.data.message)
                }
                setIsLoading(false)
            })
    };

    const handleNotification = (page) => {
        setNodata(true)
        let obj = { pageNo: page }
        getNotificationList(obj)
            .then((res) => {
                if (res.status == 200) {
                    const data = res.data.info;
                    if (page != 1) {
                        setNotificationData([...notificationData, ...data])
                    } else {
                        setNotificationData(data)
                    }
                }
                setPageNo(page)
                setTotalPage(res.data.totalPage)
                setIsLoading(false)
                setNodata(false)
            })
            .catch((err) => {
                if (err.response.status == 401) {
                    localStorage.removeItem("welo_admin_token")
                    navigate("/welo_admin")
                } else {
                    toast.error(err.response.data.message)
                }
                setIsLoading(false)
            })
    }

    useEffect(() => {
        if (data) {
            setProfilePic(data.profilePic)
        } else (
            handleLogout()
        )
    }, [data])

    const viewMores = () => {
        if (pageNo != totalPage) {
            handleNotification(pageNo + 1)
            setHasMoreData(true);
        } else {
            setHasMoreData(false);
        }
    }

    return (
        <>
            <header className="sticky top-0 z-9 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
                <div className="flex flex-grow items-center justify-between lg:justify-between py-4 px-4 shadow-2 md:px-8">
                    <div className="flex items-center justify-between gap-2 sm:gap-4">
                        <button
                            aria-controls="sidebar"
                            onClick={(e) => {
                                e.stopPropagation();
                                props.setSidebarOpen(!props.sidebarOpen);
                            }}
                            className="z-99 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark 2xl:hidden xl:hidden lg:hidden"
                        >
                            <span className="relative block h-5.5 w-5.5 cursor-pointer">
                                <span className="du-block absolute right-0 h-full w-full">
                                    <span
                                        className={`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && "!w-full delay-300"
                                            }`}
                                    ></span>
                                    <span
                                        className={`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && "delay-400 !w-full"
                                            }`}
                                    ></span>
                                    <span
                                        className={`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && "!w-full delay-500"
                                            }`}
                                    ></span>
                                </span>
                                <span className="absolute right-0 h-full w-full rotate-45">
                                    <span
                                        className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && "!h-0 !delay-[0]"
                                            }`}
                                    ></span>
                                    <span
                                        className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && "!h-0 !delay-200"
                                            }`}
                                    ></span>
                                </span>
                            </span>
                        </button>
                        <div className="sm:flex items-center fontNew hidden">
                            <p className="xl:text-xl lg:text-lg md:text-base font-semibold capitalize"> {location.pathname.split("/")[2]
                                .split('_')
                                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                .join(' ')}</p>
                            {
                                location.pathname.split("/")[3] ?
                                    <img src={side} className="w-2 mx-3 opacity-25" alt="" />
                                    : ""
                            }
                            {
                                location.pathname.split("/")[3] ?
                                    <p className="text-gray-400 capitalize"> {location.pathname.split("/")[3]
                                        .split('_')
                                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                        .join(' ')}</p>
                                    : ""
                            }
                        </div>
                    </div>

                    <div className="flex items-center">
                        <Popover className="relative">
                            <Popover.Button className="outline-0">
                                <div className="flex relative">
                                    <img src={notification} onClick={() => { handleNotification(pageNo); setNewCount("") }} className="2xl:w-12 2xl:h-12 w-10 h-10 rounded-full object-cover ms-6" alt="" />
                                    {
                                        newCount && newCount > 0 ?
                                            <div className="w-4 h-4 rounded-full bg-[#EA5F5F] text-white flex items-center justify-center text-sm absolute left-13 xl:left-14">{newCount}</div>
                                            : ""
                                    }
                                </div>
                            </Popover.Button>
                            <Popover.Panel id="notifyside" className="lg:w-[450px] w-[280px] h-[500px] overflow-x-hidden px-6 mt-7">
                                <div className="cursor-pointer">
                                    {
                                        notificationData.slice(0, 2).map((items, index) => {
                                            const data = items.sender
                                            return (
                                                <div key={index} className="flex justify-start items-center fontNew py-2">
                                                    <img src={data && data.profilePic ? IMG_URL + data.profilePic : noImage} crossOrigin="anonymous" className="w-14 h-14 object-cover rounded-full" alt="" />
                                                    <div className="ps-3">
                                                        <p className="m-0 text-black font-medium">{items.notificationText || "-"}</p>
                                                        <p className="text-sm text-gray-500">{items.time}</p>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                    <div className="flex justify-center mt-8">
                                        <InfiniteScroll
                                            dataLength={notificationData.length || 0}
                                            next={viewMores}
                                            hasMore={hasMoreData}
                                            loader={noData ? (
                                                <ThreeDots
                                                    width={40}
                                                    height={10}
                                                    color="#000"
                                                    ariaLabel="circles-loading"
                                                    wrapperStyle={{}}
                                                    visible={true}
                                                    wrapperClass=""
                                                />
                                            ) : (
                                                ""
                                            )}
                                            scrollableTarget="notifyside"
                                        />
                                    </div>
                                </div>
                            </Popover.Panel>
                        </Popover>
                        <div>
                            <Menu>
                                <Menu.Button className="block">
                                    <img src={profilePic ? IMG_URL + profilePic : noImage} crossOrigin="anonymous" className="2xl:w-12 2xl:h-12 w-10 h-10 rounded-full object-cover ms-6" alt="" />
                                </Menu.Button>
                                <Menu.Items className="w-56 mt-px bg-white mt-6 fontNew">
                                    <Menu.Item
                                        className="hover:bg-[#EA5F5F] hover:text-white text-[#303438] flex justify-between items-center py-3"
                                        onClick={() => { setIsLogOut(true) }}
                                    >
                                        <div className="flex items-center">
                                            <p className="m-0 ms-3">Log out</p>
                                        </div>
                                    </Menu.Item>
                                </Menu.Items>
                            </Menu>
                        </div>
                    </div>
                </div>
            </header>

            <Dialog
                open={isLogOut}
                onClose={() => setIsLogOut(false)}
                size="2xl"
            >
                <Dialog.Panel>
                    <Dialog.Description className="rounded-none border-2 border-white">
                        <div className='flex justify-center text-center my-4 sm:px-16 px-4 fontNew'>
                            <div>
                                <h1 className='text-xl font-semibold text-black mt-6'>Log Out?</h1>
                                <p className='text-sm text-gray-500 my-3'>Are you certain you wish to proceed with <br /> logging out?</p>
                                <div className='mt-13 flex items-center mb-5'>
                                    <button className='bg-[#F4F5FA] h-[50px] sm:w-36 w-30 text-sm rounded-xl sm:mx-3 mx-2' onClick={() => setIsLogOut(false)}>Close</button>
                                    <button className='bg-[#EA5F5F] h-[50px] sm:w-36 w-30 text-sm rounded-xl sm:mx-3 mx-2 text-white' onClick={handleLogout}>
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
                                            "Yes, Log Out"
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Dialog.Description>
                </Dialog.Panel>
            </Dialog>
        </>
    );
}

export default TopMenu;
