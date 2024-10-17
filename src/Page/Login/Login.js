import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import loginsides from '../../Assets/Image/corporate/loginside2.jpg';
import EyeSlash from '../../Assets/Image/corporate/slasheye.png';
import Eye from '../../Assets/Image/corporate/eye.png';
import logo from '../../Assets/Image/corporate/logo.png';
import thumb from '../../Assets/Image/corporate/thumbs-up_1f44d 1.png';
import health from '../../Assets/Image/corporate/Frame 3.png';
import { Circles } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import welo from '../../Assets/Image/sidebar/welo.png';
import { ADMIN_LOGIN_API } from '../../Services/Api';
import toast from 'react-hot-toast';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { getToken } from "firebase/messaging";
import { messaging } from '../../Firebase';

function Login() {
    const navigate = useNavigate();
    const [eyes, setEyes] = useState(0);
    const [texts, setTexts] = useState('password');
    const [isLoading, setIsLoading] = useState(false);
    const [fcmToken, setFcmToken] = useState("");

    const token = localStorage.getItem("welo_admin_token");

    let deviceId = localStorage.getItem('DeviceId');

    const getFCMToken = async () => {
        try {
            const currentToken = await getToken(messaging, { vapidKey: "BEyDl51h9W-VHQAfnbinAOteS63I3G0pt9by7edtwuLInkLRjSsV2BRUkreAYHUKjcfIb3DCVifLwO_zeLWXxkA" });
            if (currentToken) {
                console.log("FCM Token:", currentToken);
                setFcmToken(currentToken)
                return currentToken;
            } else {
                console.log("No registration token available.");
                return null;
            }
        } catch (error) {
            console.error("An error occurred while retrieving the FCM token.", error);
            return null;
        }
    };

    useEffect(() => {
        getFCMToken();
    }, []);

    useEffect(() => {
        if (token) {
            navigate("/welo_admin/dashboard");
        }

        if (!deviceId) {
            deviceId = uuidv4();
            localStorage.setItem('DeviceId', deviceId);
        }
    }, [navigate, token, deviceId]);

    const handleEyes = () => {
        const flag = eyes === 0 ? 1 : 0;
        setEyes(flag);

        const text = texts === 'password' ? 'text' : 'password';
        setTexts(text);
    };

    const initialValues = {
        email: '',
        password: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .matches(/^[a-z0-9._%+-]+@/, 'Invalid email address')
            .required('Required'),
        password: Yup.string()
            .min(8, 'Minimum 8 characters required')
            .required('Required'),
    });

    const handleSubmit = (values, { setSubmitting }) => {
        setIsLoading(true);

        axios.post(ADMIN_LOGIN_API, {
            emailId: values.email,
            password: values.password,
            deviceType: 'WEB',
            deviceId: deviceId,
            deviceToken: fcmToken || "xyz",
            userRole: "ADMIN"
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                toast.success(res.data.message);
                const data = res.data.info
                let obj = {
                    userId: data.userId,
                    profilePic: data.profilePic
                }
                localStorage.setItem("ADMIN_INFO", JSON.stringify(obj))
                // Cookies.set('welo_admin_token', res.data.userToken);
                localStorage.setItem("welo_admin_token", res.data.userToken)
                navigate("/welo_admin/dashboard");
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
                <div className='text-start flex justify-center items-center h-[100vh]'>
                    <div>
                        <div className='lg:hidden flex justify-center mb-3'>
                            <img src={welo} className='w-[150px]' alt="" />
                        </div>
                        <p className='fontNew sm:text-3xl text-xl font-semibold pb-3'>Glad to see you!</p>
                        <p className='fontNew text-sm text-[#7E7E7E] py-3'>Please log in with your registered email address</p>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <div>
                                        <div className='flex items-center mt-3'>
                                            <p className='fontNew text-sm font-medium'>Work Email Address</p>
                                            <ErrorMessage name="email" component="div" className="text-red-500 text-sm ms-2" />
                                        </div>
                                        <div className='mt-3 mb-6'>
                                            <div className='md:w-[380px] w-full flex my-3 items-center'>
                                                <Field
                                                    type="email"
                                                    name="email"
                                                    autoComplete="off"
                                                    className='bg-transparent px-4 rounded-xl border-2 border-slate-300 w-full outline-[#00987C] h-[54px] text-base'
                                                    placeholder='Email'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className='flex items-center mt-2'>
                                            <p className='text-sm font-medium'>Password</p>
                                            <ErrorMessage name="password" component="div" className="text-red-500 text-sm ms-2" />
                                        </div>
                                        <div className='mt-3 mb-6'>
                                            <div className='flex my-3 items-center'>
                                                <Field
                                                    type={texts}
                                                    name="password"
                                                    autoComplete="off"
                                                    className='bg-transparent ps-4 pe-12 rounded-xl border-2 border-slate-300 w-full outline-[#00987C] h-[54px] text-base'
                                                    placeholder='Password'
                                                />
                                                {eyes === 0 ?
                                                    <img src={EyeSlash} onClick={handleEyes} className='p-2 w-10 h-10 -ms-12 cursor-pointer' alt="" />
                                                    :
                                                    <img src={Eye} onClick={handleEyes} className='p-2 w-10 h-8 -ms-12 cursor-pointer' alt="" />
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className='mt-5 mb-10 flex items-center justify-center'>
                                        <p className='ps-3 text-sm text-[#EA5F5F] cursor-pointer' onClick={() => { navigate("/welo_admin/forgotpassword") }}>Forgot Password?</p>
                                    </div>
                                    <div>
                                        <button type='submit' className='fontNew h-[54px] items-center w-full rounded-2xl flex font-base justify-center text-white text-base bg-[#EA5F5F]' disabled={isLoading}>
                                            {isLoading ? (
                                                <Circles
                                                    width={23}
                                                    height={23}
                                                    color="#fff"
                                                    ariaLabel="circles-loading"
                                                    wrapperStyle={{}}
                                                    visible={true}
                                                    wrapperClass=""
                                                />
                                            ) : (
                                                "Login"
                                            )}
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
