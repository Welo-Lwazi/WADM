import React, { useState } from 'react'
import loginsides from "../../Assets/Image/corporate/loginside2.jpg"
import logo from "../../Assets/Image/corporate/logo.png"
import thumb from "../../Assets/Image/corporate/thumbs-up_1f44d 1.png"
import health from "../../Assets/Image/corporate/Frame 3.png"
import { Circles, ThreeCircles } from 'react-loader-spinner'
import { useLocation, useNavigate } from 'react-router-dom'
import OTPInput from 'react-otp-input'
import toast from 'react-hot-toast'
import axios from 'axios'
import { FORGOT_PASSWORD_API, VERIFICATION_CORPORATE_API } from '../../Services/Api'

function Verification() {

    const navigate = useNavigate()
    const location = useLocation()

    const [otp, setOtp] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    let newEmail;
    try {
        const { Email } = location.state;
        newEmail = Email
    } catch (error) {
        console.log("err")
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)

        axios.post(VERIFICATION_CORPORATE_API, {
            emailId: newEmail,
            otp: otp
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                console.log("res >>>", res);
                navigate("/welo_admin/resetpassword", { state: { Email: newEmail, OTP: res.data.code } })
                setIsLoading(false);
            })
            .catch((err) => {
                console.log("err >>", err)
                if (err.response.status == 422) {
                    const errs = err.response.data
                    toast.error(errs.errors[0].msg)
                } else {
                    toast.error(err.response.data.message);
                }
                setIsLoading(false);
            });
    }

    const handleResend = () => {
        axios.post(FORGOT_PASSWORD_API, {
            emailId: newEmail,
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                console.log("res >>>", res);
                setOtp("")
            })
            .catch((err) => {
                if (err.response.status == 422) {
                    const errs = err.response.data
                    toast.error(errs.errors[0].msg)
                } else {
                    toast.error(err.response.data.message);
                }
            });
    }

    return (
        <>
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
                            <p className='fontNew sm:text-3xl text-xl font-semibold pb-3'>Verification</p>
                            <p className='fontNew text-sm text-[#7E7E7E] py-3'>We have just sent a 4-digit verification code to your <br /> registered email</p>
                            <form onSubmit={handleSubmit}>
                                <div className='my-7 flex justify-center'>
                                    <OTPInput
                                        value={otp}
                                        onChange={setOtp}
                                        numInputs={4}
                                        inputType="tel"
                                        renderInput={(props) => <input required {...props} className="otp fontNew bg-zinc-100 outline-[#00987C] rounded-full border-2 border-slate-300 m-3 text-center text-xl font-medium" />}
                                    />
                                </div>
                                <div>
                                    <button disabled={isLoading} type='submit' className='fontNew h-[54px] items-center w-full rounded-2xl flex font-base justify-center text-white text-base bg-[#EA5F5F]'>
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
                                                "Verify"
                                        }
                                    </button>
                                    <div className='mt-5 mb-10 flex items-center justify-center'>
                                        <p onClick={handleResend} className='ps-3 text-sm text-[#EA5F5F] cursor-pointer font-medium'>Resend Code</p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Verification