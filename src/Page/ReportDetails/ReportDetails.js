import React, { useEffect, useState } from 'react'
import users from "../../Assets/Image/corporate/user.png"
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { addMedicalCheckup, getDiseases, getRequestDetails, listAllCompany } from '../../Services/ApiServices';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import FormSelect from '../../Base-Component/FormSelect/FormSelect';
import { Circles } from 'react-loader-spinner';
import { newName } from '../../Services/Api';

function MedicalForm() {

    const navigate = useNavigate()
    const location = useLocation()

    const [loader, setLoader] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    const [requestInfo, setRequestInfo] = useState({})
    const [requestEmployee, setRequestEmployee] = useState({})
    const [requestDies, setRequestDies] = useState({})
    const [requestFamily, setRequestFamily] = useState([])
    const [requestPerson, setRequestPerson] = useState([])

    const { id } = useParams()

    useEffect(() => {
        console.log("requestFamily ??", requestFamily)
        console.log("requestPerson ??", requestPerson)
    }, [requestFamily, requestPerson])


    const handleListRequest = () => {
        let obj = { requestEmployeeId: id };
        getRequestDetails(obj)
            .then((res) => {
                if (res.status == 200) {
                    const data = res.data.info;
                    const type = data?.medicalCertificate?.medicalHistories || [];

                    setRequestInfo(data);
                    setRequestEmployee(data.User);
                    setRequestDies(data.medicalCertificate);

                    const family = [];
                    const person = [];

                    for (let i = 0; i < type.length; i++) {
                        console.log("dieses >>", type[i].Disease);
                        if (type[i].Disease?.diseaseType === "FAMILY") {
                            family.push(type[i]);
                        } else {
                            person.push(type[i]);
                        }
                    }

                    setRequestFamily(family);
                    setRequestPerson(person);
                }
            })
            .catch((err) => {
                if (err.response?.status === 401) {
                    localStorage.removeItem("welo_admin_token");
                    navigate("/welo_admin/login");
                } else {
                    toast.error(err.response?.data?.message);
                }
            });
    };

    useEffect(() => {
        handleListRequest()
    }, [])



    return (
        <div className='fontNew'>
            <div className='bg-[#00042C] text-white h-[350px] w-full text-center'>
                <div className='py-20'>
                    <h1 className='2xl:text-[34px] xl:text-3xl text-2xl'>Occupational Medical Fitness Certificate</h1>
                    <p className='2xl:text-lg text-base mt-2'>Medical Form</p>
                </div>
            </div>
            <div className='flex justify-center bg-white -mt-32 2xl:mx-40 xl:mx-28 lg:mx-24 mx-6'>
                <div className='md:my-10 my-5 w-full'>

                    <div className="space-y-6 mx-10">
                        <div className='grid grid-cols-12 gap-6'>
                            <div className='col-span-12'>
                                <div className='flex text-sm font-medium mb-2'>
                                    <label className='mr-2' htmlFor="employeeId">{newName} ID No. :</label>
                                </div>
                                <div className='font-medium text-base'>
                                    {requestInfo.employeeId || ""}
                                </div>
                            </div>
                            <div className='col-span-6'>
                                <div className='flex text-sm font-medium mb-2'>
                                    <label className='mr-2' htmlFor="firstName">{newName}'s First Name :</label>
                                </div>
                                <div className='font-medium text-base'>
                                    {requestEmployee.firstName || ""}
                                </div>
                            </div>
                            <div className='col-span-6'>
                                <div className='flex text-sm font-medium mb-2'>
                                    <label className='mr-2' htmlFor="lastName">{newName}'s Last Name :</label>
                                </div>
                                <div className='font-medium text-base'>
                                    {requestEmployee.lastName || ""}
                                </div>
                            </div>
                            <div className='col-span-6'>
                                <div className='flex text-sm font-medium mb-2'>
                                    <label className='mr-2' htmlFor="jobTitle">{newName} Job Title :</label>
                                </div>
                                <div className='font-medium text-base'>
                                    {requestEmployee.employeeJobTitle || ""}
                                </div>
                            </div>
                            <div className='col-span-6'>
                                <div className='flex text-sm font-medium mb-2'>
                                    <label className='mr-2' htmlFor="employeeNumber">Employment Number :</label>
                                </div>
                                <div className='font-medium text-base'>
                                    {requestEmployee.employeeNo || ""}
                                </div>
                            </div>
                            <div className='col-span-6'>
                                <div className='flex text-sm font-medium mb-2'>
                                    <label className='mr-2' htmlFor="phone">{newName} Phone No. :</label>
                                </div>
                                <div className='font-medium text-base'>
                                    {requestEmployee.countryCode || ""} {requestEmployee.phoneNumber || ""}
                                </div>
                            </div>
                            <div className='col-span-6'>
                                <div className='flex text-sm font-medium mb-2'>
                                    <label className='mr-2' htmlFor="email">{newName} Email :</label>
                                </div>
                                <div className='font-medium text-base'>
                                    {requestEmployee.emailId || ""}
                                </div>
                            </div>


                            <div className='col-span-12 py-5 mt-2 border-t-2 border-gray-100'>
                                <h1 className='text-xl font-medium'>Medical History (Family)</h1>
                            </div>
                            {
                                requestFamily.map((item, index) => {
                                    let disease = item.Disease
                                    return (
                                        <div key={index} role="group" aria-labelledby="my-radio-group" className="col-span-3 m-2">
                                            <div className='flex text-sm font-medium mb-2'>
                                                <label className='text-[#565656]' htmlFor="jobs">{disease.diseaseName}</label>
                                            </div>
                                            <div className='flex py-1 font-medium'>
                                                {
                                                    item.isValue == "YES" ?
                                                        "Yes" : "No"
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }

                            <div className='col-span-12 py-5 mt-2 border-t-2 border-gray-100'>
                                <h1 className='text-xl font-medium'>Medical History (Personal)</h1>
                            </div>

                            {
                                requestPerson.map((item, index) => {
                                    let disease = item.Disease
                                    return (
                                        <div key={index} role="group" aria-labelledby="my-radio-group" className="col-span-3 m-2">
                                            <div className='flex text-sm font-medium mb-2'>
                                                <label className='text-[#565656]' htmlFor="jobs">{disease.diseaseName}</label>
                                            </div>
                                            <div className='flex py-1 font-medium'>
                                                {
                                                    item.isValue == "YES" ?
                                                        "Yes" : "No"
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MedicalForm