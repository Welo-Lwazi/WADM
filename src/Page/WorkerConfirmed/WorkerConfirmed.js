import React, { useEffect, useState } from 'react'
import Lottie from 'react-lottie';
import * as animationData from '../../Assets/jsonfile/Animation.json'
import { useNavigate } from 'react-router-dom';

function WorkerConfirmed() {

    const navigate = useNavigate()

    const [isStopped, setIsStopped] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsStopped(true)
        }, 3000);
    })

    const defaultOptions = {
        loop: isStopped,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
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
                    <div className='2xl:w-[624px] xl:w-[521px] lg:w-[421px] md:w-[421px] w-full lg:mx-0 mx-5 text-center'>
                        <div className='flex justify-center'>
                            <Lottie options={defaultOptions}
                                height={250}
                                width={250}
                            />
                        </div>
                        <h1 className='xl:text-3xl lg:text-2xl text-lg font-semibold'>Submission successful</h1>
                        <div className='my-10 text-[#7E7E7E]'>
                            <p>We have received your application, thank you.</p>
                            <p className='my-7'>Our team will review your documents within the next 48 hours and  contact you via email. We might request interviews or further assessments as part of the vetting process. </p>
                            <p>If your application is successful, we will send you an email with log in <br /> details for your Welo dashboard.</p>
                        </div>

                        <div className='flex justify-center my-10'>
                            <button onClick={() => { navigate("/welo_admin/healthworkers") }} className='bg-[#14151E] px-28 py-3 rounded-md text-white'>Finish</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WorkerConfirmed