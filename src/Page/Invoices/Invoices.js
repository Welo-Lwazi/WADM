import React, { useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import views from "../../Assets/Image/corporate/view.png"
import FormSelect from '../../Base-Component/FormSelect/FormSelect'
import search from "../../Assets/Image/corporate/Search.png"
import nodata from "../../Assets/Image/corporate/nodata.png"
import men1 from "../../Assets/Image/admin/men11.png"

function Invoices() {
  const location = useLocation()
  const navigate = useNavigate()
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const [searchData, setSearchData] = useState("")
  const [pageNo, setPageNo] = useState(1)
  const [totalPage, setTotalPage] = useState(3)
  const [handelSelect, setHandleSelect] = useState("")
  const [handelSelectDate, setHandleSelectDate] = useState("")

  const [userData, setUserData] = useState([
    {
      id: "#61",
      date: "14 Mar, 2024",
      image: men1,
      name: "Cameron Williamson",
      service: "Health screening, Mental health clinic",
      total_employee: "206",
      amount: "R1200.00",
    },
    {
      id: "#62",
      date: "14 Mar, 2024",
      image: men1,
      name: "Cameron Williamson",
      service: "Health screening, Mental health clinic",
      total_employee: "206",
      amount: "R1200.00",
    },
    {
      id: "#63",
      date: "14 Mar, 2024",
      image: men1,
      name: "Cameron Williamson",
      service: "Health screening, Mental health clinic",
      total_employee: "206",
      amount: "R1200.00",
    },
    {
      id: "#64",
      date: "14 Mar, 2024",
      image: men1,
      name: "Cameron Williamson",
      service: "Health screening, Mental health clinic",
      total_employee: "206",
      amount: "R1200.00",
    },
    {
      id: "#65",
      date: "14 Mar, 2024",
      image: men1,
      name: "Cameron Williamson",
      service: "Health screening, Mental health clinic",
      total_employee: "206",
      amount: "R1200.00",
    },
    {
      id: "#66",
      date: "14 Mar, 2024",
      image: men1,
      name: "Cameron Williamson",
      service: "Health screening, Mental health clinic",
      total_employee: "206",
      amount: "R1200.00",
    },
    {
      id: "#67",
      date: "14 Mar, 2024",
      image: men1,
      name: "Cameron Williamson",
      service: "Health screening, Mental health clinic",
      total_employee: "206",
      amount: "R1200.00",
    },
    {
      id: "#68",
      date: "14 Mar, 2024",
      image: men1,
      name: "Cameron Williamson",
      service: "Health screening, Mental health clinic",
      total_employee: "206",
      amount: "R1200.00",
    },
    {
      id: "#69",
      date: "14 Mar, 2024",
      image: men1,
      name: "Cameron Williamson",
      service: "Health screening, Mental health clinic",
      total_employee: "206",
      amount: "R1200.00",
    },
  ])

  const renderPaginationButtonss = () => {
    const maxPagesToShow = 3;
    const buttons = [];
    const startPage = Math.max(1, pageNo - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPage, startPage + maxPagesToShow - 1);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={i === pageNo ? 'px-4 py-[7px] mx-1 bg-[#EA5F5F1A] rounded-md text-[#EA5F5F]' : 'px-4 py-[7px] mx-1 text-[#EA5F5F]'}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  const handlePageChange = (page) => {
    setPageNo(page);
  }

  const handleView = () => {
    navigate('/welo_admin/invoices/invoice_details')
  }

  const startDragging = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    document.body.style.userSelect = 'none';
  };

  const stopDragging = () => {
    setIsDragging(false);
    document.body.style.userSelect = '';
  };

  const onDragging = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <>
      <div className='grid grid-cols-12 gap-2 md:m-4 m-1 fontNew'>
        <div className="col-span-12">
          <div className='flex flex-wrap justify-between items-center'>
            <h1 className='text-2xl font-semibold sm:mb-0 mb-3'>Invoices</h1>
            <div className='flex sm:w-70 w-full h-10 px-4 rounded-xl bg-white items-center'>
              <input
                type="text"
                required
                className='bg-transparent border-none outline-none sm:w-70 w-full h-10 text-sm fontNew'
                placeholder='Search...'
                name='search_text'
                value={searchData}
                onChange={(e) => setSearchData(e.target.value)}
              />
              <img src={search} className='p-2 w-10 cursor-pointer' alt="" />
            </div>
          </div>
        </div>
        {
          userData == "" ?
            <div className='col-span-12 h-[50vh] justify-center flex items-center'>
              <img src={nodata} className='w-28' alt="" />
            </div>
            :
            <>
              <div className='col-span-12 overflow-auto'>
                <div
                  className='w-full overflow-auto'
                  onMouseDown={startDragging}
                  onMouseLeave={stopDragging}
                  onMouseUp={stopDragging}
                  onMouseMove={onDragging}
                  ref={scrollRef}
                >
                  <table className='w-full border-separate border-spacing-y-3'>
                    <tr className='bg-white'>
                      <th className='py-4 px-3 text-base font-medium whitespace-nowrap text-start first:rounded-l-lg last:rounded-r-lg'>
                        <FormSelect id="page" name="page_no" className="selects-arrow-hidden outline-none w-24 text-base" value={handelSelectDate} onChange={(e) => setHandleSelectDate(e.target.value)}>
                          <option value="5">Date</option>
                          <option value="10">10</option>
                          <option value="15">15</option>
                        </FormSelect>
                      </th>
                      <th className='py-4 px-3 text-base font-medium whitespace-nowrap text-start first:rounded-l-lg last:rounded-r-lg'>Name</th>
                      <th className='py-4 px-3 text-base font-medium whitespace-nowrap text-start first:rounded-l-lg last:rounded-r-lg'>Service</th>
                      <th className='py-4 px-3 text-base font-medium whitespace-nowrap text-start first:rounded-l-lg last:rounded-r-lg'>Total Emp.</th>
                      <th className='py-4 px-3 text-base font-medium whitespace-nowrap text-start first:rounded-l-lg last:rounded-r-lg'>Amount</th>
                      <th className='py-4 px-3 text-base font-medium whitespace-nowrap text-start first:rounded-l-lg last:rounded-r-lg'>Action</th>
                    </tr>
                    {
                      userData.map((item, index) => {
                        return (
                          <tr key={index}
                            className='font-medium bg-white'
                          >
                            <td className='text-start p-4 first:rounded-l-lg last:rounded-r-lg'>
                              <div className='whitespace-nowrap'>
                                {item.date}
                              </div>
                            </td>
                            <td className='text-start p-4 first:rounded-l-lg last:rounded-r-lg'>
                              <div className='lg:whitespace-normal whitespace-nowrap lg:w-auto w-52 flex items-center'>
                                <img src={item.image} className='w-10' alt="" />
                                <p className='text-base ms-3'>{item.name}</p>
                              </div>
                            </td>
                            <td className='text-start p-4 first:rounded-l-lg last:rounded-r-lg'>
                              <div className='lg:whitespace-normal whitespace-nowrap'>
                                {item.service}
                              </div>
                            </td>
                            <td className='text-start p-4 first:rounded-l-lg last:rounded-r-lg'>
                              <div className='lg:whitespace-normal whitespace-nowrap'>
                                {item.total_employee}
                              </div>
                            </td>
                            <td className='text-start p-4 first:rounded-l-lg last:rounded-r-lg'>
                              <div className='lg:whitespace-normal whitespace-nowrap'>
                                {item.amount}
                              </div>
                            </td>
                            <td className='text-start p-4 first:rounded-l-lg last:rounded-r-lg'>
                              <div className='cursor-pointer' onClick={() => handleView()}>
                                <img src={views} className='lg:w-9 w-8' alt="" />
                              </div>
                            </td>
                          </tr>
                        )
                      })
                    }
                  </table>
                </div>
              </div>
              <div className='col-span-12 flex flex-wrap items-center sm:justify-between justify-center bg-white py-4 sm:px-8 px-0 rounded-lg'>
                <div className='flex items-center'>
                  <p>Show Result</p>
                  <div>
                    <FormSelect id="page" name="page_no" className="outline-none px-2 ms-3" value={handelSelect} onChange={(e) => setHandleSelect(e.target.value)}>
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="15">15</option>
                    </FormSelect>
                  </div>
                </div>
                <div className='flex items-center cursor-pointer'>
                  <p onClick={() => handlePageChange(pageNo - 1)} disabled={pageNo === 1}>
                    Previous
                  </p>
                  <div className="flex items-center mx-6">
                    {renderPaginationButtonss()}
                  </div>
                  <p onClick={() => handlePageChange(pageNo + 1)} disabled={pageNo === totalPage}>
                    Next
                  </p>
                </div>
              </div>
            </>
        }
      </div>
    </>
  )
}

export default Invoices