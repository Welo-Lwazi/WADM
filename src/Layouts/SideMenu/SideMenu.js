import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import welo from "../../Assets/Image/sidebar/welo.png"
import dash from "../../Assets/Image/sidebar/dashboard.png"
import dash1 from "../../Assets/Image/sidebar/dashboard1.png"
import clipboard from "../../Assets/Image/sidebar/clipboard-text.png"
import clipboard1 from "../../Assets/Image/sidebar/clipboard-text1.png"
import receipt from "../../Assets/Image/sidebar/receipt-text.png"
import receipt1 from "../../Assets/Image/sidebar/receipt-text1.png"
import setting from "../../Assets/Image/sidebar/setting.png"
import setting1 from "../../Assets/Image/sidebar/setting1.png"
import chart from "../../Assets/Image/sidebar/chart.png"
import chart1 from "../../Assets/Image/sidebar/chart1.png"
import usersquare from "../../Assets/Image/sidebar/user-square.png"
import usersquare1 from "../../Assets/Image/sidebar/user-square1.png"
import messages from "../../Assets/Image/sidebar/messages.png"
import messages1 from "../../Assets/Image/sidebar/messages1.png"
import doller from "../../Assets/Image/sidebar/dollar-square.png"
import doller1 from "../../Assets/Image/sidebar/dollar-square1.png"
import services from "../../Assets/Image/sidebar/archive-book.png"
import services1 from "../../Assets/Image/sidebar/archive-book1.png"
import health from "../../Assets/Image/sidebar/health.png"
import health1 from "../../Assets/Image/sidebar/health1.png"
import key from "../../Assets/Image/sidebar/key-square.png"
import key1 from "../../Assets/Image/sidebar/key-square1.png"
import graph from "../../Assets/Image/sidebar/Graph.png"
import graph1 from "../../Assets/Image/sidebar/Graph1.png"
import out from "../../Assets/Image/corporate/out 01.png"
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Dialog from "../../Base-Component/Dialog/Dialog";
import { Socket } from "../../Assets/Socket/Socket";

const SideMenu = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const [isLogOut, setIsLogOut] = useState(false);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  const [adminData, setAdminData] = useState({});

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("Admin"));
    if (admin) {
      setAdminData(admin);
    }
  }, []);

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  const handleLeftRoom = () => {
    const chat = JSON.parse(localStorage.getItem("AdminChat"))

    if (chat) {
      Socket.emit("left_room", {
        userId: chat.userId,
        chatId: chat.chatId,
      })
      localStorage.removeItem("AdminChat")
    }
  }

  return (
    <>
      <aside
        ref={sidebar}
        className={`absolute left-0 top-0 z-99 flex h-screen w-72 flex-col overflow-y-hidden duration-300 ease-linear dark:bg-boxdark 2xl:static xl:static lg:static 2xl:translate-x-0 xl:translate-x-0 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        style={{ backgroundColor: "#fff" }}
      >
        <div className="flex items-center justify-center">
          <div onClick={() => { navigate("/welo_admin") }} className='py-3 ms-10'>
            <img src={welo} className='w-40 rounded-full' alt="" />
          </div>
          <div className="ms-8">
            <button
              ref={trigger}
              onClick={() => { setSidebarOpen(!sidebarOpen); handleLeftRoom() }}
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              className="lg:hidden block"
            >
              <svg
                className="fill-current"
                width="20"
                height="18"
                viewBox="0 0 20 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                  fill=""
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="no-scrollbar flex flex-col justify-between overflow-y-auto duration-300 ease-linear h-full px-10 py-3">
          <div className="flex justify-start">
            <div>
              <Link to={"/welo_admin/dashboard"} onClick={() => { setSidebarOpen(!sidebarOpen); handleLeftRoom() }} >
                <span className={location.pathname == "/welo_admin/dashboard" ? "flex items-center bg-[#EA5F5F] w-48 py-3 px-4 rounded-xl my-5" : "my-5 flex items-center w-48 py-3 px-4"}>
                  <img src={location.pathname == "/welo_admin/dashboard" ? dash1 : dash} className="w-6" alt="" />
                  <p className={location.pathname == "/welo_admin/dashboard" ? "text-[#fff] ms-3 fontNew font-medium" : "text-[#4B4B4B] ms-3 fontNew font-medium"}>Dashboard</p>
                </span>
              </Link>
              <Link to={"/welo_admin/requests"} onClick={() => { setSidebarOpen(!sidebarOpen); handleLeftRoom() }} >
                <span className={location.pathname == "/welo_admin/requests" || location.pathname == "/welo_admin/requests/requests_details" ? "flex items-center bg-[#EA5F5F] w-48 py-3 px-4 rounded-xl my-5" : "my-5 flex items-center w-48 py-3 px-4"}>
                  <img src={location.pathname == "/welo_admin/requests" || location.pathname == "/welo_admin/requests/requests_details" ? clipboard1 : clipboard} className="w-6" alt="" />
                  <p className={location.pathname == "/welo_admin/requests" || location.pathname == "/welo_admin/requests/requests_details" ? "text-[#fff] ms-3 fontNew font-medium" : "text-[#4B4B4B] ms-3 fontNew font-medium"}>Requests</p>
                </span>
              </Link>
              <Link to={"/welo_admin/customers"} onClick={() => { setSidebarOpen(!sidebarOpen); handleLeftRoom() }} >
                <span className={location.pathname == "/welo_admin/customers" || location.pathname == "/welo_admin/customers/customer_details" || location.pathname == "/welo_admin/customers/employee_details" ? "flex items-center bg-[#EA5F5F] w-48 py-3 px-4 rounded-xl my-5" : "my-5 flex items-center w-48 py-3 px-4"}>
                  <img src={location.pathname == "/welo_admin/customers" || location.pathname == "/welo_admin/customers/customer_details" || location.pathname == "/welo_admin/customers/employee_details" ? chart1 : chart} className="w-6" alt="" />
                  <p className={location.pathname == "/welo_admin/customers" || location.pathname == "/welo_admin/customers/customer_details" || location.pathname == "/welo_admin/customers/employee_details" ? "text-[#fff] ms-3 fontNew font-medium" : "text-[#4B4B4B] ms-3 fontNew font-medium"}>Customers</p>
                </span>
              </Link>
              <Link to={"/welo_admin/healthworkers"} onClick={() => { setSidebarOpen(!sidebarOpen); handleLeftRoom() }} >
                <span className={location.pathname == "/welo_admin/healthworkers" || location.pathname == "/welo_admin/healthworkers/healthworker_details" ? "flex items-center bg-[#EA5F5F] w-48 py-3 px-4 rounded-xl my-5" : "my-5 flex items-center w-48 py-3 px-4"}>
                  <img src={location.pathname == "/welo_admin/healthworkers" || location.pathname == "/welo_admin/healthworkers/healthworker_details" ? usersquare1 : usersquare} className="w-6" alt="" />
                  <p className={location.pathname == "/welo_admin/healthworkers" || location.pathname == "/welo_admin/healthworkers/healthworker_details" ? "text-[#fff] ms-3 fontNew font-medium" : "text-[#4B4B4B] ms-3 fontNew font-medium"}>Healthworkers</p>
                </span>
              </Link>
              <Link to={"/welo_admin/messages"} onClick={() => { setSidebarOpen(!sidebarOpen); handleLeftRoom() }} >
                <span className={location.pathname == "/welo_admin/messages" ? "flex items-center bg-[#EA5F5F] w-48 py-3 px-4 rounded-xl my-5" : "my-5 flex items-center w-48 py-3 px-4"}>
                  <img src={location.pathname == "/welo_admin/messages" ? messages1 : messages} className="w-6" alt="" />
                  <p className={location.pathname == "/welo_admin/messages" ? "text-[#fff] ms-3 fontNew font-medium" : "text-[#4B4B4B] ms-3 fontNew font-medium"}>Messages</p>
                </span>
              </Link>
              <Link to={"/welo_admin/earnings"} onClick={() => { setSidebarOpen(!sidebarOpen); handleLeftRoom() }} >
                <span className={location.pathname == "/welo_admin/earnings" ? "flex items-center bg-[#EA5F5F] w-48 py-3 px-4 rounded-xl my-5" : "my-5 flex items-center w-48 py-3 px-4"}>
                  <img src={location.pathname == "/welo_admin/earnings" ? doller1 : doller} className="w-6" alt="" />
                  <p className={location.pathname == "/welo_admin/earnings" ? "text-[#fff] ms-3 fontNew font-medium" : "text-[#4B4B4B] ms-3 fontNew font-medium"}>Earnings</p>
                </span>
              </Link>
              <Link to={"/welo_admin/invoices"} onClick={() => { setSidebarOpen(!sidebarOpen); handleLeftRoom() }} >
                <span className={location.pathname == "/welo_admin/invoices" || location.pathname == "/welo_admin/invoices/invoice_details" ? "flex items-center bg-[#EA5F5F] w-48 py-3 px-4 rounded-xl my-5" : "my-5 flex items-center w-48 py-3 px-4"}>
                  <img src={location.pathname == "/welo_admin/invoices" || location.pathname == "/welo_admin/invoices/invoice_details" ? receipt1 : receipt} className="w-6" alt="" />
                  <p className={location.pathname == "/welo_admin/invoices" || location.pathname == "/welo_admin/invoices/invoice_details" ? "text-[#fff] ms-3 fontNew font-medium" : "text-[#4B4B4B] ms-3 fontNew font-medium"}>Invoices</p>
                </span>
              </Link>
              <Link to={"/welo_admin/reports"} onClick={() => { setSidebarOpen(!sidebarOpen); handleLeftRoom() }} >
                <span className={location.pathname == "/welo_admin/reports" ? "flex items-center bg-[#EA5F5F] w-48 py-3 px-4 rounded-xl my-5" : "my-5 flex items-center w-48 py-3 px-4"}>
                  <img src={location.pathname == "/welo_admin/reports" ? graph1 : graph} className="w-6" alt="" />
                  <p className={location.pathname == "/welo_admin/reports" ? "text-[#fff] ms-3 fontNew font-medium" : "text-[#4B4B4B] ms-3 fontNew font-medium"}>Reports</p>
                </span>
              </Link>
              <Link to={"/welo_admin/corporate_services"} onClick={() => { setSidebarOpen(!sidebarOpen); handleLeftRoom() }} >
                <span className={location.pathname == "/welo_admin/corporate_services" ? "flex items-center bg-[#EA5F5F] w-48 py-3 px-4 rounded-xl my-5" : "my-5 flex items-center w-48 py-3 px-4"}>
                  <img src={location.pathname == "/welo_admin/corporate_services" ? services1 : services} className="w-6" alt="" />
                  <p className={location.pathname == "/welo_admin/corporate_services" ? "text-[#fff] ms-3 fontNew font-medium" : "text-[#4B4B4B] ms-3 fontNew font-medium"}>Services</p>
                </span>
              </Link>
              <Link to={"/welo_admin/health_services"} onClick={() => { setSidebarOpen(!sidebarOpen); handleLeftRoom() }} >
                <span className={location.pathname == "/welo_admin/health_services" ? "flex items-center bg-[#EA5F5F] w-48 py-3 px-4 rounded-xl my-5" : "my-5 flex items-center w-48 py-3 px-4"}>
                  <img src={location.pathname == "/welo_admin/health_services" ? health1 : health} className="w-6" alt="" />
                  <p className={location.pathname == "/welo_admin/health_services" ? "text-[#fff] ms-3 fontNew font-medium" : "text-[#4B4B4B] ms-3 fontNew font-medium"}>Health Services</p>
                </span>
              </Link>

              <Disclosure as="div" className='w-48 my-5'>
                <DisclosureButton className={`group flex w-full items-center justify-between py-3 px-4 rounded-xl ${location.pathname == "/welo_admin/resources/FAQs" || location.pathname == "/welo_admin/resources/user_guide" || location.pathname == "/welo_admin/resources/troubleshooting" || location.pathname == "/welo_admin/resources/terms_conditions" ? "bg-[#EA5F5F]" : "bg-white"}`}>
                  <span className="flex items-center">
                    <img src={location.pathname == "/welo_admin/resources/FAQs" || location.pathname == "/welo_admin/resources/user_guide" || location.pathname == "/welo_admin/resources/troubleshooting" || location.pathname == "/welo_admin/resources/terms_conditions" ? key1 : key} className="w-6" alt="" />
                    <p className={location.pathname == "/welo_admin/resources/FAQs" || location.pathname == "/welo_admin/resources/user_guide" || location.pathname == "/welo_admin/resources/troubleshooting" || location.pathname == "/welo_admin/resources/terms_conditions" ? "text-[#fff] ms-3 fontNew font-medium" : "text-[#4B4B4B] ms-3 fontNew font-medium"}>Resources</p>
                  </span>
                  <ChevronDownIcon className={location.pathname == "/welo_admin/resources/FAQs" || location.pathname == "/welo_admin/resources/user_guide" || location.pathname == "/welo_admin/resources/troubleshooting" || location.pathname == "/welo_admin/resources/terms_conditions" ? "size-5 fill-white group-data-[hover]:white group-data-[open]:rotate-180 duration-300" : "size-5 fill-black/60 group-data-[hover]:fill-black/50 group-data-[open]:rotate-180 duration-300"} />
                </DisclosureButton>
                <DisclosurePanel className='py-1 mt-2 text-gray-500 rounded-xl bg-[#4B4B4B18]'>
                  <Link to={"/welo_admin/resources/FAQs"} onClick={() => { setSidebarOpen(!sidebarOpen); handleLeftRoom() }} >
                    <p className={`${location.pathname == "/welo_admin/resources/FAQs" ? "bg-[#EA5F5F] text-white" : "bg-none text-[#4B4B4B]"} flex items-center px-2 py-2 rounded-md mx-2 my-2.5 fontNew text-[14px]`}>
                      <div className={`${location.pathname == "/welo_admin/resources/FAQs" ? "bg-white" : "bg-[#4B4B4B]"} w-1.5 h-1.5 rounded-full mr-2`}></div>
                      <span>FAQs</span>
                    </p>
                  </Link>
                  <Link to={"/welo_admin/resources/user_guide"} onClick={() => { setSidebarOpen(!sidebarOpen); handleLeftRoom() }} >
                    <p className={`${location.pathname == "/welo_admin/resources/user_guide" ? "bg-[#EA5F5F] text-white" : "bg-none text-[#4B4B4B]"} flex items-center px-2 py-2 rounded-md mx-2 my-2.5 fontNew text-[14px]`}>
                      <div className={`${location.pathname == "/welo_admin/resources/user_guide" ? "bg-white" : "bg-[#4B4B4B]"} w-1.5 h-1.5 rounded-full mr-2`}></div>
                      <span>User Guide</span>
                    </p>
                  </Link>
                  <Link to={"/welo_admin/resources/troubleshooting"} onClick={() => { setSidebarOpen(!sidebarOpen); handleLeftRoom() }} >
                    <p className={`${location.pathname == "/welo_admin/resources/troubleshooting" ? "bg-[#EA5F5F] text-white" : "bg-none text-[#4B4B4B]"} flex items-center px-2 py-2 rounded-md mx-2 my-2.5 fontNew text-[14px]`}>
                      <div className={`${location.pathname == "/welo_admin/resources/troubleshooting" ? "bg-white" : "bg-[#4B4B4B]"} w-1.5 h-1.5 rounded-full mr-2`}></div>
                      <span>Troubleshoot</span>
                    </p>
                  </Link>
                  <Link to={"/welo_admin/resources/terms_conditions"} onClick={() => { setSidebarOpen(!sidebarOpen); handleLeftRoom() }} >
                    <p className={`${location.pathname == "/welo_admin/resources/terms_conditions" ? "bg-[#EA5F5F] text-white" : "bg-none text-[#4B4B4B]"} flex items-center px-2 py-2 rounded-md mx-2 my-2.5 fontNew text-[14px]`}>
                      <div className={`${location.pathname == "/welo_admin/resources/terms_conditions" ? "bg-white" : "bg-[#4B4B4B]"} w-1.5 h-1.5 rounded-full mr-2`}></div>
                      <span>Terms & Conditions</span>
                    </p>
                  </Link>
                </DisclosurePanel>
              </Disclosure>

              <Disclosure as="div" className='w-48 my-5'>
                <DisclosureButton className={`group flex w-full items-center justify-between py-3 px-4 rounded-xl ${location.pathname == "/welo_admin/setting/personal_information" || location.pathname == "/welo_admin/setting/company_details" || location.pathname == "/welo_admin/setting/manage_users" || location.pathname == "/welo_admin/setting/change_password" ? "bg-[#EA5F5F]" : "bg-white"}`}>
                  <span className="flex items-center">
                    <img src={location.pathname == "/welo_admin/setting/personal_information" || location.pathname == "/welo_admin/setting/company_details" || location.pathname == "/welo_admin/setting/manage_users" || location.pathname == "/welo_admin/setting/change_password" ? setting1 : setting} className="w-6" alt="" />
                    <p className={location.pathname == "/welo_admin/setting/personal_information" || location.pathname == "/welo_admin/setting/company_details" || location.pathname == "/welo_admin/setting/manage_users" || location.pathname == "/welo_admin/setting/change_password" ? "text-[#fff] ms-3 fontNew font-medium" : "text-[#4B4B4B] ms-3 fontNew font-medium"}>Setting</p>
                  </span>
                  <ChevronDownIcon className={location.pathname == "/welo_admin/setting/personal_information" || location.pathname == "/welo_admin/setting/company_details" || location.pathname == "/welo_admin/setting/manage_users" || location.pathname == "/welo_admin/setting/change_password" ? "size-5 fill-white group-data-[hover]:white group-data-[open]:rotate-180 duration-300" : "size-5 fill-black/60 group-data-[hover]:fill-black/50 group-data-[open]:rotate-180 duration-300"} />
                </DisclosureButton>
                <DisclosurePanel className='py-1 mt-2 text-gray-500 rounded-xl bg-[#4B4B4B18]'>
                  <Link to={"/welo_admin/setting/personal_information"} onClick={() => { setSidebarOpen(!sidebarOpen); handleLeftRoom() }} >
                    <p className={`${location.pathname == "/welo_admin/setting/personal_information" ? "bg-[#EA5F5F] text-white" : "bg-none text-[#4B4B4B]"} flex items-center px-2 py-2 rounded-md mx-2 my-2.5 fontNew text-[14px]`}>
                      <div className={`${location.pathname == "/welo_admin/setting/personal_information" ? "bg-white" : "bg-[#4B4B4B]"} w-1.5 h-1.5 rounded-full mr-2`}></div>
                      <span>Personal Info</span>
                    </p>
                  </Link>
                  <Link to={"/welo_admin/setting/manage_users"} onClick={() => { setSidebarOpen(!sidebarOpen); handleLeftRoom() }} >
                    <p className={`${location.pathname == "/welo_admin/setting/manage_users" ? "bg-[#EA5F5F] text-white" : "bg-none text-[#4B4B4B]"} flex items-center px-2 py-2 rounded-md mx-2 my-2.5 fontNew text-[14px]`}>
                      <div className={`${location.pathname == "/welo_admin/setting/manage_users" ? "bg-white" : "bg-[#4B4B4B]"} w-1.5 h-1.5 rounded-full mr-2`}></div>
                      <span>Manage User</span>
                    </p>
                  </Link>
                  <Link to={"/welo_admin/setting/change_password"} onClick={() => { setSidebarOpen(!sidebarOpen); handleLeftRoom() }} >
                    <p className={`${location.pathname == "/welo_admin/setting/change_password" ? "bg-[#EA5F5F] text-white" : "bg-none text-[#4B4B4B]"} flex items-center px-2 py-2 rounded-md mx-2 my-2.5 fontNew text-[14px]`}>
                      <div className={`${location.pathname == "/welo_admin/setting/change_password" ? "bg-white" : "bg-[#4B4B4B]"} w-1.5 h-1.5 rounded-full mr-2`}></div>
                      <span>Change Password</span>
                    </p>
                  </Link>
                </DisclosurePanel>
              </Disclosure>
            </div>
          </div>
        </div>
      </aside>

      <Dialog
        open={isLogOut}
        onClose={() => setIsLogOut(false)}
        size="2xl"
      >
        <Dialog.Panel>
          <Dialog.Description className="rounded-none border-2 border-white">
            <div className='flex justify-center text-center my-4 sm:px-16 px-4 fontNew'>
              <div>
                <h1 className='text-xl font-semibold text-black mt-6'>Log Out?</h1>
                <p className='text-sm text-gray-500 my-3'>Are you certain you wish to proceed with <br /> logging out?</p>
                <div className='flex mt-13 mb-5'>
                  <button className='bg-[#F4F5FA] py-[14px] sm:w-36 w-30 text-sm rounded-xl sm:mx-3 mx-2' onClick={() => setIsLogOut(false)}>Close</button>
                  <button className='bg-[#EA5F5F] py-[14px] sm:w-36 w-30 text-sm rounded-xl sm:mx-3 mx-2 text-white' onClick={() => { navigate("/welo_admin") }}>Yes, Log Out</button>
                </div>
              </div>
            </div>
          </Dialog.Description>
        </Dialog.Panel>
      </Dialog>
    </>
  );
};

export default SideMenu;
