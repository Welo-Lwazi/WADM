import React, { useState } from 'react'
import edit from "../../Assets/Image/corporate/edit.png"
import deletes from "../../Assets/Image/corporate/delete.png"
import Dialog from '../../Base-Component/Dialog/Dialog'
import { useNavigate } from 'react-router-dom'

function FAQs() {

  const navigate = useNavigate()
  const [isModalOpens, setModalOpens] = useState(false)
  const [isSelect, setIsSelect] = useState(0)
  const [isDelete, setIsDelete] = useState(false)

  const faqData = [
    {
      question: 'How do I update my availability for appointments?',
      answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam harum autem temporibus blanditiis ipsa in, asperiores eos quam maxime commodi molestias facilis fugit illo cupiditate eveniet quidem culpa! Nisi, voluptatibus?',
    },
    {
      question: 'What should I do if I need to reschedule an upcoming appointment?',
      answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam harum autem temporibus blanditiis ipsa in, asperiores eos quam maxime commodi molestias facilis fugit illo cupiditate eveniet quidem culpa! Nisi, voluptatibus?',
    },
    {
      question: 'Can I view the full medical history of my clients?',
      answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam harum autem temporibus blanditiis ipsa in, asperiores eos quam maxime commodi molestias facilis fugit illo cupiditate eveniet quidem culpa! Nisi, voluptatibus?',
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("successfully")
  }

  return (
    <>
      <div className='md:m-4 m-1 fontNew'>
        <div className='bg-white py-4 sm:px-8 px-3 rounded-lg'>
          <div className='flex items-center justify-between border-b-2 pb-6 border-dashed'>
            <h1 className='text-2xl font-semibold'>FAQs</h1>
            <button onClick={() => setModalOpens(true)} type="submit" className="btn-primary bg-[#EA5F5F] w-[150px] py-2 mt-2 rounded-lg text-white text-base">
              Add FAQs
            </button>
          </div>
          <div className='mt-3'>
            {faqData.map((faq, index) => (
              <div className='py-4 border-b-2 border-[#e9e9e985]' key={index}>
                <div>
                  <>
                    <div className="group flex sm:flex-nowrap flex-wrap-reverse w-full items-center justify-between">
                      <span className="text-lg text-start font-medium text-black">
                        {faq.question}
                      </span>
                      <div className='flex items-center sm:justify-start justify-end sm:w-auto w-full'>
                        <img onClick={() => setModalOpens(true)} src={edit} className='lg:w-9 w-8 mr-4 cursor-pointer' alt="Edit" />
                        <img onClick={() => setIsDelete(true)} src={deletes} className='lg:w-9 w-8 cursor-pointer' alt="Delete" />
                      </div>
                    </div>
                    <div className="mt-2 text-base text-[#6C6E73]">
                      {faq.answer}
                    </div>
                  </>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Dialog
        open={isModalOpens}
        onClose={() => setModalOpens(false)}
        size='xxl'
      >
        <Dialog.Panel>
          <Dialog.Description className="rounded-none border-2 border-white sm:w-auto w-[330px]">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-12 fontNew md:px-[30px] px-[10px] bg-white overflow-auto">
                <div className="col-span-12 py-4">
                  <h1 className=' text-xl font-medium'>Add FAQs</h1>
                </div>
                <div className="col-span-12">
                  <div className='sm:flex block items-center my-3'>
                    <h1 onClick={() => setIsSelect(0)} className={`${isSelect == 0 ? "text-[#EA5F5F] underline" : "text-[#404144]"} cursor-pointer font-medium`}>For corporate clients</h1>
                    <h1 onClick={() => setIsSelect(1)} className={`${isSelect == 1 ? "text-[#EA5F5F] underline" : "text-[#404144]"} cursor-pointer font-medium sm:mx-7 mx-0 sm:my-0 my-3`}>For healthcare workers</h1>
                    <h1 onClick={() => setIsSelect(2)} className={`${isSelect == 2 ? "text-[#EA5F5F] underline" : "text-[#404144]"} cursor-pointer font-medium`}>Both</h1>
                  </div>
                </div>
                <div className='col-span-12 my-4'>
                  <p className='text-sm font-medium mb-3'>Question</p>
                  <input type="text" required className='border-2 px-4 py-3 rounded-[12px] w-full outline-[#00987C]' placeholder='Enter Question' />
                </div>
                <div className='col-span-12 mt-4'>
                  <p className='text-sm font-medium mb-3'>Answer</p>
                  <textarea name="" required rows={5} placeholder='Enter Answer' className='w-full outline-[#00987C] py-3 px-4 border-2 rounded-[12px]' id=""></textarea>
                </div>
                <div className="col-span-12 flex sm:justify-end justify-center items-center my-4">
                  <div onClick={() => setModalOpens(false)} className="cursor-pointer bg-[#e42323] sm:px-14 px-12 py-3 mt-2 mr-3 rounded-lg text-[#fff] text-sm">
                    Close
                  </div>
                  <button type="submit" className="btn btn-primary bg-[#00987C] sm:px-14 px-12 py-3 mt-2 mr-3 rounded-lg text-white text-sm">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </Dialog.Description>
        </Dialog.Panel>
      </Dialog>

      <Dialog
        open={isDelete}
        onClose={() => setIsDelete(false)}
        size="2xl"
      >
        <Dialog.Panel>
          <Dialog.Description className="rounded-none border-2 border-white">
            <div className='flex justify-center text-center my-4 px-16 fontNew'>
              <div>
                <h1 className='text-xl font-semibold text-black mt-6'>Delete FAQs?</h1>
                <p className='text-base text-gray-500 my-3'>Are you sure want to delete this FAQ?</p>
                <div className='flex mt-10 mb-5 flex items-center'>
                  <button className='bg-[#F4F5FA] py-[14px] sm:w-36 w-30 text-sm rounded-xl sm:mx-3 mx-2' onClick={() => setIsDelete(false)}>Close</button>
                  <button className='bg-[#EA5F5F] py-[14px] sm:w-36 w-30 text-sm rounded-xl sm:mx-3 mx-2 text-white' onClick={() => setIsDelete(false)}>Yes, Delete</button>
                </div>
              </div>
            </div>
          </Dialog.Description>
        </Dialog.Panel>
      </Dialog>
    </>
  )
}

export default FAQs