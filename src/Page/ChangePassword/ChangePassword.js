import React, { useState } from 'react'
import EyeSlash from "../../Assets/Image/corporate/slasheye.png"
import Eye from "../../Assets/Image/corporate/eye.png"
import tick from "../../Assets/Image/corporate/tick.png"
import cancel from "../../Assets/Image/corporate/cancel.png"
import { Circles, ThreeCircles } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { changePassword } from '../../Services/ApiServices'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie';

function ChangePassword() {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)
    const [isLengthValid, setIsLengthValid] = useState(false);
    const [hasNumber, setHasNumber] = useState(false);
    const [hasSpecialChar, setHasSpecialChar] = useState(false);

    const [eyes, setEyes] = useState(0)
    const [eyess, setEyess] = useState(0)
    const [eyesss, setEyesss] = useState(0)

    const [texts, setTexts] = useState("password")
    const [textss, setTextss] = useState("password")
    const [textsss, setTextsss] = useState("password")

    const [formData, setFormData] = useState({})


    const handleSubmit = (e) => {
        e.preventDefault()
    }

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

    const handleEyesss = () => {
        const flag = eyesss == 0 ? 1 : 0
        setEyesss(flag)

        const text = textsss == "password" ? "text" : "password"
        setTextsss(text)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value })

        if (name === 'newpass' || name === "confinewpass") {
            setIsLengthValid(value.length >= 8);
            setHasNumber(/\d/.test(value));
            setHasSpecialChar(/[!@#$%^&*(),.?":{}|<>]/.test(value));
        }
    };


    const handleChangePassword = (e) => {
        setIsLoading(true)
        e.preventDefault()
        let param = {
            oldpass: formData.oldPassword,
            newpass: formData.newpass
        }

        if (formData.newpass != formData.confinewpass) {
            toast.error("New Password & Confirm New Password Don't Match")
            setIsLoading(false)
        } else {
            changePassword(param)
                .then((res) => {
                    console.log("add >>", res)
                    if (res.status == 200) {
                        setFormData({ oldPassword: "", newpass: "", confinewpass: "" })
                        setHasSpecialChar(false)
                        setHasNumber(false)
                        setIsLengthValid(false)
                        toast.success(res.data.message)
                    }
                    setIsLoading(false)
                })
                .catch((err) => {
                    if (err.response.status == 401) {
                        localStorage.removeItem("welo_admin_token")
                        navigate("/corporatelogin")
                    } else {
                        toast.error(err.response.data.message)
                    }
                    setIsLoading(false)
                })
        }
    }

    return (
        <div className='md:m-4 m-1'>
            <div className="grid-cols-12 grid">
                <div className='col-span-12 bg-white rounded-lg sm:p-8 p-4'>
                    <p className='fontNew text-base text-[#7E7E7E] py-3'>Your new password must be unique from those previously used.</p>
                    <form onSubmit={handleChangePassword}>
                        <div className='mt-3 mb-6'>
                            <div className='my-3'>
                                <p className='text-sm font-medium mb-3'>Current Password</p>
                                <div className='flex items-center'>
                                    <input
                                        type={texts}
                                        required
                                        className='bg-transparent ps-4 pe-12 rounded-md border-2 w-full outline-[#00987C] h-[54px] text-base'
                                        placeholder='Password'
                                        name='oldPassword'
                                        value={formData.oldPassword}
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
                            <div className='my-3'>
                                <p className='text-sm font-medium mb-3'>New Password</p>
                                <div className='flex items-center'>
                                    <input
                                        type={textss}
                                        required
                                        className='bg-transparent ps-4 pe-12 rounded-md border-2 w-full outline-[#00987C] h-[54px] text-base'
                                        placeholder='Password'
                                        name='newpass'
                                        value={formData.newpass}
                                        onChange={(e) => handleChange(e)}
                                    />
                                    {
                                        eyess == 0 ?
                                            <img src={EyeSlash} onClick={handleEyess} className='p-2 w-10 h-10 -ms-12 cursor-pointer' alt="" />
                                            :
                                            <img src={Eye} onClick={handleEyess} className='p-2 w-10 h-8 -ms-12 cursor-pointer' alt="" />
                                    }
                                </div>
                            </div>
                            <div className='my-3'>
                                <p className='text-sm font-medium mb-3'>Confirm New Password</p>
                                <div className='flex items-center'>
                                    <input
                                        type={textsss}
                                        required
                                        className='bg-transparent ps-4 pe-12 rounded-md border-2 w-full outline-[#00987C] h-[54px] text-base'
                                        placeholder='Password'
                                        name='confinewpass'
                                        value={formData.confinewpass}
                                        onChange={(e) => handleChange(e)}
                                    />
                                    {
                                        eyesss == 0 ?
                                            <img src={EyeSlash} onClick={handleEyesss} className='p-2 w-10 h-10 -ms-12 cursor-pointer' alt="" />
                                            :
                                            <img src={Eye} onClick={handleEyesss} className='p-2 w-10 h-8 -ms-12 cursor-pointer' alt="" />
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='my-3'>
                            <div className='flex items-center'>
                                <img src={isLengthValid ? tick : cancel} className='h-4 w-4' alt="" />
                                <p className='ps-3 text-sm'>8 or more characters</p>
                            </div>
                            <div className='flex items-center my-3'>
                                <img src={hasNumber ? tick : cancel} className='h-4 w-4' alt="" />
                                <p className='ps-3 text-sm'>Contain at least 1 number</p>
                            </div>
                            <div className='flex items-center'>
                                <img src={hasSpecialChar ? tick : cancel} className='h-4 w-4' alt="" />
                                <p className='ps-3 text-sm'>Contain at least 1 special character</p>
                            </div>
                        </div>
                        <div>
                            <button type="submit" className="btn btn-primary my-5 bg-[#00987C] w-[226px] h-[42px] rounded-lg text-white text-sm">
                                {
                                    isLoading ?
                                        <div className='flex justify-center'>
                                            <Circles
                                                width={23}
                                                height={23}
                                                color="#fff"
                                                ariaLabel="circles-loading"
                                                wrapperStyle={{}}
                                                visible={true}
                                                wrapperClass=""
                                            />
                                        </div>
                                        :
                                        "Update"
                                }
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword