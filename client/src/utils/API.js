import axios from "axios";
var sendHeaderToken = "Bearer "+sessionStorage.getItem("token");


export const url = "http://localhost:8000/";


export function auth(){
    return axios.get(`${url}api/auth`,  {headers:{
        "Authorization": sendHeaderToken,
    }});
}

export function loginAPI(send){
    return axios.post(`${url}api/login`, send,{});
}

export function signupAPI(send){
    return axios.post(`${url}api/register`, send,{});
}

export function getPartnersAPI(){
    return axios.get(`${url}api/partners`);
}

export function getPanelsAPI(){
    return axios.get(`${url}api/panels`);
}

export function getNextEventAPI(){
    return axios.get(`${url}api/event/next`);
}

export function createRegister(register){
    return axios.post(`${url}api/event/register/create`, register)
}

export function getAllEvents(){
    return axios.get(`${url}api/events`)
}

export function deleteEventService(send){
    return axios.post(`${url}api/event/delete`, send,  {headers:{
        "Authorization": sendHeaderToken,
    }})
}

export function createEventService(send){
    return axios.post(`${url}api/event/create`, send,  {headers:{
        "Authorization": sendHeaderToken,
    }})
}




