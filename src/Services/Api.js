
export const BASE_URL = "https://app.welo.health:8000"
export const IMG_URL = "https://app.welo.health:8000/"
export const newName = "Patients"

export const ADMIN_LOGIN_API = BASE_URL + "/corporate/login"
export const FORGOT_PASSWORD_API = BASE_URL + "/corporate/forgot_password"
export const VERIFICATION_CORPORATE_API = BASE_URL + "/corporate/forgot_password_verification"
export const RESET_PASSWORD_API = BASE_URL + "/corporate/reset_password"
export const ADMIN_LOGOUT_API = BASE_URL + "/corporate/logout"

export const ADMIN_DASHBOARD_API = BASE_URL + "/admin/get_admin_dashboard"

export const LIST_CUSTOMER_API = BASE_URL + "/admin/list_corporate_customer"
export const APPROVE_STATUS_CUSTOMER_API = BASE_URL + "/admin/approve_status"
export const REJECT_STATUS_CUSTOMER_API = BASE_URL + "/admin/reject_status"

export const CREATE_REQUEST_API = BASE_URL + "/admin/create_request_by_admin"
export const LIST_REQUEST_API = BASE_URL + "/admin/list_request"
export const LIST_UNASSIGN_HELATHWORKER_API = BASE_URL + "/admin/list_unassign_healthworker"
export const ASSIGN_HELATHWORKER_API = BASE_URL + "/admin/assign_healthworker"
export const LIST_ASSIGN_HELATHWORKER_API = BASE_URL + "/admin/list_assign_healthworker"
export const LIST_REPORTS_API = BASE_URL + "/healthworker/list_reports"
export const    REQUEST_STATUS_CHANGE_API = BASE_URL + "/admin/update_cancle_confirm_request_status"
export const REMOVE_ASSIGN_WORKER_API = BASE_URL + "/admin/remove_assign_healthworker"
export const GET_COMPANIES_API = BASE_URL + "/admin/get_companies"
export const GET_COMPANIES_INFO_API = BASE_URL + "/corporate/get_company_information"
export const GET_EMPLOYEE_API = BASE_URL + "/corporate/get_employee"

export const LIST_HEALTHWORKER_API = BASE_URL + "/admin/list_healthworker"

export const GET_HEALTH_SERVICE_API = BASE_URL + "/corporate/get_health_service"
export const ADD_HEALTH_SERVICE_API = BASE_URL + "/admin/add_health_service"

export const GET_PROFESSION_SERVICE_API = BASE_URL + "/admin/get_healthworker_profession"
export const ADD_PROFESSION_SERVICE_API = BASE_URL + "/admin/add_healthworker_profession"

export const GET_REPORT_DETAILS_API = BASE_URL + "/corporate/get_report_details"

export const LIST_NOTIFICATION_API = BASE_URL + "/corporate/list_notification"

export const LIST_CHAT_API = BASE_URL + "/chat/get_chat_list"
export const GET_CHAT_MESSAGES_API = BASE_URL + "/chat/get_chat_messages"
export const SEND_MESSAGES_API = BASE_URL + "/chat/send_message"
export const LIST_CHAT_USER_API = BASE_URL + "/chat/list_chat_users"

export const CHANGE_PASSWORD_API = BASE_URL + "/corporate/change_password"