import React, { useEffect, useRef, useState } from 'react'
import welorounds from "../../Assets/Image/Healthworker/weloround.png"
import send from "../../Assets/Image/Healthworker/sendbtn.png"
import search from "../../Assets/Image/corporate/Search.png"
import folder from "../../Assets/Image/admin/add-folders.png"
import { Socket } from '../../Assets/Socket/Socket'
import { getChatList, getChatMessageList, getChatUserList, sendMessages } from '../../Services/ApiServices'
import toast from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'
import { IMG_URL } from '../../Services/Api'
import moment from 'moment/moment'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Bars, ThreeDots } from 'react-loader-spinner'
import Dialog from '../../Base-Component/Dialog/Dialog'
import chatIcon from "../../Assets/Image/admin/chat.png"
import nodata from "../../Assets/Image/corporate/nodata.png"

function Message() {

    const scrollRef = useRef(null);
    const navigate = useNavigate()
    const location = useLocation()

    const userId = JSON.parse(localStorage.getItem("ADMIN_INFO"))

    const [loader, setLoader] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMoreData, setHasMoreData] = useState(true);
    const [noData, setNodata] = useState(false);
    const [isModalOpens, setModalOpens] = useState(false);
    const [isOffcanvasOpenSc, SetOffcanvasOpenSc] = useState(false);

    const [isFlag, setIsFlag] = useState(0)
    const [pageNo, setPageNo] = useState(1)
    const [currPage, setCurrPage] = useState(1)
    const [pageNos, setPageNos] = useState(1)
    const [currPages, setCurrPages] = useState(1)
    const [isStep, setIsStep] = useState(1)

    const [searchData, setSearchData] = useState("")
    const [visibleId, setVisibleId] = useState("")
    const [totalPage, setTotalPage] = useState("")
    const [totalPages, setTotalPages] = useState("")
    const [isIndex, setIsIndex] = useState("")
    const [isChatId, setIsChatId] = useState("")
    const [isOtherId, setIsOtherId] = useState("")
    const [textValue, setTextValue] = useState("")
    const [searchUser, setSearchUser] = useState("")

    const [userInfo, setUserInfo] = useState({})
    const [userView, setUserView] = useState({})

    const [messageList, setMessageList] = useState([])
    const [chatList, setChatList] = useState([])
    const [userList, setUserList] = useState([])

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [chatList])

    useEffect(() => {

        // Socket.on("connect", () => {
        //     console.log(Socket.connected, Socket.id);
        // });

        // if (Socket.connected != true) {
        //     Socket.emit("socket_register", {
        //         userId: userId.userId,
        //     });
        // }

        Socket.on("count_update", (data) => updatecount(data));

        Socket.on("new_message", (data) => {
            console.log("new_message", data);
            if (isChatId) {
                if (isChatId === data.chatId) {
                    setChatList([...chatList, data]);
                } else {
                    setChatList([...chatList]);
                }
            }
        });

    }, [Socket, chatList])

    const updatecount = (datas) => {
        let is_update = 0;

        setMessageList((prevChats) => {
            const updatedChats = prevChats.map((item) => {
                if (item.chatId === datas.chatId) {
                    is_update = 1;
                    return datas;
                }
                return item;
            });
            return is_update ? updatedChats : [datas, ...prevChats];
        });
    }

    const handleGetChatList = () => {
        setLoader(true)
        let param = {
            pageNo: pageNo,
            searchTerm: searchData
        }
        getChatList(param)
            .then((res) => {
                if (res.status == 200) {
                    const data = res.data.info;
                    setMessageList(data)
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

    const handleUserList = (page) => {
        setLoader(true)
        let param = {
            pageNo: page,
            searchTerm: searchUser
        }
        getChatUserList(param)
            .then((res) => {
                if (res.status == 200) {
                    const data = res.data.info;
                    if (page != 1) {
                        setUserList([...userList, data])
                    } else {
                        setUserList(data)
                    }
                    setPageNos(page)
                    setTotalPage(res.data.totalPage)
                }
                setCurrPages(res.data.totalPage)
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
        handleGetChatList()
    }, [searchData])

    // useEffect(() => {
    //     handleUserList(pageNos)
    // }, [searchUser])

    let userData = null;
    let types = null
    let role = null
    try {
        const { Data, Types, Role } = location.state;
        userData = Data
        types = Types
        role = Role
    } catch (error) {
        console.log("err")
    }

    const handleDirectChat = () => {
        setIsStep(2)
        Socket.emit("join_room", {
            userId: userId.userId,
            chatId: userData.chatId,
        });

        let obj = {
            userId: userId.userId,
            chatId: userData.chatId
        };
        localStorage.setItem("AdminChat", JSON.stringify(obj));

        setIsFlag(1);
        setIsChatId(userData.chatId);
        setIsOtherId(userData.userId)
        handleChatMessage(currPage, userData.chatId);
    }

    useEffect(() => {
        if (userData) {
            handleDirectChat()
        }
    }, [])

    const toggleOffcanvasSc = () => {
        SetOffcanvasOpenSc(!isOffcanvasOpenSc);
    };

    const handleChatMessage = (page, id) => {
        setNodata(true)
        setIsLoading(true)
        let param = {
            pageNo: page,
            chatId: id
        }
        getChatMessageList(param)
            .then((res) => {
                if (res.status === 200) {
                    const data = res.data.info.reverse();
                    if (page !== 1) {
                        setChatList((prevList) => [...data, ...prevList]);
                    } else {
                        setChatList(data);
                        setTotalPages(res.data.totalPage);
                    }
                    setCurrPage(page);
                    setNodata(false);
                }
                setIsLoading(false);
            })
            .catch((err) => {
                if (err.response?.status === 401) {
                    localStorage.removeItem("welo_admin_token");
                    navigate("/welo_admin/login");
                } else {
                    toast.error(err.response?.data?.message || 'Error occurred');
                }
                setIsLoading(false);
            });
    }

    const sendNewMessage = (e) => {
        e.preventDefault()
        let param = {
            otherId: isOtherId,
            chatId: isChatId,
            messageType: "TEXT",
            messageText: textValue
        }
        sendMessages(param)
            .then((res) => {
                if (res.status == 200) {
                    setTextValue("")
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

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (textValue.length) {
                sendNewMessage(e);
            }
        }
    };

    const handleScroll1 = () => {
        if (currPage < totalPages) {
            handleChatMessage(currPage + 1, isChatId);
            setHasMoreData(true);
        } else {
            setHasMoreData(false);
        }
    };

    const handleChatSelect = (item, index) => {
        setIsStep(1)
        let obj = {
            isChatOnline: item.isChatOnline,
            profilePic: item.profilePic,
            userName: item.userName,
            userRole: item.userRole,
        }
        setUserView(obj)
        if (item.chatId !== isChatId) {
            if (isChatId) {
                Socket.emit("left_room", {
                    userId: userId,
                    chatId: isChatId,
                });
            }
            Socket.emit("join_room", {
                userId: userId.userId,
                chatId: item.chatId,
            });

            let obj = {
                userId: userId.userId,
                chatId: item.chatId
            };
            localStorage.setItem("AdminChat", JSON.stringify(obj));
            userData = null
            setIsFlag(1);
            setIsChatId(item.chatId);
            setIsOtherId(item.otherId);
            handleChatMessage(currPage, item.chatId);
            setCurrPage(1);
            setChatList([]);
            setIsIndex(index + 1);
            setVisibleId(item.chatId);

            let updatedMessages = [...messageList];
            updatedMessages[index].unreadCount = 0;
            setMessageList(updatedMessages);
        }
    };

    const handleUserDirectChat = (id, chatId) => {
        setIsStep(3)
        setModalOpens(false)
        Socket.emit("join_room", {
            userId: id,
            chatId: chatId,
        });

        let obj = {
            userId: id,
            chatId: chatId
        };
        localStorage.setItem("AdminChat", JSON.stringify(obj));

        if (isFlag != 1) {
            setIsFlag(1)
        }
        setIsChatId(chatId)
        setIsOtherId(id)
        handleChatMessage(currPage, chatId);
    }

    const viewMores = () => {
        if (pageNos != totalPages) {
            handleUserList(pageNos + 1)
            setHasMoreData(true);
        } else {
            setHasMoreData(false);
        }
    }

    return (
        <>
            {/* <button onClick={toggleOffcanvasSc}>Toggle Sidebar</button> */}

            <div className='fontNew md:m-4 m-1'>
                <div className="grid grid-cols-12 gap-5">
                    <div className="md:col-span-4 col-span-12">
                        <div className='bg-white rounded-lg py-4 h-[85vh] overflow-auto'>
                            <div className='flex h-10 rounded-xl bg-white my-3 items-center border-2 sm:px-5 px-3 mx-4'>
                                <input
                                    type="text"
                                    required
                                    className='bg-transparent border-none outline-none w-full h-10 text-sm fontNew'
                                    placeholder='Search...'
                                    name='search_text'
                                    value={searchData}
                                    onChange={(e) => setSearchData(e.target.value)}
                                />
                                <img src={search} className='p-2 w-10 cursor-pointer' alt="" />
                            </div>
                            <div>
                                {
                                    loader ?
                                        <div className='flex justify-center items-center w-full h-[70vh]'>
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
                                                messageList.length === 0 ?
                                                    <div className='w-full h-[70vh] flex items-center justify-center'>
                                                        <h1>No Data Found</h1>
                                                    </div>
                                                    :
                                                    <>
                                                        {
                                                            messageList.map((item, index) => {
                                                                return (
                                                                    <div
                                                                        key={index}
                                                                        className='flex items-center py-4 sm:ps-7 ps-3 cursor-pointer'
                                                                        onClick={() => handleChatSelect(item, index)}
                                                                    >
                                                                        <img src={item.profilePic ? IMG_URL + item.profilePic : welorounds} crossOrigin='anonymous' className='w-[60px] h-[50px] object-cover rounded-full' alt="" />
                                                                        <div className='ms-4 w-full flex items-center justify-between py-3'>
                                                                            <div className='w-full'>
                                                                                <div className='flex items-center justify-between'>
                                                                                    <p className='text-base font-medium'>{item.userName || ""}</p>
                                                                                    <p className='text-[#9EA0A8]'>{moment(item.createdAt).fromNow()}</p>
                                                                                </div>
                                                                                <div className='flex items-center justify-between'>
                                                                                    <p className='text-[#9EA0A8] truncate w-80'>{item.messageText || ""}</p>
                                                                                    {item.unreadCount ? (
                                                                                        <p className='bg-[#00987C] w-6 h-6 rounded-full text-white flex items-center justify-center text-sm mt-2'>
                                                                                            {item.unreadCount}
                                                                                        </p>
                                                                                    ) : (
                                                                                        ""
                                                                                    )}
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                        <div className={parseInt(item.chatId) === parseInt(visibleId) ? "h-auto w-[6px] bg-[#00987C] ml-3" : "h-auto w-[6px] bg-white ml-3"}></div>
                                                                    </div>
                                                                )
                                                            })}
                                                    </>
                                            }
                                        </>
                                }
                            </div>
                        </div>
                        {/* <div className='z-99 relative flex justify-end -mt-18 mr-8'>
                            <div onClick={() => setModalOpens(true)} className='bg-[#e45f5f] p-3.5 rounded-full cursor-pointer'>
                                <img src={folder} className='w-6 h-6' alt="" />
                            </div>
                        </div> */}
                    </div>
                    <div className="md:col-span-8 col-span-12 bg-white py-4 rounded-lg sm:px-5 px-3">
                        {
                            isFlag == 0 ?
                                <div className="md:col-span-8 col-span-12 bg-white py-4 sm:px-5 px-3 rounded-lg">
                                    <div className='h-[80vh] flex items-center justify-center'>
                                        <div className='text-center'>
                                            <div className='flex justify-center'>
                                                <img src={welorounds} className='w-18' alt="" />
                                            </div>
                                            <p className='mt-2'>Hey,</p>
                                            <p>Please select a chat to start messaging.</p>
                                        </div>
                                    </div>
                                </div>
                                :
                                <>
                                    <div className='flex items-center justify-between mb-2'>
                                        <div className='flex items-center'>
                                            {
                                                isStep === 3 ?
                                                    <>
                                                        <img src={userInfo.profilePic ? IMG_URL + userInfo.profilePic : welorounds} crossOrigin='anonymous' className='w-[60px] h-[50px] rounded-full object-cover' alt="" />
                                                        <div className='ps-4 w-full'>
                                                            <p className='text-lg font-medium'>{userInfo.userName ? userInfo.userName : ""}</p>
                                                            <ul className='list-disc ps-4'>
                                                                <li className='text-[#00987C] text-sm'>Online</li>
                                                            </ul>
                                                        </div>
                                                    </>
                                                    : isStep === 2 ?
                                                        <>
                                                            <img src={types == 1 ? IMG_URL + userData.Company.companyPic : IMG_URL + userData.profilePic} crossOrigin='anonymous' className='w-[60px] h-[50px] rounded-full object-cover' alt="" />
                                                            <div className='ps-4 w-full'>
                                                                <p className='text-lg font-medium'>{types == 1 ? userData.Company.companyName : <>{userData.firstName || ""} {userData.lastName || ""}</>} ({role || ""})</p>
                                                                <ul className='list-disc ps-4'>
                                                                    <li className='text-[#00987C] text-sm'>Online</li>
                                                                </ul>
                                                            </div>
                                                        </>
                                                        :
                                                        <>
                                                            <img src={userView.profilePic ? IMG_URL + userView.profilePic : welorounds} crossOrigin='anonymous' className='w-[60px] h-[50px] rounded-full object-cover' alt="" />
                                                            <div className='ps-4 w-full'>
                                                                <p className='text-lg font-medium'>{userView.userName || ""} ({userView.userRole || ""})</p>
                                                                <ul className='list-disc ps-4'>
                                                                    <li className='text-[#00987C] text-sm'>Online</li>
                                                                </ul>
                                                            </div>
                                                        </>

                                            }
                                        </div>
                                        <div>
                                            <button className='bg-[#00987C29] py-2 px-3 text-[#00987C] text-sm rounded-lg'>View Profile</button>
                                        </div>
                                    </div>
                                    <div className='overflow-y-scroll hide-scrollbar h-[69vh]' id='chatdiv' style={{ overflowY: "scroll", display: "flex", flexDirection: "column-reverse" }}>
                                        <div className='flex items-end'>
                                            <div className='w-full'>
                                                {chatList.map((item, index) => {
                                                    return (
                                                        <div key={index} ref={scrollRef}>
                                                            {userId.userId === item.messageBy ? (
                                                                <div>
                                                                    <div className='flex justify-end text-white my-2'>
                                                                        <div className='bg-[#00987C] px-5 py-2 rounded-tl-xl rounded-br-xl rounded-bl-xl max-w-[50%]'>
                                                                            <p>{item.messageText || ""}</p>
                                                                        </div>
                                                                    </div>
                                                                    <p className='text-gray-400 text-[13px] text-end'>
                                                                        {moment(item.createdAt).format("h:mm a")}
                                                                    </p>
                                                                </div>
                                                            ) : (
                                                                <div>
                                                                    <div className='flex justify-start text-white my-2'>
                                                                        <div className='bg-[#efefef] text-black px-5 py-2 rounded-tr-xl rounded-br-xl rounded-bl-xl max-w-[50%]'>
                                                                            <p>{item.messageText || ""}</p>
                                                                        </div>
                                                                    </div>
                                                                    <p className='text-gray-400 text-[13px] text-start'>
                                                                        {moment(item.createdAt).format("h:mm a")}
                                                                    </p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        <div className='flex justify-center items-center h-full'>
                                            <InfiniteScroll
                                                dataLength={messageList.length || 0}
                                                next={handleScroll1}
                                                inverse={true}
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
                                                scrollableTarget="chatdiv"
                                            >
                                            </InfiniteScroll>
                                        </div>
                                    </div>
                                    <form onSubmit={sendNewMessage}>
                                        <div className='flex items-center mt-3'>
                                            <input type="text" onKeyDown={handleKeyDown} required placeholder='Type...' value={textValue} onChange={(e) => setTextValue(e.target.value)} className='w-full bg-[#F1F1F1] rounded-full outline-none px-7 h-[50px]' />
                                            {
                                                textValue ?
                                                    <button type='submit'>
                                                        <img src={send} className='w-[50px] ms-3' alt="" />
                                                    </button>
                                                    : ""
                                            }
                                        </div>
                                    </form>
                                </>
                        }
                    </div>
                </div>
            </div>
            <div
                onClick={toggleOffcanvasSc}
                className={`fixed inset-0 overflow-hidden z-[100] ${isOffcanvasOpenSc ? "block" : "hidden"
                    }`}
            >
                <div className="absolute inset-0 overflow-hidden">
                    <div
                        className={`absolute inset-0 bg-black opacity-75 transition-opacity ${isOffcanvasOpenSc ? "opacity-70" : "opacity-0"
                            }`}
                        onClick={toggleOffcanvasSc}
                    ></div>
                    <div
                        className={`fixed inset-y-0 right-0 pl-10 max-w-full flex z-[70] transform transition-transform duration-300 z-999 ${isOffcanvasOpenSc ? "translate-x-0" : "translate-x-full"
                            }`}
                    >
                        <div
                            style={{ fontFamily: "Poppins" }}
                            className="relative w-screen max-w-md md:ms-0  ms-16"
                        >
                            <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll hide-scrollbar">
                                <div>
                                    <div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Dialog
                open={isModalOpens}
                onClose={() => setModalOpens(false)}
                size="md"
            >
                <Dialog.Panel>
                    <Dialog.Description className="rounded-none border-2 border-white fontNew">
                        <div>
                            <div className='flex justify-between items-center mt-5 px-8'>
                                <h1 className='text-xl font-medium'>User List</h1>
                                <div>
                                    <input type="search" value={searchUser} onChange={(e) => setSearchUser(e.target.value)} placeholder='search...' className='border-2 outline-none py-1 px-3 rounded-lg text-base' />
                                </div>
                            </div>
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
                                                    userList.length === 0 ?
                                                        <div className='col-span-12 h-[50vh] justify-center flex items-center'>
                                                            <img src={nodata} className='w-28' alt="" />
                                                        </div>
                                                        :
                                                        <>
                                                            {
                                                                userList.map((item, index) => {
                                                                    return (
                                                                        <div key={index} className='flex justify-between py-3'>
                                                                            <div className='flex items-center'>
                                                                                <img src={item.profilePic ? IMG_URL + item.profilePic : welorounds} crossOrigin='anonymous' className='object-cover w-12 h-12 rounded-full' alt="" />
                                                                                <p className='font-medium ml-2'>{item.userName || ""}</p>
                                                                            </div>
                                                                            <div onClick={() => { handleUserDirectChat(item.otherId, item.chatId); setUserInfo(item) }} className='cursor-pointer'>
                                                                                <img src={chatIcon} className='w-10 h-10' alt="" />
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                            <div className="flex justify-center mt-8">
                                                                <InfiniteScroll
                                                                    dataLength={userList.length || 0}
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
                                                        </>
                                                }
                                            </>
                                    }
                                </div>
                                <div className='flex font-medium w-full px-8 pb-4'>
                                    <button onClick={() => setModalOpens(false)} className='bg-[#F4F5FA] text-[#575757] flex items-center justify-center h-[42px] w-[130px] rounded-[10px]'>
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Dialog.Description>
                </Dialog.Panel>
            </Dialog>
        </>
    )
}

export default Message