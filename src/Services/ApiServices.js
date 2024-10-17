import axios from "axios";
import {
    ADD_HEALTH_SERVICE_API,
    ADD_PROFESSION_SERVICE_API,
    ADMIN_DASHBOARD_API,
    APPROVE_STATUS_CUSTOMER_API,
    ASSIGN_HELATHWORKER_API,
    CHANGE_PASSWORD_API,
    CREATE_REQUEST_API,
    GET_CHAT_MESSAGES_API,
    GET_COMPANIES_API,
    GET_COMPANIES_INFO_API,
    GET_EMPLOYEE_API,
    GET_HEALTH_SERVICE_API,
    GET_PROFESSION_SERVICE_API,
    GET_REPORT_DETAILS_API,
    LIST_ASSIGN_HELATHWORKER_API,
    LIST_CHAT_API,
    LIST_CHAT_USER_API,
    LIST_CUSTOMER_API,
    LIST_HEALTHWORKER_API,
    LIST_NOTIFICATION_API,
    LIST_REPORTS_API,
    LIST_REQUEST_API,
    LIST_UNASSIGN_HELATHWORKER_API,
    REJECT_STATUS_CUSTOMER_API,
    REMOVE_ASSIGN_WORKER_API,
    REQUEST_STATUS_CHANGE_API,
    SEND_MESSAGES_API,
} from "./Api";
import Cookies from 'js-cookie';

axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("welo_admin_token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const headers = {
    "Content-type": "application/json",
};


export const getCustomerList = (page, search) => {
    return axios.get(`${LIST_CUSTOMER_API}?pageNo=${page}&searchTerm=${search}`, {
        headers: headers,
    });
};

export const getDashboard = () => {
    return axios.get(ADMIN_DASHBOARD_API, {
        headers: headers,
    });
};

export const getHealthworkerList = (page, search) => {
    return axios.get(`${LIST_HEALTHWORKER_API}?pageNo=${page}&searchTerm=${search}`, {
        headers: headers,
    });
};

export const approveCustomer = (param) => {
    return axios.put(APPROVE_STATUS_CUSTOMER_API, param, {
        headers: headers,
    });
};

export const rejectCustomer = (param) => {
    return axios.put(REJECT_STATUS_CUSTOMER_API, param, {
        headers: headers,
    });
};

export const listRequests = (param) => {
    return axios.get(LIST_REQUEST_API, {
        headers: headers,
        params: param
    });
};

export const listUnassignHealthworker = (param) => {
    return axios.get(LIST_UNASSIGN_HELATHWORKER_API, {
        headers: headers,
        params: param
    });
};

export const createRequests = (param) => {
    return axios.post(CREATE_REQUEST_API, param, {
        headers: headers,
    });
};

export const assignHealthworker = (param) => {
    return axios.post(ASSIGN_HELATHWORKER_API, param, {
        headers: headers,
    });
};

export const listAssignHealthworker = (param) => {
    return axios.get(LIST_ASSIGN_HELATHWORKER_API, {
        headers: headers,
        params: param
    });
};

export const listReports = (param) => {
    return axios.get(LIST_REPORTS_API, {
        headers: headers,
        params: param
    });
};

export const requestStatusChange = (param) => {
    return axios.put(REQUEST_STATUS_CHANGE_API, param, {
        headers: headers
    });
};

export const removeAssignHealthworker = (param) => {
    return axios.delete(REMOVE_ASSIGN_WORKER_API, {
        headers: headers,
        params: param
    });
};

export const getCompaniesList = () => {
    return axios.get(GET_COMPANIES_API, {
        headers: headers,
    });
};

export const getCompaniesInfo = (param) => {
    return axios.get(GET_COMPANIES_INFO_API, {
        headers: headers,
        params: param
    });
};

export const getEmployees = (param) => {
    return axios.get(GET_EMPLOYEE_API, {
        headers: headers,
        params: param
    });
};

export const getHealthService = () => {
    return axios.get(GET_HEALTH_SERVICE_API, {
        headers: headers,
    });
};

export const addHealthService = (param) => {
    return axios.post(ADD_HEALTH_SERVICE_API, param, {
        headers: headers,
    });
};

export const getProfessionService = () => {
    return axios.get(GET_PROFESSION_SERVICE_API, {
        headers: headers,
    });
};

export const addProfessionService = (param) => {
    return axios.post(ADD_PROFESSION_SERVICE_API, param, {
        headers: headers,
    });
};

export const getRequestDetails = (param) => {
    return axios.get(GET_REPORT_DETAILS_API, {
        headers: headers,
        params: param
    });
};

export const getNotificationList = (param) => {
    return axios.get(LIST_NOTIFICATION_API, {
        headers: headers,
        params: param
    });
};

export const getChatList = (param) => {
    return axios.get(LIST_CHAT_API, {
        headers: headers,
        params: param
    });
};

export const getChatMessageList = (param) => {
    return axios.get(GET_CHAT_MESSAGES_API, {
        headers: headers,
        params: param
    });
};

export const sendMessages = (param) => {
    return axios.post(SEND_MESSAGES_API, param, {
        headers: headers,
    });
};

export const getChatUserList = (param) => {
    return axios.get(LIST_CHAT_USER_API, {
        headers: headers,
        params: param
    });
};

export const changePassword = (param) => {
    return axios.post(CHANGE_PASSWORD_API, param, {
        headers: headers,
    });
};