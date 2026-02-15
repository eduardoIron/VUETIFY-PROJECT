import axios from 'axios';
import { baseURL } from "@/general.js"; 

const userApi = axios.create({
    baseURL,
});

export const loginUser = async (values) => {
   try{
       const response = await userApi.post('/auth/login',values);
       return response;
   }catch(error){
       const response = error.response;
       return response;


   }
};
