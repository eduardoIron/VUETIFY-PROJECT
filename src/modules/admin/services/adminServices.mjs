import axios from 'axios';
import { baseURL } from "@/general.js"; 

const userApi = axios.create({
    baseURL,
});

export const loginAdmin = async (values) => {
   try{
       const response = await userApi.post('/auth/login',values);
       return response;
   }catch(error){
       const response = error.response;
       return response;
   }
};

export const getUsuarios = async () => {
    try {
        const response = await userApi.get('/usuarios'); 
        return response;
    } catch (error) {
        return error.response;
    }
}

export const postUsuarios = async (values) => {
    try {
        let token = sessionStorage.getItem("token");
        const config = {headers:{"x-token":token}}
        const response = await userApi.post('/usuarios', values, config); 
        return response;
    } catch (error) {
        return error.response;
    }
}

export const putUsuarios = async(values,id) => {
    try{
        let token = sessionStorage.getItem("token");
        const config = {headers:{"x-token": token}}
        const response = await userApi.put(`/usuarios/${id}`, values, config);
        return response;
    }catch(error){
        return error.response;
    }
}
