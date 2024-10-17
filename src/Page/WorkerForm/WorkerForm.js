import React, { useState } from 'react'
import users from "../../Assets/Image/corporate/user.png"
import tick from "../../Assets/Image/corporate/tick1.png"
import pdfimage from "../../Assets/Image/corporate/pdfupload.png"
import FormSelect from '../../Base-Component/FormSelect/FormSelect'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom'
import { newName } from '../../Services/Api'

function WorkerForm() {

    const navigate = useNavigate()

    const [isFlag, setIsFlag] = useState(1)
    const [selectStatus, setSelectStatus] = useState(1)
    const [image, setImage] = useState("");
    const [img, setImg] = useState("");

    const initialValues = {
        employeeNumber: '',
        branch: '',
        firstName: '',
        lastName: '',
        jobTitle: '',
        employeeId: '',
        dateOfBirth: '',
        gender: '',
        phone: '',
        email: '',
        fitnessStatus: 'Awaiting Occupational Nurse Appraisal',
    };

    const noSpecialChars = /^[^<>/?]*$/;
    const onlyNumbers = /^[0-9]*$/;

    const validationSchema = Yup.object({
        employeeNumber: Yup.string()
            .matches(onlyNumbers, '(Only numbers are allowed)')
            .matches(noSpecialChars, '(Special characters are not allowed)')
            .required('(Required)'),
        branch: Yup.string()
            .matches(noSpecialChars, '(Special characters are not allowed)')
            .required('(Required)'),
        firstName: Yup.string()
            .matches(noSpecialChars, '(Special characters are not allowed)')
            .required('(Required)'),
        lastName: Yup.string()
            .matches(noSpecialChars, '(Special characters are not allowed)')
            .required('(Required)'),
        jobTitle: Yup.string()
            .matches(noSpecialChars, '(Special characters are not allowed)')
            .required('(Required)'),
        employeeId: Yup.string()
            .matches(noSpecialChars, '(Special characters are not allowed)')
            .required('(Required)'),
        dateOfBirth: Yup.date().required('(Required)'),
        gender: Yup.string().required('(Required)'),
        phone: Yup.string()
            .matches(onlyNumbers, '(Only numbers are allowed)')
            .matches(noSpecialChars, '(Special characters are not allowed)')
            .required('(Required)'),
        email: Yup.string()
            .email('Invalid email address')
            .matches(
                /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                '(Invalid email address)'
            )
            .matches(noSpecialChars, '(Special characters are not allowed)')
            .required('(Required)'),
    });

    const handleFile = (e) => {
        setImage(e.target.files[0]);
        let imageData = URL.createObjectURL(e.target.files[0]);
        setImg(imageData);
    };


    const handleSubmit = (values) => {
        console.log(values);
        setIsFlag(2)
    };

    return (
        <div className='fontNew'>
            <div className='bg-[#00042C] text-white h-[350px] w-full text-center'>
                <div className='py-20'>
                    <h1 className='2xl:text-[34px] xl:text-3xl text-2xl'>Welo Healthcare Worker</h1>
                    <p className='2xl:text-lg text-base mt-2'>Application Form</p>
                </div>
            </div>
            <div className='flex justify-center bg-white -mt-32 2xl:mx-40 xl:mx-28 lg:mx-24 mx-6'>
                <div className='md:my-10 my-5 w-full flex justify-center'>
                    <div className='2xl:w-[624px] xl:w-[521px] lg:w-[421px] md:w-[421px] w-full lg:mx-0 mx-5'>
                        <div className='flex justify-center items-center'>
                            <p className={`flex justify-center items-center w-7 h-7 rounded-full ${1 <= isFlag ? "bg-[#00987C] text-white" : "bg-[#EEEFEF] text-gray-500"}`}>1</p>
                            <span className={`border-b-2 w-[86px] ${2 <= isFlag ? "border-[#00987C]" : "border-[#EAEDEF]"}`}></span>
                            <p className={`flex justify-center items-center w-7 h-7 rounded-full ${2 <= isFlag ? "bg-[#00987C] text-white" : "bg-[#EEEFEF] text-gray-500"}`}>2</p>
                            <span className={`border-b-2 w-[86px] ${3 <= isFlag ? "border-[#00987C]" : "border-[#EAEDEF]"}`}></span>
                            <p className={`flex justify-center items-center w-7 h-7 rounded-full ${3 <= isFlag ? "bg-[#00987C] text-white" : "bg-[#EEEFEF] text-gray-500"}`}>3</p>
                        </div>

                        {
                            isFlag == 1 ?
                                <>
                                    <div className='py-10'>
                                        <h1 className='text-lg font-medium'>Choose your discipline</h1>
                                        <div className='py-9'>
                                            <p className='text-sm pb-2 font-medium'>Your healthcare discipline (professional practice)</p>
                                            <FormSelect id="category" name="fuel_type" value={selectStatus} onChange={(e) => setSelectStatus(e.target.value)} className="select-arrow-hidden text-sm font-medium border-[1px] border-gray-300 py-2 outline-0 rounded-md ">
                                                <option>Choose one</option>
                                                <option>Pending</option>
                                                <option>Confirmed</option>
                                                <option>In-Progress</option>
                                                <option>Completed</option>
                                                <option>Cancelled</option>
                                            </FormSelect>
                                        </div>
                                    </div>
                                    <div className='flex justify-center my-10'>
                                        <button onClick={() => setIsFlag(2)} className='bg-[#EA5F5F] lg:px-20 px-10 py-3 rounded-md text-white'>Next</button>
                                    </div>
                                </>
                                : isFlag == 2 ?
                                    <>
                                        <div className='my-10'>
                                            <h1 className='text-lg  font-medium'>Make sure you have the following ready</h1>
                                            <div>
                                                <div className='flex items-center my-4'>
                                                    <img src={tick} className='w-5' alt="" />
                                                    <p className='ms-3'>Practice Council Registration Document</p>
                                                </div>
                                                <div className='flex items-center my-4'>
                                                    <img src={tick} className='w-5' alt="" />
                                                    <p className='ms-3'>National Identity Document</p>
                                                </div>
                                                <div className='flex items-center my-4'>
                                                    <img src={tick} className='w-5' alt="" />
                                                    <p className='ms-3'>Lifesaving Certificate</p>
                                                </div>
                                                <div className='flex items-center my-4'>
                                                    <img src={tick} className='w-5' alt="" />
                                                    <p className='ms-3'>Police Clearance</p>
                                                </div>
                                            </div>
                                        </div>
                                        <Formik
                                            initialValues={initialValues}
                                            validationSchema={validationSchema}
                                        // onSubmit={handleSubmit}
                                        >
                                            {({ values }) => (
                                                <Form className="space-y-6">
                                                    <h2 className="text-xl font-semibold">Personal Details</h2>

                                                    <div>
                                                        <div className='flex items-center lg:my-10 my-5 '>
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
                                                                    <label htmlFor="upload-photo" className='bg-[#FBFBFB] text-[#5A5A5A] border-dashed border-2 border-[#D9D9D9] py-3 px-5 rounded-lg text-sm font-normal'>Upload image</label>
                                                                    <input type="file" onChange={(e) => handleFile(e)} className='hidden' id='upload-photo' accept='image/*' />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="grid grid-cols-12">
                                                            <div className='md:col-span-6 col-span-12 md:mx-3 mx-0 my-3'>
                                                                <div className='flex text-sm font-medium mb-2'>
                                                                    <label className='mr-2' htmlFor="firstName">First Name</label>
                                                                    <ErrorMessage name="firstName" component="div" className="text-red-500" />
                                                                </div>
                                                                <Field name="firstName" type="text" className="input border-[1px] py-2 px-3 w-full rounded-md outline-[#029D79]" />
                                                            </div>
                                                            <div className='md:col-span-6 col-span-12 md:mx-3 mx-0 my-3'>
                                                                <div className='flex text-sm font-medium mb-2'>
                                                                    <label className='mr-2' htmlFor="lastName">Last Name</label>
                                                                    <ErrorMessage name="lastName" component="div" className="text-red-500" />
                                                                </div>
                                                                <Field name="lastName" type="text" className="input border-[1px] py-2 px-3 w-full rounded-md outline-[#029D79]" />
                                                            </div>
                                                            <div className='md:col-span-6 col-span-12 md:mx-3 mx-0 my-3'>
                                                                <div className='flex text-sm font-medium mb-2'>
                                                                    <label className='mr-2' htmlFor="employeeNumber">ID Number</label>
                                                                    <ErrorMessage name="employeeNumber" component="div" className="text-red-500" />
                                                                </div>
                                                                <Field name="employeeNumber" type="text" className="input border-[1px] py-2 px-3 w-full rounded-md outline-[#029D79]" />
                                                            </div>
                                                            <div className='md:col-span-6 col-span-12 md:mx-3 mx-0 my-3'>
                                                                <div className='flex text-sm font-medium mb-2'>
                                                                    <label className='mr-2' htmlFor="phone">Mobile Number</label>
                                                                    <ErrorMessage name="phone" component="div" className="text-red-500" />
                                                                </div>
                                                                <Field name="phone" type="text" className="input border-[1px] py-2 px-3 w-full rounded-md outline-[#029D79]" />
                                                            </div>
                                                            <div className='col-span-12 md:mx-3 mx-0 my-3'>
                                                                <div className='flex text-sm font-medium mb-2'>
                                                                    <label className='mr-2' htmlFor="email">{newName} Email</label>
                                                                    <ErrorMessage name="email" component="div" className="text-red-500" />
                                                                </div>
                                                                <Field name="email" type="email" className="input border-[1px] py-2 px-3 w-full rounded-md outline-[#029D79]" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className='flex justify-between my-10'>
                                                        <button type="botton" onClick={() => setIsFlag(1)} className='bg-[#F4F5FA] lg:px-20 px-10 py-3 rounded-md text-black'>Back</button>
                                                        <button type="button" onClick={() => setIsFlag(3)} className='bg-[#EA5F5F] lg:px-20 px-10 py-3 rounded-md text-white'>Next</button>
                                                    </div>
                                                </Form>
                                            )}
                                        </Formik>
                                    </>
                                    :
                                    <>
                                        <div className='my-10'>
                                            <h1 className='text-lg font-medium'>Make sure you have the following ready</h1>
                                            <div>
                                                <div className='flex items-center my-4'>
                                                    <img src={tick} className='w-5' alt="" />
                                                    <p className='ms-3'>Practice Council Registration Document</p>
                                                </div>
                                                <div className='flex items-center my-4'>
                                                    <img src={tick} className='w-5' alt="" />
                                                    <p className='ms-3'>National Identity Document</p>
                                                </div>
                                                <div className='flex items-center my-4'>
                                                    <img src={tick} className='w-5' alt="" />
                                                    <p className='ms-3'>Lifesaving Certificate</p>
                                                </div>
                                                <div className='flex items-center my-4'>
                                                    <img src={tick} className='w-5' alt="" />
                                                    <p className='ms-3'>Police Clearance</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <div className='my-6'>
                                                <h1 className='text-lg font-medium'>Practice Council Registration Document</h1>
                                                <div className='flex items-center border-2 border-dashed md:p-7 p-3 my-3'>
                                                    <img src={pdfimage} className='md:w-16 md:h-16 w-12 h-12 rounded-full' alt="" />
                                                    <div className='ms-4'>
                                                        <p className='font-medium md:text-base text-sm mb-2'>Drop your document or browse your computer</p>
                                                        <p className='font-medium text-gray-400 md:text-base text-sm'>JPEG or PNG only - 4MB max</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='my-6'>
                                                <h1 className='text-lg font-medium'>National Identity Document</h1>
                                                <div className='flex items-center border-2 border-dashed md:p-7 p-3 my-3'>
                                                    <img src={pdfimage} className='md:w-16 md:h-16 w-12 h-12 rounded-full' alt="" />
                                                    <div className='ms-4'>
                                                        <p className='font-medium md:text-base text-sm mb-2'>Drop your document or browse your computer</p>
                                                        <p className='font-medium text-gray-400 md:text-base text-sm'>JPEG or PNG only - 4MB max</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='my-6'>
                                                <h1 className='text-lg font-medium'>Lifesaving Certifcate</h1>
                                                <div className='flex items-center border-2 border-dashed md:p-7 p-3 my-3'>
                                                    <img src={pdfimage} className='md:w-16 md:h-16 w-12 h-12 rounded-full' alt="" />
                                                    <div className='ms-4'>
                                                        <p className='font-medium md:text-base text-sm mb-2'>Drop your document or browse your computer</p>
                                                        <p className='font-medium text-gray-400 md:text-base text-sm'>JPEG or PNG only - 4MB max</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='my-6'>
                                                <h1 className='text-lg font-medium'>Police Clearance</h1>
                                                <div className='flex items-center border-2 border-dashed md:p-7 p-3 my-3'>
                                                    <img src={pdfimage} className='md:w-16 md:h-16 w-12 h-12 rounded-full' alt="" />
                                                    <div className='ms-4'>
                                                        <p className='font-medium md:text-base text-sm mb-2'>Drop your document or browse your computer</p>
                                                        <p className='font-medium text-gray-400 md:text-base text-sm'>JPEG or PNG only - 4MB max</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='flex justify-between my-10'>
                                            <button onClick={() => setIsFlag(2)} className='bg-[#F4F5FA] lg:px-20 px-10 py-3 rounded-md text-black'>Back</button>
                                            <button onClick={() => { navigate("/welo_admin/healthworker_confirmed") }} className='bg-[#EA5F5F] lg:px-20 sm:px-7 px-3 py-3 rounded-md text-white'>Submit</button>
                                        </div>
                                    </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WorkerForm