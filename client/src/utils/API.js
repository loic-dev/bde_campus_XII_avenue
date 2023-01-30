import axios from "axios";
var sendHeaderToken = "Bearer "+sessionStorage.getItem("token");


export const url = "https://loic-dev-bookish-pancake-vrjrqrwqv74fw9g6-8000.preview.app.github.dev/";


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

export function createPartnerService(send){
    return axios.post(`${url}api/partner/create`, send,  {headers:{
        "Authorization": sendHeaderToken,
    }})
}

export function deletePartnerService(send){
    return axios.post(`${url}api/partner/delete`, send,  {headers:{
        "Authorization": sendHeaderToken,
    }})
}

export function getRegisterService(id_event){
    return axios.get(`${url}api/event/registers?id_event=${id_event}`, {headers:{
        "Authorization": sendHeaderToken,
    }})
}




