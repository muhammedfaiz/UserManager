import axios from "axios";


const API_URL = 'http://localhost:8000/api/admin'
const getUsers = async()=>{
    const response = await axios.get(API_URL);
    return response.data;
}

const removeUser = async(id)=>{
    const response = await axios.get(`${API_URL}/remove-user/${id}`);
    return response.data;
}

const getUser = async(id)=>{
    const response = await axios.get(`${API_URL}/edit-user/${id}`);
    return response.data;
}

const editUser = async(id,data)=>{
    const config = {
        headers:{
            'Content-Type':'multipart/form-data'
        }
    }
    const response = await axios.put(`${API_URL}/edit-user/${id}`,data,config);
    return response.data;
}

const adminService = {getUsers,removeUser,getUser,editUser}

export default adminService;