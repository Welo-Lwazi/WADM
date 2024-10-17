import React, { useState } from 'react'
import loginsides from "../../Assets/Image/corporate/loginside2.jpg"
import logo from "../../Assets/Image/corporate/logo.png"
import thumb from "../../Assets/Image/corporate/thumbs-up_1f44d 1.png"
import health from "../../Assets/Image/corporate/Frame 3.png"
import { Circles } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FORGOT_PASSWORD_API } from '../../Services/Api';
import toast from 'react-hot-toast';
import axios from 'axios';

function Forgotpassword() {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .matches(/^[a-z0-9._%+-]+@/, 'Invalid email address')
            .required('(Required)'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setIsLoading(true)

            axios.post(FORGOT_PASSWORD_API, {
                emailId: values.email,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => {
                    console.log("res >>>", res);
                    navigate("/welo_admin/verification", { state: { Email: values.email } })
                    setIsLoading(false);
                })
                .catch((err) => {
                    if (err.response.status == 422) {
                        const errs = err.response.data
                        toast.error(errs.errors[0].msg)
                    } else {
                        toast.error(err.response.data.message);
                    }
                    setIsLoading(false);
                });
        },
    });

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
                            <p className='fontNew sm:text-3xl text-xl font-semibold pb-3'>Forgot Password</p>
                            <p className='fontNew md:w-[380px] w-full text-sm text-[#7E7E7E] py-3'>Enter the email address you used when you joined to reset <br /> your password.</p>
                            <form onSubmit={formik.handleSubmit} autoComplete="off">
                                <div>
                                    <div className='flex items-center mt-3'>
                                        <p className='fontNew text-sm font-medium'>Work Email Address</p>
                                        {formik.touched.email && formik.errors.email ? (
                                            <div className="text-red-500 text-sm ms-2">{formik.errors.email}</div>
                                        ) : null}
                                    </div>
                                    <div className='mt-3 mb-10'>
                                        <div className='md:w-[380px] w-full flex my-3 items-center'>
                                            <input
                                                type="email"
                                                name="email"
                                                autoComplete="off"
                                                className='bg-transparent px-4 rounded-xl border-2 border-slate-300 w-full outline-[#00987C] h-[54px] text-base'
                                                placeholder='Email'
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.email}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type='submit'
                                        className='fontNew h-[54px] items-center w-full rounded-2xl flex font-base justify-center text-white text-base bg-[#EA5F5F]'
                                        disabled={isLoading}
                                    >
                                        {isLoading ?
                                            <Circles
                                                width={23}
                                                height={23}
                                                color="#fff"
                                                ariaLabel="circles-loading"
                                                wrapperStyle={{}}
                                                visible={true}
                                            />
                                            :
                                            "Forgot Password"
                                        }
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Forgotpassword