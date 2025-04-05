import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

type LoginCredentials = {
    email: string;
    password: string;
};

export const loginStudent = async (credentials: LoginCredentials) => {
    const response = await axios.post(`${API_URL}/api/student/login`, credentials);
    return response.data;
};

export const loginTeacher = async (credentials: LoginCredentials) => {
    const response = await axios.post(`${API_URL}/api/teacher/login`, credentials);
    return response.data;
};

export const loginAdmin = async (credentials: LoginCredentials) => {
    const response = await axios.post(`${API_URL}/api/admin/login`, credentials);
    return response.data;
};
