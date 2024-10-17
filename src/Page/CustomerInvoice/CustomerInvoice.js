import React, { useState } from 'react'
import back from "../../Assets/Image/corporate/back.png";
import { useLocation, useNavigate } from 'react-router-dom';
import welo from "../../Assets/Image/sidebar/welo.png"

function CustomerInvoice() {
    const navigate = useNavigate()
    const location = useLocation()

    const [userData, setUserData] = useState([
        {
            service_name: "Health Screening",
            per_person: "R100",
            persons: "20",
            total: "R2000.00",
        },
        {
            service_name: "Health Screening",
            per_person: "R100",
            persons: "20",
            total: "R2000.00",
        },
    ])

    let newData;
    try {
        const { Data } = location.state;
        newData = Data
    } catch (error) {
        console.log("err")
    }

    const handleBack = (data) => {
        navigate("/welo_admin/customers/customer_details", { state: { Data: data } })
    }

    return (
        <div className='m-4'>
            <div className='flex items-center cursor-pointer fontNew my-4'>
                <img src={back} onClick={() => handleBack(newData)} className='w-4' alt="" />
                <p onClick={() => handleBack(newData)} className='text-base font-medium ms-3'>Go back</p>
            </div>

            <div className="grid grid-cols-12 fontNew">
                <div className="2xl:col-span-8 xl:col-span-10 lg:col-span-12 col-span-12 bg-white px-8 py-10 rounded-lg">
                    <h1 className='text-2xl font-medium'>Invoice: Devin Technology</h1>
                    <div className='flex items-center justify-between my-10'>
                        <div className='flex items-center'>
                            <div>
                                <p className='text-gray-500 mb-2'>Invoice ID:</p>
                                <p className='font-medium'>#452102154</p>
                            </div>
                            <div className='ms-24'>
                                <p className='text-gray-500 mb-2'>Invoice Date:</p>
                                <p className='font-medium'>14 Mar, 2024</p>
                            </div>
                        </div>
                        <div>
                            <img src={welo} className='w-40' alt="" />
                        </div>
                    </div>
                    <div className='pb-4'>
                        <table className='w-full border-separate border-spacing-y-3'>
                            <tr className='bg-[#F4F5FA]'>
                                <th className='py-4 px-3 text-base font-medium whitespace-nowrap text-start first:rounded-l-lg last:rounded-r-lg'>No.</th>
                                <th className='py-4 px-3 text-base font-medium whitespace-nowrap text-start first:rounded-l-lg last:rounded-r-lg'>Service Name</th>
                                <th className='py-4 px-3 text-base font-medium whitespace-nowrap text-start first:rounded-l-lg last:rounded-r-lg'>Per Person</th>
                                <th className='py-4 px-3 text-base font-medium whitespace-nowrap text-start first:rounded-l-lg last:rounded-r-lg'>Persons</th>
                                <th className='py-4 px-3 text-base font-medium whitespace-nowrap text-start first:rounded-l-lg last:rounded-r-lg'>Total</th>
                            </tr>
                            {
                                userData.map((item, index) => {
                                    return (
                                        <tr key={index} className='bg-white font-medium text-gray-500'>
                                            <td className='text-start p-4 first:rounded-l-lg last:rounded-r-lg'>
                                                <div className='whitespace-nowrap'>
                                                    {index + 1}
                                                </div>
                                            </td>
                                            <td className='text-start p-4 first:rounded-l-lg last:rounded-r-lg'>
                                                <div className='whitespace-nowrap'>
                                                    {item.service_name}
                                                </div>
                                            </td>
                                            <td className='text-start p-4 first:rounded-l-lg last:rounded-r-lg'>
                                                <div className='whitespace-nowrap'>
                                                    {item.per_person}
                                                </div>
                                            </td>
                                            <td className='text-start p-4 first:rounded-l-lg last:rounded-r-lg'>
                                                <div className='whitespace-nowrap'>
                                                    {item.persons}
                                                </div>
                                            </td>
                                            <td className='text-start p-4 first:rounded-l-lg last:rounded-r-lg'>
                                                <div className='whitespace-nowrap'>
                                                    {item.total}
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </table>
                    </div>
                    <div className='flex justify-end py-10 border-y-2 border-gray-100'>
                        <div className='flex items-center'>
                            <div className='mr-20'>
                                <p className='text-gray-500 font-medium mb-2'>Subtotal</p>
                                <p className='text-[#0CAB2F] text-lg font-medium'>Total</p>
                            </div>
                            <div>
                                <p className='text-gray-500 font-medium mb-2'>R4000.00</p>
                                <p className='text-[#0CAB2F] text-lg font-medium'>R4000.00</p>
                            </div>
                        </div>
                    </div>
                    <div className='border-b-2 border-gray-100 text-sm text-gray-400'>
                        <p className='my-10'>
                            <span className='font-medium'>NOTE:</span> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </p>
                        <p className='my-10'>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
                        </p>
                    </div>
                    <div className='flex items-center justify-between mt-10'>
                        <div>
                            <p className='text-gray-500 mb-2 text-sm'>Email:</p>
                            <p className='font-medium'>support@welo.com</p>
                        </div>
                        <div className='ms-24'>
                            <p className='text-gray-500 mb-2 text-sm'>For Inquiry:</p>
                            <p className='font-medium'>+1234567890</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerInvoice