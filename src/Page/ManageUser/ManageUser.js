import React, { useRef, useState } from 'react'
import users from "../../Assets/Image/corporate/user.png";
import Dialog from '../../Base-Component/Dialog/Dialog';
import back from "../../Assets/Image/corporate/background2.png"
import FormSelect from '../../Base-Component/FormSelect/FormSelect';
import men1 from "../../Assets/Image/corporate/men6.png"
import men2 from "../../Assets/Image/corporate/men7.png"
import men3 from "../../Assets/Image/corporate/men8.png"
import men4 from "../../Assets/Image/corporate/men9.png"
import men5 from "../../Assets/Image/corporate/men10.png"
import tabedit from "../../Assets/Image/corporate/edit.png"
import tabdeletes from "../../Assets/Image/corporate/delete.png"
import nodata from "../../Assets/Image/corporate/nodata.png"
import search from "../../Assets/Image/corporate/Search.png"
import add from "../../Assets/Image/corporate/add.png"
import EyeSlash from "../../Assets/Image/corporate/slasheye.png"
import Eye from "../../Assets/Image/corporate/eye.png"
import { useNavigate } from 'react-router-dom';

function ManageUser() {

    const navigate = useNavigate()
    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [eyes, setEyes] = useState(0)
    const [eyess, setEyess] = useState(0)
    const [pageNo, setPageNo] = useState(1)
    const [totalPage, setTotalPage] = useState(3)

    const [image, setImage] = useState("")
    const [img, setImg] = useState("")
    const [searchData, setSearchData] = useState("")
    const [handelSelectId, setHandleSelectId] = useState("")
    const [handelSelectName, setHandleSelectName] = useState("")
    const [handelSelect, setHandleSelect] = useState("")
    const [texts, setTexts] = useState("password")
    const [textss, setTextss] = useState("password")
    const [textsss, setTextsss] = useState("password")

    const [isAddUser, setIsAddUser] = useState(false)
    const [isDeleteUser, setIsDeleteUser] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [employeess, setEmployeess] = useState({})
    const [formData, setFormData] = useState({})

    const [userData, setUserData] = useState([
        {
            id: "#6790",
            image: men1,
            name: "Esther Howard",
            email: "estherhoward15@gmail.com",
            contact_no: "+1 124584102",
            gender: "Male",
            last_check: "12 Mar, 2024",
        },
        {
            id: "#6790",
            image: men2,
            name: "Cameron Williamson",
            email: "estherhoward15@gmail.com",
            contact_no: "+1 124584102",
            gender: "Male",
            last_check: "12 Mar, 2024",
        },
        {
            id: "#6790",
            image: men3,
            name: "Jenny Wilson",
            email: "estherhoward15@gmail.com",
            contact_no: "+1 124584102",
            gender: "Male",
            last_check: "12 Mar, 2024",
        },
        {
            id: "#6790",
            image: men4,
            name: "Guy Hawkins",
            email: "estherhoward15@gmail.com",
            contact_no: "+1 124584102",
            gender: "Male",
            last_check: "12 Mar, 2024",
        },
        {
            id: "#6790",
            image: men5,
            name: "Savannah Nguyen",
            email: "estherhoward15@gmail.com",
            contact_no: "+1 124584102",
            gender: "Female",
            last_check: "12 Mar, 2024",
        },
        {
            id: "#6790",
            image: men1,
            name: "Bessie Cooper",
            email: "estherhoward15@gmail.com",
            contact_no: "+1 124584102",
            gender: "Male",
            last_check: "12 Mar, 2024",
        },
        {
            id: "#6790",
            image: men2,
            name: "Cody Fisher",
            email: "estherhoward15@gmail.com",
            contact_no: "+1 124584102",
            gender: "Male",
            last_check: "12 Mar, 2024",
        },
    ])

    const handleFile = (e) => {
        setImage(e.target.files[0])
        let imageData = URL.createObjectURL(e.target.files[0])
        setImg(imageData)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
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

    const handleEyes = () => {
        const flag = eyes == 0 ? 1 : 0
        setEyes(flag)

        const text = texts == "password" ? "text" : "password"
        setTexts(text)
    }

    const handleEyess = () => {
        const flag = eyess == 0 ? 1 : 0
        setEyess(flag)

        const text = textss == "password" ? "text" : "password"
        setTextss(text)
    }

    const handleDeleteUser = (data) => {
        setEmployeess(data)
        setIsDeleteUser(true)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    const startDragging = (e) => {
        if (scrollRef.current) {
            setIsDragging(true);
            setStartX(e.pageX - scrollRef.current.offsetLeft);
            setScrollLeft(scrollRef.current.scrollLeft);
            document.body.style.userSelect = 'none'; // Disable text selection
        }
    };

    const stopDragging = () => {
        setIsDragging(false);
        document.body.style.userSelect = ''; // Re-enable text selection
    };

    const onDragging = (e) => {
        if (!isDragging || !scrollRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 2; // scroll-fast
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };


    return (
        <div className='md:m-4 m-1'>
            <div className='grid grid-cols-12'>
                <div className='col-span-12 fontNew duration-300 cursor-pointer'>
                    <div className='flex flex-wrap justify-between items-center'>
                        <div>
                            <h1 className='text-2xl sm:mb-0 mb-3 font-medium'>Users</h1>
                        </div>
                        <div className='flex flex-wrap items-center justify-end'>
                            <button onClick={() => setIsAddUser(true)} className='bg-[#EA5F5F] text-white flex items-center py-2 px-3 border-2 sm:mr-3 mr-0 border-[#EA5F5F] rounded-xl' >
                                <img src={add} className='w-6 mr-2' alt="" />Add User
                            </button>
                            <div className='flex sm:w-70 w-full h-10 h-12 px-4 rounded-xl bg-white my-3 items-center'>
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
                {
                    userData.length === 0 ?
                        <div className='col-span-12 h-[50vh] justify-center flex items-center'>
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
                                                <FormSelect id="page" name="page_no" className="selects-arrow-hidden w-20 outline-none text-base" value={handelSelectId} onChange={(e) => setHandleSelectId(e.target.value)}>
                                                    <option value="5">ID</option>
                                                    <option value="10">10</option>
                                                    <option value="15">15</option>
                                                </FormSelect>
                                            </th>
                                            <th className='py-4 px-3 text-base font-medium whitespace-nowrap text-start first:rounded-l-lg last:rounded-r-lg'>
                                                <FormSelect id="page" name="page_no" className="selects-arrow-hidden outline-none w-28 text-base" value={handelSelectName} onChange={(e) => setHandleSelectName(e.target.value)}>
                                                    <option value="5">Name</option>
                                                    <option value="10">10</option>
                                                    <option value="15">15</option>
                                                </FormSelect>
                                            </th>
                                            <th className='py-4 px-3 text-base font-medium whitespace-nowrap text-start first:rounded-l-lg last:rounded-r-lg'>
                                                Email
                                            </th>
                                            <th className='py-4 px-3 text-base font-medium whitespace-nowrap text-start first:rounded-l-lg last:rounded-r-lg'>
                                                <div className='text-center'>
                                                    Action
                                                </div>
                                            </th>
                                        </tr>
                                        <tbody>
                                            {
                                                userData.map((item, index) => {
                                                    return (
                                                        <tr key={index} className='bg-white font-medium'>
                                                            <td className='text-start px-4 py-3 first:rounded-l-lg last:rounded-r-lg'>
                                                                <div className='whitespace-nowrap'>
                                                                    {item.id}
                                                                </div>
                                                            </td>
                                                            <td className='text-start px-4 py-3 first:rounded-l-lg last:rounded-r-lg'>
                                                                <div className='whitespace-nowrap w-52 flex items-center'>
                                                                    <img src={item.image} className='w-10' alt="" />
                                                                    <p className='text-base ms-3'>{item.name}</p>
                                                                </div>
                                                            </td>
                                                            <td className='text-start px-4 py-3 first:rounded-l-lg last:rounded-r-lg'>
                                                                <div className='whitespace-nowrap'>
                                                                    <p className='text-base'>{item.email}</p>
                                                                </div>
                                                            </td>
                                                            <td className='text-start flex justify-center px-4 py-3 first:rounded-l-lg last:rounded-r-lg'>
                                                                <div className='flex items-center w-52 justify-center cursor-pointer'>
                                                                    <div>
                                                                        <img onClick={() => setIsAddUser(true)} src={tabedit} className='lg:w-9 w-8 mx-4' alt="" />
                                                                    </div>
                                                                    <div>
                                                                        <img onClick={() => handleDeleteUser(item)} src={tabdeletes} className='lg:w-9 w-8' alt="" />
                                                                    </div>
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
                open={isAddUser}
                onClose={() => setIsAddUser(false)}
                size="md"
            >
                <Dialog.Panel>
                    <Dialog.Description className="rounded-none border-2 border-white">
                        <div className='md:px-8 md:py-4 p-4 sm:w-auto w-[330px] md:h-auto h-[500px] overflow-auto fontNew'>
                            <h1 className='text-lg font-semibold mb-2'>User</h1>
                            <form onSubmit={handleSubmit}>
                                <div className='grid grid-cols-12 '>
                                    <div className='col-span-12 flex items-center mx-2 my-3'>
                                        {
                                            img ?
                                                <img src={img} className='2xl:w-[106px] 2xl:h-[106px] w-[88px] h-[88px] rounded-full object-cover' alt="" />
                                                :
                                                <img src={users} className='2xl:w-[106px] 2xl:h-[106px] w-[88px] h-[88px] rounded-full' alt="" />
                                        }
                                        <div className='ms-5'>
                                            <h4 className='text-base font-semibold'>Profile Image</h4>
                                            <p className='text-xs my-2 text-[#9C9DA9]'>Png, JPG, up to 5 MB</p>
                                            <div className='mt-6'>
                                                <label htmlFor="upload-photo" className='bg-[#FBFBFB] text-[#5A5A5A] border-dashed border-2 border-[#D9D9D9] sm:py-3 py-2 px-5 rounded-lg text-sm font-normal'>Upload image</label>
                                                <input type="file" onChange={(e) => handleFile(e)} className='hidden' id='upload-photo' accept='image/*' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='md:col-span-6 col-span-12 md:mx-2 mx-0 my-3'>
                                        <p className='text-sm font-medium mb-3'>First Name</p>
                                        <input type="text" className='border-2 px-4 py-3 rounded-md w-full outline-[#00987C]' placeholder='Enter' />
                                    </div>
                                    <div className='md:col-span-6 col-span-12 md:mx-2 mx-0 my-3'>
                                        <p className='text-sm font-medium mb-3'>Last Name</p>
                                        <input type="text" className='border-2 px-4 py-3 rounded-md w-full outline-[#00987C]' placeholder='Enter' />
                                    </div>
                                    <div className='col-span-12 md:mx-2 mx-0 my-3'>
                                        <p className='text-sm font-medium mb-3'>Email</p>
                                        <input required type="text" className='border-2 px-4 py-3 rounded-md w-full outline-[#00987C]' placeholder='Enter' />
                                    </div>
                                    <div className='col-span-12 md:mx-2 mx-0 my-3'>
                                        <p className='text-sm font-medium mb-3'>Password</p>
                                        <div className='flex items-center'>
                                            <input
                                                type={texts}
                                                // required
                                                className='bg-transparent ps-4 pe-12 rounded-md border-2 w-full outline-[#00987C] h-[54px] text-base'
                                                placeholder='Password'
                                                name='password'
                                                onChange={(e) => handleChange(e)}
                                            />
                                            {
                                                eyes == 0 ?
                                                    <img src={EyeSlash} onClick={handleEyes} className='p-2 w-10 h-10 -ms-12 cursor-pointer' alt="" />
                                                    :
                                                    <img src={Eye} onClick={handleEyes} className='p-2 w-10 h-8 -ms-12 cursor-pointer' alt="" />
                                            }
                                        </div>
                                    </div>
                                    <div className='col-span-12 md:mx-2 mx-0 my-3'>
                                        <p className='text-sm font-medium mb-3'>Confirm Password</p>
                                        <div className='flex items-center'>
                                            <input
                                                type={textss}
                                                // required
                                                className='bg-transparent ps-4 pe-12 rounded-md border-2 w-full outline-[#00987C] h-[54px] text-base'
                                                placeholder='Password'
                                                name='password'
                                                onChange={(e) => handleChange(e)}
                                            />
                                            {
                                                eyes == 0 ?
                                                    <img src={EyeSlash} onClick={handleEyess} className='p-2 w-10 h-10 -ms-12 cursor-pointer' alt="" />
                                                    :
                                                    <img src={Eye} onClick={handleEyess} className='p-2 w-10 h-8 -ms-12 cursor-pointer' alt="" />
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className='mt-6 flex justify-end'>
                                    <button type='button' onClick={() => setIsAddUser(false)} className='bg-[#EF5F5F] py-2 px-7 text-white rounded-lg mr-5'>Close</button>
                                    <button type='submit' className='bg-[#00987C] text-white py-2 px-7 rounded-lg'>Save</button>
                                </div>
                            </form>
                        </div>
                    </Dialog.Description>
                </Dialog.Panel>
            </Dialog>

            <Dialog
                open={isDeleteUser}
                onClose={() => setIsDeleteUser(false)}
                size="md"
            >
                <Dialog.Panel>
                    <Dialog.Description className="rounded-none border-2 border-white">
                        <div>
                            <img src={back} className='w-auto relative' alt="" />
                            <div className='flex justify-center'>
                                <img src={employeess.image} className='absolute sm:w-24 sm:h-24 w-14 h-14 lg:-mt-36 md:-mt-30 sm:-mt-36 -mt-24 rounded-full border-2 ' alt="" />
                            </div>
                        </div>
                        <div className='flex justify-center text-center my-4 sm:px-16 px-5 fontNew'>
                            <div>
                                <h1 className='text-xl font-semibold text-black mt-6'>Delete User?</h1>
                                <p className='text-sm text-gray-500 my-3'>Are you sure want to delete {employeess.name} from the User?</p>
                                <div className='flex mt-16 mb-10'>
                                    <button className='bg-[#F4F5FA] py-[14px] sm:w-36 w-30 text-sm rounded-xl sm:mx-3 mx-2' onClick={() => setIsDeleteUser(false)}>Close</button>
                                    <button className='bg-[#EA5F5F] py-[14px] sm:w-36 w-30 text-sm rounded-xl sm:mx-3 mx-2 text-white' onClick={() => setIsDeleteUser(false)}>Yes, Delete</button>
                                </div>
                            </div>
                        </div>
                    </Dialog.Description>
                </Dialog.Panel>
            </Dialog>
        </div>
    )
}

export default ManageUser