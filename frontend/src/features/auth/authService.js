import axios from 'axios';

const API_URL = '/api/users';

// Register user
const register = async(userData)=>{
    const config = {
        headers:{
            'Content-Type':'multipart/form-data'
        }
    }
    const response = await axios.post(API_URL,userData,config);
    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    return response.data;
}

// logout user
const logout = async()=>{
    localStorage.removeItem('user');
}

// login
const login = async(userData)=>{
    const response = await axios.post(API_URL+'/auth',userData);
    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data));
    }
    return response.data;
}

const updateProfile = async(userData)=>{
    const config = {
        headers:{
            'Content-Type':'multipart/form-data'
        }
    }
    const response = await axios.put(API_URL+'/profile',userData,config);
    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data));
    }
    return response.data;
}

const authService = {
    register,
    logout,
    login,
    updateProfile
}

export default authService;