import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../Page/Login/Login'
import ForgotPassword from '../Page/ForgotPassword/ForgotPassword'
import Verification from '../Page/Verification/Verification'
import ResetPassword from '../Page/ResetPassword/ResetPassword'
import Dashboard from '../Page/Dashboard/Dashboard'
import MainLayout from '../Layouts/MainLayout/MainLayout'
import Requests from '../Page/Requests/Requests'
import RequestDetails from '../Page/RequestDetails/RequestDetails'
import Invoices from '../Page/Invoices/Invoices'
import InvoiceDetails from '../Page/InvoiceDetails/InvoiceDetails'
import Customer from '../Page/Customer/Customer'
import CustomerDetails from '../Page/CustomerDetails/CustomerDetails'
import EmployeeDetails from '../Page/EmployeeDetails/EmployeeDetails'
import Healthworker from '../Page/Healthworker/Healthworker'
import HealthworkerDetails from '../Page/HealthworkerDetails/HealthworkerDetails'
import Messages from '../Page/Messages/Messages'
import Earnings from '../Page/Earnings/Earnings'
import Blogs from '../Page/Blogs/Blogs'
import FAQs from '../Page/FAQs/FAQs'
import UserGuide from '../Page/UserGuide/UserGuide'
import Troubleshoot from '../Page/Troubleshoot/Troubleshoot'
import TermsConditions from '../Page/TermsConditions/TermsConditions'
import PersonalInformation from '../Page/PersonalInformation/PersonalInformation'
import ManageUser from '../Page/ManageUser/ManageUser'
import ChangePassword from '../Page/ChangePassword/ChangePassword'
import CustomerInvoice from '../Page/CustomerInvoice/CustomerInvoice'
import Report from '../Page/Report/Report'
import WorkerForm from '../Page/WorkerForm/WorkerForm'
import WorkerConfirmed from '../Page/WorkerConfirmed/WorkerConfirmed'
import CorporateForm from '../Page/CorporateForm/CorporateForm'
import CorporateConfirmed from '../Page/CorporateConfirmed/CorporateConfirmed'
import ReportDetails from '../Page/ReportDetails/ReportDetails'
import CorporateServices from '../Page/CorporateServices/CorporateServices'
import HealthworkerServices from '../Page/HealthworkerServices/HealthworkerServices'

function RouterData() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/welo_admin' element={<Login />} />
                    <Route path='/welo_admin/login' element={<Login />} />
                    <Route path='/welo_admin/forgotpassword' element={<ForgotPassword />} />
                    <Route path='/welo_admin/verification' element={<Verification />} />
                    <Route path='/welo_admin/resetpassword' element={<ResetPassword />} />
                    <Route path='/welo_admin/dashboard' element={<MainLayout><Dashboard /></MainLayout>} />
                    <Route path='/welo_admin/requests' element={<MainLayout><Requests /></MainLayout>} />
                    <Route path='/welo_admin/requests/requests_details' element={<MainLayout><RequestDetails /></MainLayout>} />
                    <Route path='/welo_admin/customers' element={<MainLayout><Customer /></MainLayout>} />
                    <Route path='/welo_admin/customers/customer_details' element={<MainLayout><CustomerDetails /></MainLayout>} />
                    <Route path='/welo_admin/customers/customer_invoice' element={<MainLayout><CustomerInvoice /></MainLayout>} />
                    <Route path='/welo_admin/customers/employee_details' element={<MainLayout><EmployeeDetails /></MainLayout>} />
                    <Route path='/welo_admin/healthworkers' element={<MainLayout><Healthworker /></MainLayout>} />
                    <Route path='/welo_admin/healthworkers/healthworker_details' element={<MainLayout><HealthworkerDetails /></MainLayout>} />
                    <Route path='/welo_admin/messages' element={<MainLayout><Messages /></MainLayout>} />
                    <Route path='/welo_admin/earnings' element={<MainLayout><Earnings /></MainLayout>} />
                    <Route path='/welo_admin/invoices' element={<MainLayout><Invoices /></MainLayout>} />
                    <Route path='/welo_admin/invoices/invoice_details' element={<MainLayout><InvoiceDetails /></MainLayout>} />
                    <Route path='/welo_admin/blog' element={<MainLayout><Blogs /></MainLayout>} />
                    <Route path='/welo_admin/resources/FAQs' element={<MainLayout><FAQs /></MainLayout>} />
                    <Route path='/welo_admin/resources/user_guide' element={<MainLayout><UserGuide /></MainLayout>} />
                    <Route path='/welo_admin/resources/troubleshooting' element={<MainLayout><Troubleshoot /></MainLayout>} />
                    <Route path='/welo_admin/resources/terms_conditions' element={<MainLayout><TermsConditions /></MainLayout>} />
                    <Route path='/welo_admin/setting/personal_information' element={<MainLayout><PersonalInformation /></MainLayout>} />
                    <Route path='/welo_admin/setting/manage_users' element={<MainLayout><ManageUser /></MainLayout>} />
                    <Route path='/welo_admin/setting/change_password' element={<MainLayout><ChangePassword /></MainLayout>} />
                    <Route path='/welo_admin/reports' element={<MainLayout><Report /></MainLayout>} />
                    <Route path='/welo_admin/corporate_services' element={<MainLayout><CorporateServices /></MainLayout>} />
                    <Route path='/welo_admin/health_services' element={<MainLayout><HealthworkerServices /></MainLayout>} />
                    <Route path='/welo_admin/healthworker_form' element={<WorkerForm />} />
                    <Route path='/welo_admin/healthworker_confirmed' element={<WorkerConfirmed />} />
                    <Route path='/welo_admin/corporate_form' element={<CorporateForm />} />
                    <Route path='/welo_admin/corporate_confirmed' element={<CorporateConfirmed />} />
                    <Route path='/welo_admin/reportDetails/:id' element={<ReportDetails />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default RouterData