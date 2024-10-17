import React, { useState } from 'react'
import loginsides from "../../Assets/Image/corporate/loginside2.jpg"
import logo from "../../Assets/Image/corporate/logo.png"
import thumb from "../../Assets/Image/corporate/thumbs-up_1f44d 1.png"
import health from "../../Assets/Image/corporate/Frame 3.png"
import { Circles } from 'react-loader-spinner'
import { useLocation, useNavigate } from 'react-router-dom'
import EyeSlash from "../../Assets/Image/corporate/slasheye.png"
import Eye from "../../Assets/Image/corporate/eye.png"
import tick from "../../Assets/Image/corporate/tick.png"
import cancel from "../../Assets/Image/corporate/cancel.png"
import toast from 'react-hot-toast'
import axios from 'axios'
import { RESET_PASSWORD_API } from '../../Services/Api'

function ResetPassword() {

    const navigate = useNavigate()
    const location = useLocation()

    const [eyes, setEyes] = useState(0)
    const [texts, setTexts] = useState("password")
    const [formData, setFormData] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [isLengthValid, setIsLengthValid] = useState(false);
    const [hasNumber, setHasNumber] = useState(false);
    const [hasSpecialChar, setHasSpecialChar] = useState(false);

    let newEmail;
    let otp;
    try {
        const { Email, OTP } = location.state;
        newEmail = Email
        otp = OTP
    } catch (error) {
        console.log("err")
    }

    const handleEyes = () => {
        const flag = eyes == 0 ? 1 : 0
        setEyes(flag)

        const text = texts == "password" ? "text" : "password"
        setTexts(text)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const obj = {
            emailId: newEmail,
            code: otp,
            newpass: formData.password
        }
        axios.post(RESET_PASSWORD_API, obj)
            .then((res) => {
                if (res.status == 200) {
                    toast.success(res.data.message)
                    navigate("/welo_admin")
                    setIsLoading(false)
                }
            })
            .catch((err) => {
                if (err.response.status == 422) {
                    const errs = err.response.data
                    toast.error(errs.errors[0].msg)
                } else {
                    toast.error(err.response.data.message);
                }
                setIsLoading(false)
            });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Validate password
        if (name === 'password') {
            setIsLengthValid(value.length >= 8);
            setHasNumber(/\d/.test(value));
            setHasSpecialChar(/[!@#$%^&*(),.?":{}|<>]/.test(value));
        }
    };

    return (
        <div className="grid grid-cols-12 gap-x-6 fontNew">
            <div className='2xl:col-span-4 xl:col-span-6 lg:col-span-6 h-[100vh] w-full 2xl:flex xl:flex lg:flex hidden bg-center bg-cover' style={{ backgroundImage: `url(${loginsides})` }}>
                <div className='flex flex-col justify-between '>
                    <div className='mx-16 my-12'>
                        <img src={logo} className='w-40' alt="" />
                    </div>
                    <div className='text-white'>
                        <div className='flex justify-end my-16'>
                            <img src={health} className='w-40 -mr-14' alt="" />
                        </div>
                        <div className='mx-16 bg-[#FFF2F221] px-8 py-12 rounded-xl my-10 backdrop-blur-xl'>
                            <div className='flex items-center bg-[#00987C] p-3 rounded-xl mb-8 w-fit'>
                                <img src={thumb} className='w-5' alt="" />
                                <p className='text-sm ps-2'>Stay in touch with Healthcare.</p>
                            </div>
                            <p className='text-xl drop-shadow-md'>Welo extends beyond a service; it champions a shift toward a healthier, more balanced professional lifestyle.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='2xl:col-span-8 xl:col-span-6 lg:col-span-6 col-span-12 mx-3'>
                <div className='flex sm:justify-end justify-center sm:mx-32 mx-0 mt-20 cursor-pointer'>
                    <p onClick={() => { navigate("/welo_admin/login") }}>Go back to <span className='text-[#EA5F5F] font-medium'>Main Screen</span></p>
                </div>
                <div className='text-start flex justify-center items-center h-[80vh]'>
                    <div>
                        <p className='fontNew sm:text-3xl text-xl font-semibold py-3'>Reset Password</p>
                        <p className='fontNew md:w-[380px] w-full text-sm text-[#7E7E7E] py-3'>Your new password must be unique from those <br /> previously used.</p>
                        <p className='fontNew text-sm font-medium mt-3'>Password</p>
                        <form onSubmit={handleSubmit}>
                            <div className='mt-3 mb-6'>
                                <div className='flex my-3 items-center'>
                                    <input
                                        type={texts}
                                        required
                                        className='bg-transparent ps-4 pe-12 rounded-xl border-2 border-slate-300 w-full outline-[#00987C] h-[54px] text-base'
                                        placeholder='Password'
                                        name='password'
                                        onChange={(e) => handleChange(e)}
                                    />
                                    {
                                        eyes === 0 ?
                                            <img src={EyeSlash} onClick={handleEyes} className='p-2 w-10 h-10 -ms-12 cursor-pointer' alt="" />
                                            :
                                            <img src={Eye} onClick={handleEyes} className='p-2 w-10 h-8 -ms-12 cursor-pointer' alt="" />
                                    }
                                </div>
                            </div>
                            <div className='my-8'>
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
                                <button type='submit' disabled={isLoading} className='h-[54px] items-center w-full rounded-2xl flex justify-center text-white text-base bg-[#EA5F5F]'>
                                    {
                                        isLoading ?
                                            <Circles
                                                width={23}
                                                height={23}
                                                color="#fff"
                                                ariaLabel="circles-loading"
                                                wrapperStyle={{}}
                                                visible={true}
                                                wrapperClass=""
                                            />
                                            :
                                            "Reset"
                                    }
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword